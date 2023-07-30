export const prepareDefine = (env: Record<string, string>) => {
  return Object.entries(env).reduce(
    (define, [variable, value]) => {
      define[`import.meta.env.${variable}`] = `"${value}"`;

      return define;
    },
    {} as Record<string, string>,
  );
};
