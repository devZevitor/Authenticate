import z from "zod";

const envSchema = z.object({
    MY_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)