import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../bd/client";
import "../../types/type-plugins.d.ts";

export const GetDataUser: FastifyPluginAsyncZod = async (server) => {
    server.get("/user/data/v1", {
        preHandler: [server.authenticate],
    }, (request, reply) => {

        try {
            const sub = request.user.sub 
            const user = db.Users.find(u => u.id === sub);
            if (!user) {return reply.status(401).send({message: "Usuario não encontrado!"})};

            return reply.send(user);
        } catch (error) {
            return reply.status(500).send({error: "erro interno do servidor!"});
        }
    })
}