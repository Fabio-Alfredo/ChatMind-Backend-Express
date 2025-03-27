const ErrorCodes = {
    SERVER: {
        INTERNAL_SERVER_ERROR: 500,
    },
    USER: {
        ALREADY_EXISTS: 1000,
        INVALID_CREDENTIALS: 1001,
        INVALID_GOOGLE_TOKEN: 1002,
    }
}

export default ErrorCodes;