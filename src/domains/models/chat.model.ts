import { Schema, model, mongo } from 'mongoose';
import { Chat } from '../../interfaces';

const chatSchema = new Schema<Chat>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bot_id: {
            type: Schema.Types.ObjectId,
            ref: 'Bot',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
                default: [],
            }
        ]
    },
    {
        timestamps: true,
    }
)

const ChatModel = model<Chat>('Chat', chatSchema);

export default ChatModel;