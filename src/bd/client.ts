import { User } from "../types/type-user";
import { Users } from "../types/type-user-table";

const User1: User = {
    id: "0",
    nome: "Jose",
    email: "jose@gmail.com",
    senha: "jose1234"
}

export const db: Users = {
    Users: [User1],
}

