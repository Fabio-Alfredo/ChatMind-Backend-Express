import { OAuth2Client } from "google-auth-library";
import { currentEnv } from "../config";

const client = new OAuth2Client(currentEnv.googleClientId);

export default client;