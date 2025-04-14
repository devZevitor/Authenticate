import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../bd/client";
import z from "zod"

export const POSTUser: FastifyPluginAsyncZod = async (server) => {
    server.post("/create/user/v1", {
        schema: {
            body: z.object({
                nome: z.string(),
                email: z.string().email(),
                senha: z.string().min(6)
            })
        }
    }, async (request, reply) => {
        const {nome, email, senha} = request.body;

        const existUser = await db.Users.find(user => user.email === email );
        if (existUser) { return reply.status(401).send({message: "Usario já cadastrado!"})};

        const userId = db.Users.length.toString();
        db.Users.push({
            id: userId,
            nome,
            email,
            senha,
        })

        return reply.status(201).send({
            message: "Usuario cadastrado com sucesso",
            id: userId
        });

    })
}