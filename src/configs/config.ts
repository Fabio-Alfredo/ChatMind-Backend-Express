import "dotenv/config";
import { Config } from "../interfaces";
import { Env } from "../types/env.type";

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, GOOGLE_CLIENT_ID, SECRET_CRYPT_KEY } = process.env;

const config: Record<Env, Config> = {
    development: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV) || "development",
        mongoUri: MONGO_URI,
        jwtSecret: JWT_SECRET,
        googleClientId: GOOGLE_CLIENT_ID,
        encryptKey: SECRET_CRYPT_KEY || "defaultEncryptKey"
    },
    production: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV as Env) || "production",
        mongoUri: MONGO_URI as string,
        jwtSecret: JWT_SECRET,
        googleClientId: GOOGLE_CLIENT_ID,
        encryptKey: SECRET_CRYPT_KEY || "defaultEncryptKey"
    },
    test: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV as Env) || "test",
        mongoUri: MONGO_URI as string,
        jwtSecret: JWT_SECRET,
        googleClientId: GOOGLE_CLIENT_ID,
        encryptKey: SECRET_CRYPT_KEY || "defaultEncryptKey"
    },
}

export const currentEnv: Config = config[NODE_ENV as Env] || config.development;