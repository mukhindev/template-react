export const API_HOST = import.meta.env.API_HOST;

export const MODE = (import.meta.env.MODE || "development") as
  | "development"
  | "production"
  | "test"
