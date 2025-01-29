import { Storage } from "@google-cloud/storage";

const projectId = process.env.GCP_PROJECT_ID;
const credentials = {
  type: process.env.GCP_SERVICE_TYPE,
  project_id: process.env.GCP_PROJECT_ID,
  private_key_id: process.env.GCP_PRIVATE_KEY_ID,
  private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GCP_CLIENT_EMAIL,
  client_id: process.env.GPC_CLIENT_ID,
  auth_uri: process.env.GPC_AUTH_URI,
  token_uri: process.env.GPC_TOKEN_URL,
  auth_provider_x509_cert_url: process.env.GPC_AUTH_PROVIDER,
  client_x509_cert_url: process.env.GPC_CLEINT,
  universe_domain: process.env.GPC_UNIVERSE_DOMAIN,
};

console.log(credentials)

const bucket = new Storage({ projectId, credentials }).bucket("davane_tqr");

export default bucket;
