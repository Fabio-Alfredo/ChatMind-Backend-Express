
interface User {
    name: string;
    email: string;
    password: string;
    roles: string[];
}

type authUser = Pick<User, "email" | "password">;

export { User, authUser };