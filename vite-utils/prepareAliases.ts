import path from "path";

export const prepareAliases = (aliasesObj) => {
  return Object.entries(aliasesObj).reduce(
    (acc, [alias, replacement]) => {
      acc[alias] = path.resolve(replacement.toString());

      return acc;
    },
    {} as Record<string, string>,
  );
};
