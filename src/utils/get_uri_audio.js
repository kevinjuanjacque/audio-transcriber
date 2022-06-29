const axios = require('axios');

const getUriAudio = async (id) => {
  var config = {
    method: 'get',
    url: 'https://graph.facebook.com/v13.0/' + id,
    headers: {
      Authorization: 'Bearer ' + process.env.WHATSAPP_TOKEN,
    },
  };

  const resp = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

  return resp.data.url;
};

module.exports = { getUriAudio };
