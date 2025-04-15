import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { AuthService } from "../services/AuthService";

export const RefreshToken: FastifyPluginAsyncZod = async (server) => {
    server.post("/refresh/token/v1", async (request, reply) => {
        
       try {
        const authService = new AuthService(server.jwt);
        const token = request.cookies.RefreshToken;

        if(!token) {return reply.status(401).send({message: "Token não encontrado!"})};

        authService.RefreshToken(token);
        return reply.status(201).send({
            message: "Login feito com sucesso!",
            "token": "acessToken"
        });
       } catch (error) {
            return reply.status(500).send({error: "erro interno do servidor!"});
       }
    })
}