import { writeFileSync } from 'fs'
import { config } from 'dotenv'

config()

const firestoreCredentials = {
  type: process.env.FIRESTORE_TYPE,
  project_id: process.env.FIRESTORE_PROJECT_ID,
  private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
  private_key: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  client_email: process.env.FIRESTORE_CLIENT_EMAIL,
  client_id: process.env.FIRESTORE_CLIENT_ID,
  auth_uri: process.env.FIRESTORE_AUTH_URI,
  token_uri: process.env.FIRESTORE_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIRESTORE_UNIVERSE_DOMAIN,
}

console.log(firestoreCredentials)

export const generateFirestoreKey = () => {
  writeFileSync(
    `src/key/${process.env.FIRESTORE_KEY_FILENAME}`,
    JSON.stringify(firestoreCredentials),
  )
}
