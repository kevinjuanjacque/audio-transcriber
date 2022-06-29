const axios = require('axios');
const sendTranscription = async (text, numero) => {
  console.log('Enviando mensaje: ' + text + ', al numero: ' + numero);
  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: `${numero}`,
    type: 'text',
    text: {
      body: text,
    },
  });

  const config = {
    method: 'POST',
    url: 'https://graph.facebook.com/v13.0/102727809165162/messages',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.WHATSAPP_TOKEN,
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};

module.exports = { sendTranscription };
