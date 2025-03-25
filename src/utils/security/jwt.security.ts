import { sign, verify } from 'jsonwebtoken';
import { tokenPayload } from '../../interfaces/user.interface';
import { currentEnv } from '../../configs/config';

const JWT_STRATEGY = {
    generateToken: (payload: tokenPayload): string => {
        const token = sign(payload, currentEnv.jwtSecret as string, { expiresIn: "1h" });
        return token;
    },
    verifyToken: (token: string): tokenPayload => {
        const payload = verify(token, currentEnv.jwtSecret as string) as tokenPayload;
        return payload;
    }
}

export { JWT_STRATEGY };