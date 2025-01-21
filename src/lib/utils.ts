import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl() {
  const env =
    process.env.NODE_ENV || "development";

  switch (env) {
    case "production":
      return process.env.NEXT_PROD_API_URL;
    case "development":
    default:
      return process.env.NEXT_DEV_API_URL;
  }
};
