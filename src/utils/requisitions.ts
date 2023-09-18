import api from "../services/api";

export async function loadResults() {
  const { data } = await api.get("/results", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function deleteResult(id: string) {
  const deleteResult = await api.delete("/results", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id,
    },
  });

  return deleteResult;
}
