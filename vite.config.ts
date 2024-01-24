import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { htmlTransformer } from "./vite-utils/htmlTransformer";
import { prepareDefine } from "./vite-utils/prepareDefine";
import { prepareAliases } from "./vite-utils/prepareAliases";

const PORT = 3000;
const ALIAS = { "~": "src" };
const REQUIRED_ENV_VARIABLES: string[] = [];
const ENV_VARIABLES: string[] = ["API_HOST"];

export default defineConfig((config) => {
  const { mode } = config;

  const env = loadEnv(mode, process.cwd(), [
    ...REQUIRED_ENV_VARIABLES,
    ...ENV_VARIABLES,
  ]);

  for (const variable of REQUIRED_ENV_VARIABLES) {
    if (!env[variable]) {
      throw new Error(`🔥 Env variable "${variable}" is required`);
    }
  }

  return {
    server: { port: PORT },
    define: prepareDefine(env),
    plugins: [
      htmlTransformer({
        "{buildDate}": `<!-- build date: ${new Date().toISOString()} -->`,
      }),
      svgr(),
      react({
        jsxImportSource: "@emotion/react",
      }),
    ],
    resolve: { alias: prepareAliases(ALIAS) },
    test: {
      globals: true,
      environment: "jsdom",
    },
  };
});
