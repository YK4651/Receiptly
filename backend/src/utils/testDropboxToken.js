const { refreshDropboxToken } = require('./dropboxTokenManager');
require('dotenv').config();

const testRefreshToken = async () => {
  try {
    const newAccessToken = await refreshDropboxToken();
    console.log('New Access Token:', newAccessToken);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testRefreshToken();