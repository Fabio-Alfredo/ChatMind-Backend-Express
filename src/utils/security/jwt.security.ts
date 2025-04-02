import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { TokenPayload, Token, GooglePayload } from "../../interfaces";
import { currentEnv } from '../../configs/config';
import client from '../../configs/google/googleAuth.config';
import { TokenValid } from '../../interfaces';

export const generateToken = (payload: TokenPayload): Token => {
    const token = sign(payload, currentEnv.jwtSecret as string, { expiresIn: "1h" });
    return {
        token,
        expiresIn: 3600,
        type: "Bearer"
    };
}

export const verifyToken = (token: string): TokenValid => {
    try {
        const payload = verify(token, currentEnv.jwtSecret as string) as TokenPayload;
        return { valid: true, payload };
    } catch (e: any) {
        if (e instanceof TokenExpiredError)
            return { valid: false, message: "Token expired" };
        return { valid: false, message: "Invalid token" };
    }
}

export const verifyGoogleAuth = async (token: string): Promise<GooglePayload> => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: currentEnv.googleClientId
    });

    const payload = ticket.getPayload();
    return payload as GooglePayload;
}

