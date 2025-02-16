import axios from "axios";
import { useState, useEffect } from "react";
import { queryGenerator } from "./utils";

export const api = axios.create({
  baseURL: "https://json-api.uz/api/project/Invoice",
});

export async function getAllData() {
  const req = await fetch(`https://json-api.uz/api/project/Invoice/data`);

  if (req.status === 200) {
    const { data } = await req.json();
    return data;
  } else {
    throw new Error("Xatolik bo'ldi");
  }
}

export async function getFilter(filter) {
  const req = await fetch(
    `https://json-api.uz/api/project/Invoice/data${
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
