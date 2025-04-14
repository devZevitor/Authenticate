import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../bd/client";

export const GetDataUser: FastifyPluginAsyncZod = async (server) => {
    server.get("/user/data/v1/:userId", {
        preHandler: [server.authenticate],
        schema: {
            params: z.object({
                userId: z.string(),
            })
        }
    }, (request, reply) => {

        try {
            const { userId } = request.params;
        
            const user = db.Users.find(user => user.id === userId)
            if (!user) {return reply.status(401).send({message: "Usuario não encontrado!", id: userId})}

            return reply.send(user);
        } catch (error) {
            return reply.status(500).send({error: "erro interno do servidor!"});
        }
    })
}