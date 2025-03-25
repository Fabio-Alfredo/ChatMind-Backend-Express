
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    roles: string[];
}

type authUser = Pick<User, "email" | "password">;
type registerUser = Pick<User, "name" | "email" | "password">;
type tokenPayload = Pick<User, "_id" | "roles">;

export { User, authUser, registerUser, tokenPayload };