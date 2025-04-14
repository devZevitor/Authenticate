import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../bd/client";
import z from "zod"

export const GetListUser: FastifyPluginAsyncZod = async (server) => {
    server.get("/list/users/v1", (request, reply) => {
            
    const users = db.Users;
    if(!users) { return reply.status(401).send({message: "Nenhum usuario cadastrado"})}

    return reply.status(201).send(users);

    })
}