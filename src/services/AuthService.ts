import { FastifyInstance } from "fastify";
import { db } from "../bd/client";

export class AuthService {
    constructor (private jwt: FastifyInstance["jwt"]) {}

    async Login(email: string, senha: string){
        const user = db.Users.find(user => user.email === email && user.senha === senha);
        if(!user) { throw new Error("Usuario não encontrado!")};

        const acessToken = this.jwt.sign({ sub: user.id }, { expiresIn: "15min"});
        const refreshToken = this.jwt.sign({ sub: user.id }, { expiresIn: "7d"});

        return {acessToken, refreshToken}
    }

    async RefreshToken(token: string) {

        const payload = this.jwt.verify(token) satisfies {sub: string};
        if(!payload) { throw new Error("Token não encontrado ou invalido!")};

        const acessToken = this.jwt.sign({ sub: payload.sub }, { expiresIn: "15min"});

        return { acessToken }
    }
 }