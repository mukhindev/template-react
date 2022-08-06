export const CONFIG = {
  APP_NAME: "nocra",
};

export const MODE = (import.meta.env.MODE || "development") as
  | "development"
  | "production";

export const API_HOST = import.meta.env.API_HOST;
