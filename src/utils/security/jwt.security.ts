import { sign, verify } from 'jsonwebtoken';
import { TokenPayload, Token, GooglePayload } from "../../interfaces";
import { currentEnv } from '../../configs/config';
import client from '../../configs/google/googleAuth.config';

const JWT_STRATEGY = {
    generateToken: (payload: TokenPayload): Token => {
        const token = sign(payload, currentEnv.jwtSecret as string, { expiresIn: "1h" });
        return {
            token,
            expiresIn: 3600,
            type: "Bearer"
        };
    },
    verifyToken: (token: string): TokenPayload => {
        const payload = verify(token, currentEnv.jwtSecret as string) as TokenPayload;
        return payload;
    }
};

const OAUTH_STRATEGY = {
    verifyToken: async (token: string): Promise<GooglePayload> => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: currentEnv.googleClientId
        });

        const payload = ticket.getPayload();
        return payload as GooglePayload;
    },

    generateToken: (): never => {
        throw new Error("OAuth does not support token generation.");
    }

}

export { JWT_STRATEGY, OAUTH_STRATEGY };