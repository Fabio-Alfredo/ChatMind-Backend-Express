import { JWT_STRATEGY, OAUTH_STRATEGY } from "./jwt.security"
import { authTypes } from "../../types/jwt.type";
import ServiceError from "../error/service.error";
import ErrorCodes from "../error/codes/error.codes";

const AuthFactory = {
    AuthProvider: (option: authTypes) => {
        switch (option) {
            case "JWT":
                return JWT_STRATEGY;
            case "OAUTH":
                return OAUTH_STRATEGY;
            default:
                throw new ServiceError("Invalid Auth Provider",
                    ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
                );
        }
    }
}

export { AuthFactory };
