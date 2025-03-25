
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    roles: string[];
}

type authUser = Pick<User, "email" | "password">;
type registerUser = Pick<User, "name" | "email" | "password">;

export { User, authUser, registerUser };