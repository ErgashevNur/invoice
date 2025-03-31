import axios from "axios";
import { queryGenerator } from "./utils";

export const api = axios.create({
  baseURL: "https://json-api.uz/api/project/Ergashev's",
});

export async function getAllData() {
  const req = await fetch(`https://json-api.uz/api/project/Ergashev's/data`);

  if (req.status === 200) {
    const { data } = await req.json();
    return data;
  } else {
    throw new Error("Xatolik bo'ldi");
  }
}

export async function getFilter(filter) {
  const req = await fetch(
    `https://json-api.uz/api/project/Ergashev's/data${
      queryGenerator(filter) !== "" ? `?status=${queryGenerator(filter)}` : ""
    }`
  );

  if (req.status === 200) {
    const { data } = await req.json();
    return data;
  } else {
    throw new Error("Xatolik bo'ldi");
  }
}
