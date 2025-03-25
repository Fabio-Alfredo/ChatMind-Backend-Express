import "dotenv/config";
import { Config } from "../interfaces/config.interface";
import { Env } from "../types/env.type";

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;

const config:Record<Env, Config> = {
    development: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV ) || "development",
        mongoUri: MONGO_URI ,
        jwtSecret: JWT_SECRET,
    },
    production: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV as Env) || "production",
        mongoUri: MONGO_URI as string,
        jwtSecret: JWT_SECRET,
    },
    test: {
        port: parseInt(PORT as string) || 3000,
        nodeEnv: (NODE_ENV as Env) || "test",
        mongoUri: MONGO_URI as string,
        jwtSecret: JWT_SECRET,
    },
}

export const currentEnv: Config = config[NODE_ENV as Env] || config.development;