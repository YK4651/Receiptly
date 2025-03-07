const Receipt = require('../models/Receipt');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const axios = require('axios');
const { Dropbox } = require('dropbox');

// Create a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const { userId, imageUrl, amount, vendor, receiptDate, tax, categoryId, tags } = req.body;
    const newReceipt = new Receipt({
      userId,
      imageUrl,
      amount,
      vendor,
      receiptDate,
      tax,
      categoryId,
      tags,
      createdAt: new Date(),
    });
    const savedReceipt = await newReceipt.save();
    res.status(201).json(savedReceipt);
  } catch (error) {
    res.status(500).json({ message: 'Error creating receipt', error });
  }
};

// Get all receipts for a user
exports.getReceipts = async (req, res) => {
  //return res.status(200).json({ message: req.user });
  try {
    const receipts = await Receipt.find({ userId: req.user._id });
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving receipts', error });
  }
};

// Update a receipt
exports.updateReceipt = async (req, res) => {
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReceipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(updatedReceipt);
  } catch (error) {
    res.status(500).json({ message: 'Error updating receipt', error });
  }
};

// Get a receipt by ID
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving receipt', error });
  }
};

// Delete a receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!deletedReceipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting receipt', error });
  }
};

exports.analyzeReceipt = async (req, res) => {
  try {
    const { images } = req.body; // Expecting an array of base64 images
    const visionApiKey = 'AIzaSyCvTWSom948Q8IO-9zg9jvSG6Zc0g1SMIs';
    const openAiApiKey = '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';

    // Step 1: Detect text using Google Vision API for each image
    const visionRequests = images.map(image => axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`, {
      requests: [
        {
          image: { content: image },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }));

    // Execute all vision requests in parallel
    const visionResponses = await Promise.all(visionRequests);

    // Step 2: Categorize detected text using OpenAI API for each vision response
    const openAiRequests = visionResponses.map(visionResponse => {
      const visionResult = visionResponse.data;
      const textAnnotations = visionResult?.responses?.[0]?.textAnnotations;
      if (!textAnnotations || textAnnotations.length === 0) {
        throw new Error('Text not found.');
      }

      let extractedText = textAnnotations[0].description;
      extractedText = extractedText.replace(/\n/g, ' ');

      return axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for organizing receipt data. Extract the receipt details into the following fields: "Store Name", "Items", "Total", "Receipt Category", and "Subcategory". Provide output as a JSON object.',
          },
          {
            role: 'user',
            content: extractedText,
          },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiApiKey}`,
        },
      });
    });

    // Execute all OpenAI requests in parallel
    const openAiResponses = await Promise.all(openAiRequests);

    // Process OpenAI responses
    const results = openAiResponses.map(openAiResponse => {
      const openAiResult = openAiResponse.data;
      if (!openAiResult.choices || openAiResult.choices.length === 0) {
        throw new Error('Error categorizing receipt data');
      }

      let organizedData = openAiResult.choices[0].message.content;
      const jsonStartIndex = organizedData.indexOf('{');
      const jsonEndIndex = organizedData.lastIndexOf('}') + 1;
      const jsonString = organizedData.substring(jsonStartIndex, jsonEndIndex);

      try {
        const jsonData = JSON.parse(jsonString);
        return {
          storeName: jsonData['Store Name'],
          items: jsonData['Items'],
          total: jsonData['Total'],
          receiptCategory: jsonData['Receipt Category'],
          subcategory: jsonData['Subcategory'],
        };
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Error parsing categorized data');
      }
    });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing receipt', error });
  }
};

// Save result to the database
exports.saveReceipt = async (req, res) => {
  try {
    const { userId, results, images, path } = req.body; // Expecting images and path for Dropbox
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

    // Step 1: Save images to Dropbox
    const dropboxResponses = await Promise.all(images.map(async (imageBase64, index) => {
      const filename = `receipt_${index}_${Math.random().toString(36).substring(2, 15)}.png`;
      const response = await dbx.filesUpload({
        path: `/receipts_${userId}/${filename}`,
        contents: Buffer.from(imageBase64, 'base64'),
        mode: 'add',
        autorename: true,
        mute: false,
      });
      return { path: response.result.path_display, filename };
    }));

    // Step 2: Create shared links for the uploaded images
    const sharedLinks = await Promise.all(dropboxResponses.map(async (file) => {
      const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: file.path,
        settings: {
          requested_visibility: 'public',
        },
      });
      return sharedLinkResponse.result.url.replace('?dl=0', '?raw=1'); // Convert to direct download link
    }));

    // Step 3: Save receipt data to the database
    const newReceipt = new Receipt({
      userId: userId,
      receiptData: results,
      imageFilenames: dropboxResponses.map(file => file.filename),
      imageUrls: sharedLinks, // Save public URLs of Dropbox images
      createdAt: new Date(),
    });
    //await Receipt.deleteMany({ userId });

    const savedReceipt = await newReceipt.save();
    res.status(201).json({ savedReceipt, dropboxPaths: sharedLinks });
  } catch (error) {
    res.status(500).json({ message: 'Error saving receipt', error });
  }
};