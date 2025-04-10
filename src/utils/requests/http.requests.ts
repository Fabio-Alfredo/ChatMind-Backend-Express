import axios from "axios";
import ServiceError from "../error/service.error";
import ErrorCodes from "../error/codes/error.codes";

export const createRequest = async (chatToken: string, chatUrl: string, message: string): Promise<string> => {
    try {
        const response = await axios.post(chatUrl,
            {
                inputs: message
            },
            {
                headers: {
                    'Authorization': `Bearer ${chatToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        return JSON.stringify(response.data[0]);
    } catch (e: any) {
        throw new ServiceError(e.message || "Internal Server Error",
            e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
        )
    }
}