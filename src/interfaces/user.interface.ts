
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    roles: string[];
    comparePassword(password: string): Promise<boolean>;
}

type AuthUser = Pick<User, "email" | "password">;
type RegisterUser = Pick<User, "name" | "email" | "password">;
type TokenPayload = Pick<User, "_id" | "roles">;

export { User, AuthUser, RegisterUser, TokenPayload };