import type { CookieOptions } from "./types";
import { dev } from "$app/environment";

export const sleep = (duration = 2000) =>
  new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });

export const parseLuciaCookies = (cookies: string[]) =>
  cookies.map(cookWhole => {
    const parts = cookWhole.split(";").map(s => s.trim());

    const [cookie, ...options] = parts;
    const [name, value] = cookie.split("=");

    const optionsObj = options.reduce((obj, option) => {
      const [key, val] = option.split("=");
      switch (key) {
        case "Max-Age":
          obj.maxAge = parseInt(val);
          break;
        case "Path":
          obj.path = val;
          break;
        case "HttpOnly":
          obj.httpOnly = true;
          break;
        case "SameSite":
          obj.sameSite = val.toLowerCase() as "lax" | "strict" | "none";
          break;
      }

      obj.secure = !dev;

      return obj;
    }, {} as CookieOptions);

    return { name, value, options: optionsObj };
  });

export const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = window.atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
