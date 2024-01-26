import { Plugin } from "vite";

interface HTMLTransformer {
  (cases: Record<string, string>): Plugin;
}

export const htmlTransformer: HTMLTransformer = (cases) => {
  return {
    name: "vite-plugin-html-transformer",
    transformIndexHtml(html) {
      let updatedHtml = html;

      for (const [searchValue, replaceValue] of Object.entries(cases ?? {})) {
        updatedHtml = updatedHtml.replace(searchValue, replaceValue);
      }

      return updatedHtml;
    },
  };
};
