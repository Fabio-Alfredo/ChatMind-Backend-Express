import { sign, verify } from 'jsonwebtoken';
import {TokenPayload, Token} from "../../interfaces";
import { currentEnv } from '../../configs/config';

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
}

export { JWT_STRATEGY };