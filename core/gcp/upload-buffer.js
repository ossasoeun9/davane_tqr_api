const bucket = require('./gcp-storage-bucket.js');

module.exports = async function uploadBuffer(buffer, contentType, path) {
    try {
      const file = bucket.file(path);
      const stream = file.createWriteStream({
        metadata: {
          contentType: contentType, 
        },
      });
  
      stream.end(buffer);
  
      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
      });

      return true
    } catch (error) {
      return false
    }
  }