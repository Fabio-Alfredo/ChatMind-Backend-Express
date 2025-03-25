import { JWT_STRATEGY } from "./jwt.security"

const AuthFactory = {
    AuthProvider: (types: "JWT" | "OAUTH") => {
        switch (types) {
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
