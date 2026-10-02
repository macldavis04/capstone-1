import axios from "axios";
import tokenService from "./tokenService";
import type { Recipe, NewRecipe } from "../shared.types";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/recipes`;

function authHeaders() {
  return { Authorization: `Bearer ${tokenService.getToken()}` };
}

async function getAll(search: string = ""): Promise<Recipe[]> {
  const res = await axios.get<Recipe[]>(BASE_URL, {
    params: search ? { title: search } : {},
  });
  return res.data;
}

async function getOne(id: string): Promise<Recipe> {
  const res = await axios.get<Recipe>(`${BASE_URL}/${id}`);
  return res.data;
}

async function create(recipe: NewRecipe): Promise<Recipe> {
  const res = await axios.post<Recipe>(BASE_URL, recipe, {
    headers: authHeaders(),
  });
  return res.data;
}

async function update(id: string, recipe: NewRecipe): Promise<Recipe> {
  const res = await axios.put<Recipe>(`${BASE_URL}/${id}`, recipe, {
    headers: authHeaders(),
  });
  return res.data;
}

async function remove(id: string): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`, { headers: authHeaders() });
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};