const ImageKit = require('imagekit')

// SDK initialization

var imagekit = new ImageKit({
  publicKey: process.env.publicKey,
  urlEndpoint: process.env.urlEndpoint,
  privateKey : process.env.privateKey
});

// Upload function internally uses the ImageKit.io javascript SDK
function storageUpload(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        fileName: file.originalname,
      },
      function (err, result) {
        !err? resolve(result) : reject(err)
      }
    );
  });
}

module.exports = storageUpload;
