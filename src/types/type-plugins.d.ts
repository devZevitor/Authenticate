import {FastifyRequest, FastifyReply} from "fastify";
import "@fastify/jwt";

declare module "fastify"{
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      iat: number;
      exp: number;
    };
    user: {
      sub: string;
      iat: number;
      exp: number;
    };
  }
}