export interface Config {
   port: number;
   nodeEnv: string;
   mongoUri?: string;
   jwtSecret?: string;
   googleClientId?: string;
   encryptKey: string;
}