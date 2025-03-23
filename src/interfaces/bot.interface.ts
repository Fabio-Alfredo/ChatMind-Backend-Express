import mongoose from "mongoose";

interface Bot {
    name: string;
    description: string;
    model: string;
    apiURL: string;
    apiToken: string;
    active: boolean;
}

export { Bot };
