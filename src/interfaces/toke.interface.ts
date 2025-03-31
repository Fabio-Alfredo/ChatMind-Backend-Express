import { TokenPayload } from "./user.interface";

interface Token {
    token: string;
    expiresIn: number;
    type: string;
}

interface TokenValid {
    valid: boolean;
    message?: string;
    payload?: TokenPayload;
}

export { Token, TokenValid };