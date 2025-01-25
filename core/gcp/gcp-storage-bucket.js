const { Storage } = require('@google-cloud/storage');

const projectId = process.env.GCP_PROJECT_ID;
const keyFilename = 'config/davane-tqr-dev-bucket-key.json';

const bucket = new Storage({ projectId, keyFilename }).bucket("davane_tqr");

module.exports = bucket;