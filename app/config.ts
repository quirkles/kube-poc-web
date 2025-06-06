import {z} from "zod";

const configSchema = z.object({
    backendUrl: z.string()
});

type Config = z.infer<typeof configSchema>;

let config: Config | null = null;

export function getConfig(): Config {
    if (config) {
        return config;
    }
    config = configSchema.parse({
        backendUrl: import.meta.env.VITE_BACKEND_URL
    });
    return config;
}