/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

export declare global {
  interface ImportMetaEnv {
    readonly API_HOST: `http${string}`;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
