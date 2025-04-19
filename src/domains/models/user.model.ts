import { Schema, Types, model } from 'mongoose';
import { User } from '../../interfaces';
import bcrypt from 'bcryptjs';
import { AUTH_PROVIDERS } from '../../utils/constants/autProvider.constant';
import { roles } from '../../types/roles.types';

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => {
                    return /^[a-zA-Z\s]*$/.test(v);
                },
                message: (props) => `${props.value} is not a valid name!`
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return this.authProvider === "local";
            },
        },
        roles: {
            type: [String],
            default: ["user"],
            enum: roles,
            set: () => ["user"]
        },
        authProvider: {
            type: String,
            required: true,
            enum: Object.values(AUTH_PROVIDERS),
            default: "local"
        }

    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.authProvider === AUTH_PROVIDERS.LOCAL) {
        const password = this.password as string;
        const passwordRegex = /^[A-Za-z0-9!@#$%&*+]{8,}$/;

        if (!passwordRegex.test(password)) {
            throw new Error("contraseña invalida debe tener al menos 8 caracteres, una letra mayuscula, un numero y un caracter especial");
        }
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const UserModel = model<User>("User", userSchema);

export default UserModel;