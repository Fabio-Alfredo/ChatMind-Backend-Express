import { JWT_STRATEGY } from "./jwt.security"
import { authTypes } from "../../types/jwt.type";

const AuthFactory = {
    AuthProvider: (option: authTypes) => {
        switch (option) {
            case "JWT":
                return JWT_STRATEGY;
            case "OAUTH":
                return
            default:
                return
        }
    }
}

export { AuthFactory };
