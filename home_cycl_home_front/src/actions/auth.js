import { getReq, postReq } from "./api";

export async function authRegister(values) {
  return await postReq("/register", values, false);
}

export async function authLogin(values) {
  const data = await postReq("/login", values, false);
  let currentUser;

  if (data) {
    localStorage.setItem("token", data.token);
    currentUser = await getReq("/me");
    localStorage.setItem("user", JSON.stringify(currentUser));
  }

  return currentUser;
}

export async function authLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
