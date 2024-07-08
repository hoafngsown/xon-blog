import { clsx, type ClassValue } from "clsx";
import cryptoJs from "crypto-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(email: string) {
  const hashedEmail = cryptoJs.SHA256(email);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `https://www.gravatar.com/avatar/${hashedEmail}`;
}
