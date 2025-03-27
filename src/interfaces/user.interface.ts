
interface User {
    _id: string;
    name: string;
    authProvider: string;
    email: string;
    password: string;
    roles: string[];
    comparePassword(password: string): Promise<boolean>;
}

type AuthUser = Pick<User, "email" | "password">;
type RegisterUser = Pick<User, "name" | "email" | "password" >;
type RegisterGoogleUser = Pick<User, "name" | "email" | "authProvider">;
type TokenPayload = Pick<User, "_id" | "roles">;
type GooglePayload = Pick<User, "name" | "email">;

export { User, AuthUser, RegisterUser, TokenPayload, GooglePayload, RegisterGoogleUser };