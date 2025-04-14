import fastify from "fastify";
import { POSTUser } from "./routes/post-user.js";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { GetListUser } from "./routes/get-list-users.js";
import pluginAuthenticate from "./plugins/plugin-authenticate.js";
import { LoginUser } from "./routes/post-login-user.js";
import { RefreshToken } from "./routes/post-refresh-token.js";
import { GetDataUser } from "./routes/secure/get-data-user.js";

const server = fastify().withTypeProvider<ZodTypeProvider>();
server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(pluginAuthenticate);

server.register(POSTUser);
server.register(GetListUser);
server.register(LoginUser);
server.register(RefreshToken);
server.register(GetDataUser);

server.listen({port: 3333}).then(() => {
    console.log("server is running!")
})