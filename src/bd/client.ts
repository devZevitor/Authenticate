import { User } from "../types/type-user";
import { Users } from "../types/type-user-table";

const User1: User = {
    id: "0",
    nome: "Jose",
    email: "jose@gmail.com",
    senha: "jose1234"
}

const User2: User = {
    id: "1",
    nome: "Ana",
    email: "Ana@gmail.com",
    senha: "ana1234"
}

const User3: User = {
    id: "2",
    nome: "lucas",
    email: "lucas@gmail.com",
    senha: "lucas1234"
}

export const db: Users = {
    Users: [User1, User2, User3],
}

