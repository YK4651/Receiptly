const Receipt = require('../models/Receipt');
const vision = require('@google-cloud/vision');
const axios = require('axios');

exports.analyzeReceipt = async (req, res) => {
  try {
    const { images } = req.body; // Expecting an array of base64 images
    const visionApiKey = process.env.GOOGLE_VISION_API_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;

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