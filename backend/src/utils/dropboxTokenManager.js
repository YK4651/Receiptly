const axios = require('axios');

const refreshDropboxToken = async () => {
  try {
    const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
    const clientId = process.env.DROPBOX_CLIENT_ID;
    const clientSecret = process.env.DROPBOX_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
      throw new Error('Missing required environment variables for Dropbox token refresh');
    }

    const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    const newAccessToken = response.data.access_token;
    process.env.DROPBOX_ACCESS_TOKEN = newAccessToken; // Update the environment variable with the new token

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing Dropbox token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to refresh Dropbox token');
  }
};

module.exports = { refreshDropboxToken };