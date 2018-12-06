// import axios from 'axios';
const axios = require('axios')

const Google_URL = 'https://www.googleapis.com/userinfo/v2/me';

const authAsync = async token => {
  try {
    const res = await axios.get(Google_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error('No success with Google');
  } catch (error) {
    throw error;
  }
};

// export const Google = {
//   authAsync,
// };

module.exports ={
  authAsync
}

module.exports.Google = {
  authAsync
}