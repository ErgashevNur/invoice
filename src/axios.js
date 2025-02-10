import axios from "axios";
import { useState, useEffect } from "react";
import { queryGenerator } from "./utils";

export const api = axios.create({
  baseURL: "https://json-api.uz/api/project/Invoice",
});

// export const useFetchInvoices = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://json-api.uz/api/project/Invoice/data")
//       .then((response) => {
//         if (response.status === 200) {
//           setData(response.data.data);
//         }
//       })
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { data, loading, error };
// };

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
