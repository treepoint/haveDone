import { read_cookie } from "../Libs/Sfcookies";

export const APIURL = "/api";
export const uploadedFilesDirectory = "/files";

//Получим заголовки
export function getHeaders() {
  let token = read_cookie("token");

  if (token.length === 0) {
    return null;
  }

  return {
    headers: {
      Authorization: "Bearer " + read_cookie("token")
    }
  };
}
