import axios from "axios";
import tokenService from "./tokenService";
import type { User } from "../shared.types";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/users`;

type Credentials = {
  email: string;
  password: string;
};

async function signup(creds: Credentials): Promise<void> {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    console.log("signup error", err);
    throw new Error("That email is already taken.");
  }
}

async function login(creds: Credentials): Promise<void> {
  try {
    const res = await axios.post(`${BASE_URL}/login`, creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    console.log("login error", err);
    throw new Error("Email or password is incorrect.");
  }
}

function getUser(): User | null {
  return tokenService.getUserFromToken();
}

function logout(): void {
  tokenService.removeToken();
}

export default {
  signup,
  login,
  getUser,
  logout,
};