import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const RefreshToken: FastifyPluginAsyncZod = async (server) => {
    server.post("/refresh/token/v1", async (request, reply) => {
        
       try {
        const token = request.cookies.RefreshToken;

        if(!token) { return reply.status(401).send({message: "Token não encntrado!"})}

        const payload = server.jwt.verify(token) satisfies {sub: string};
        if(!payload) { return reply.status(401).send({message: "Token Expirado!"})}

        const newAcessToken = server.jwt.sign({sub: payload.sub}, {expiresIn: "15min"})

        return reply.status(201).send({
            message: "Login feito com sucesso!",
            "token": "acessToken"
        });
       } catch (error) {
            return reply.status(500).send({error: "erro interno do servidor!"});
       }
    })
}