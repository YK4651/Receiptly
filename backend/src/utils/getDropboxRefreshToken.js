const axios = require('axios');
require('dotenv').config();

const getRefreshToken = async (authorizationCode) => {
  try {
    const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
      params: {
        code: authorizationCode,
        grant_type: 'authorization_code',
        client_id: process.env.DROPBOX_CLIENT_ID,
        client_secret: process.env.DROPBOX_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3030', // Use the same redirect URI you used in the authorization URL
      },
    });

    return response.data.refresh_token;
  } catch (error) {
    console.error('Error getting refresh token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Replace with your actual authorization code
const authorizationCode = 'CLO_2DGe4JAAAAAAAAAAmFiPffHqQet1B5AJAhOn16Y';
getRefreshToken(authorizationCode).then(refreshToken => {
  console.log('Refresh Token:', refreshToken);
}).catch(error => {
  console.error('Error:', error.message);
});

//https://www.dropbox.com/oauth2/authorize?client_id=zekm5pijefdao76&response_type=code&token_access_type=offline&redirect_uri=http://localhost:3030