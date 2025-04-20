const ErrorCodes = {
    SERVER: {
        INTERNAL_SERVER_ERROR: 500,
    },
    USER: {
        ALREADY_EXISTS: 1000,
        INVALID_CREDENTIALS: 1001,
        INVALID_GOOGLE_TOKEN: 1002,
        NOT_FOUND: 1003,
        ALREADY_HAS_ROLE: 1004,
    },
    CHAT: {
        NOT_FOUND: 2000,
        ALREADY_EXISTS: 2001,
    },
    BOT: {
        NOT_FOUND: 3000,
        ALREADY_EXISTS_BOT: 3001,
    },
    MESSAGE:{
        NOT_FOUND: 4000,
        ALREADY_EXISTS: 4001,
    }
}

export default ErrorCodes;