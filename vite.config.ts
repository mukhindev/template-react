import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

const PORT = 3000;
const ALIAS = { "@": "src" };
const REQUIRED_ENV_VARIABLES: string[] = [];
const ENV_VARIABLES: string[] = ["API_HOST"];

export const prepareAliases = (aliasesObj) => {
  return Object.entries(aliasesObj).reduce((acc, [alias, replacement]) => {
    acc[alias] = path.resolve(__dirname, replacement.toString());

    return acc;
  }, {} as Record<string, string>);
};

const prepareDefine = (env: Record<string, string>) => {
  return Object.entries(env).reduce((define, [variable, value]) => {
    define[`import.meta.env.${variable}`] = `"${value}"`;

    return define;
  }, {} as Record<string, string>);
};

const getRequiredEnvVariableNotFoundMessage = (name: string): string =>
  `🔥 Env variable "${name}" is required`;

export default defineConfig((config) => {
  const { mode } = config;

  const env = loadEnv(mode, process.cwd(), [
    ...REQUIRED_ENV_VARIABLES,
    ...ENV_VARIABLES,
  ]);

  for (const variable of REQUIRED_ENV_VARIABLES) {
    if (!env[variable]) {
      throw new Error(getRequiredEnvVariableNotFoundMessage(variable));
    }
  }

  return {
    server: { port: PORT },
    define: prepareDefine(env),
    plugins: [svgr(), react()],
    resolve: { alias: prepareAliases(ALIAS) },
    test: {
      globals: true,
      environment: "jsdom",
    },
  };
});
