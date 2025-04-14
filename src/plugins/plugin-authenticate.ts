import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { env } from "../types/env";

export default fp(async (server: FastifyInstance) => {
    server.register(cookie);
    server.register(jwt, {
        secret: env.MY_SECRET_KEY,
        sign: { expiresIn: "15min"}
    })

    server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply)=> {
        try {
            await request.jwtVerify();
        } catch (error) {
            return reply.status(500).send({error: "Não autorizado!"})
        }
    })
})