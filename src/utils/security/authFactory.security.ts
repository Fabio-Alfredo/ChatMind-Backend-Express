import { JWT_STRATEGY } from "./jwt.security"
import { authTypes } from "../../types/jwt.type";
import ServiceError from "../error/service.error";
import ErrorCodes from "../error/codes/error.codes";

const AuthFactory = {
    AuthProvider: (option: authTypes) => {
        switch (option) {
            case "JWT":
                return JWT_STRATEGY;
            //TODO: implementation of OAUTH
            // case "OAUTH":
            //     return
            default:
                throw new ServiceError("Invalid Auth Provider",
                    ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
                );
        }
    }
}

export { AuthFactory };
