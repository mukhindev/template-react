import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

const { aliases } = require("./package.json");

const prepareAliases = (aliasesObj) => {
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["API_HOST"]);

  // if (!env.API_HOST) {
  //   throw new Error("🔥 Environment variable API_HOST is required");
  // }

  return {
    // vite config
    server: {
      port: 3000,
    },
    define: {
      ...prepareDefine(env),
    },
    plugins: [svgr(), react()],
    resolve: {
      alias: prepareAliases(aliases),
    },
  };
});
