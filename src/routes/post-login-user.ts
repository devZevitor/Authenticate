import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../bd/client";
import { AuthService } from "../services/AuthService";

export const LoginUser: FastifyPluginAsyncZod = async (server) => {
    server.post("/login/v1", {
        schema: {
            body: z.object({
                email: z.string(),
                senha: z.string().min(6)
            })
        }
    }, async (request, reply) => {

        const authService =  new AuthService(server.jwt);

        const {email, senha} = request.body;

        const {refreshToken, acessToken} = await authService.Login(email, senha);
        
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