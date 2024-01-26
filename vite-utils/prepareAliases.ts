import path from "path";

export const prepareAliases = (aliasesObj: Record<string, string>) => {
  return Object.entries(aliasesObj).reduce<Record<string, string>>(
    (acc, [alias, replacement]) => {
      acc[alias] = path.resolve(replacement.toString());

      return acc;
    },
    {},
  );
};
