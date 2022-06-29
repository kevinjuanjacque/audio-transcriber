const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const myBucket = storage.bucket('test-1183');

const getAudio = async (uri) => {
  const nameFile = new Date().getTime() + '.mp3';
  const pathStore = 'audio-files/' + nameFile;
  const file = myBucket.file(pathStore);
  const config = {
    method: 'get',
    responseType: 'stream',
    url: uri,
    headers: {
      Authorization: 'Bearer ' + process.env.WHATSAPP_TOKEN,
    },
  };

  const request = await axios(config)
    .then((response) => {
      // check if response is success
      if (response.status !== 200) {
        return console.log(response.status);
      }
      //response.data.pipe(recognizeStream);

      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  const response = request.data.pipe(file.createWriteStream());
  await new Promise(function (resolve, reject) {
    response.on('error', reject); // or something like that. might need to close `hash`

    response.on('finish', (data) => {
      console.log('llego: ' + data);
      resolve();
    });
  });
  const exist = await file.exists();
  if (exist) {
    console.log('SI EXISTE');
  } else {
    console.log('NO EXISTE');
  }

  return { nameFile, pathStore };
};

module.exports = { getAudio };
