const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
const bucketName = 'test-1183';
const uploadFile = async (nameFile, path) => {
  await storage.bucket(bucketName).upload(path, {
    destination: nameFile,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
};

module.exports = { uploadFile };
