const ErrorCodes = {
    SERVER: {
        INTERNAL_SERVER_ERROR: 500,
    },
    USER: {
        ALREADY_EXISTS: 1000,
        INVALID_CREDENTIALS: 1001,
        INVALID_GOOGLE_TOKEN: 1002,
    },
    CHAT: {
        NOT_FOUND: 2000,
    },
    BOT: {
        NOT_FOUND: 3000,
        ALREADY_EXISTS_BOT: 3001,
    },
}

export default ErrorCodes;