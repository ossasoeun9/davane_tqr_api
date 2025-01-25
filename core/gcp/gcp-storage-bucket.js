const { Storage } = require('@google-cloud/storage');

const projectId = process.env.GCP_PROJECT_ID;
const keyFilename = 'davane-tqr-dev-448615-b87f3d52cc45';

const bucket = new Storage({ projectId, keyFilename }).bucket("davane_tqr");

module.exports = bucket;