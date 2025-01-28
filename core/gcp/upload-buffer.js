import bucket from './gcp-storage-bucket.js';

export default async function uploadBuffer(buffer, contentType, path) {
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

      console.log("okkkkkkk bucket")
      return true
    } catch (error) {
      console.log(`Bucket error: ${error}`)
      return false
    }
  }