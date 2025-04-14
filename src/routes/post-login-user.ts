import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../bd/client";

export const LoginUser: FastifyPluginAsyncZod = async (server) => {
    server.post("/login/v1", {
        schema: {
            body: z.object({
                email: z.string(),
                senha: z.string().min(6)
            })
        }
    }, async (request, reply) => {
        const {email, senha} = request.body;

        const user = db.Users.find(user => user.email === email && user.senha === senha);
        if (!user) {return reply.status(401).send({message: "Usuario não encontrado!"})}

        const acessToken = server.jwt.sign({sub: user.id}, {expiresIn: "15min"});
        const refreshToken = server.jwt.sign({sub: user.id}, {expiresIn: "7d"});
        
        reply.setCookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return reply.send({
            message: "Login feito com sucesso!",
            "token": acessToken
        });
    })
}