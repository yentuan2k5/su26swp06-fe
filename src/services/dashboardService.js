import { apiRequest } from "./api";

function unwrapResponse(response) {
  if (!response) return null;

  if (response.data !== undefined) return response.data;
  if (response.result !== undefined) return response.result;
  if (response.payload !== undefined) return response.payload;

  return response;
}

export async function getDashboardOverview() {
  const response = await apiRequest("/dashboard/overview", {
    method: "GET",
  });

  return unwrapResponse(response);
}
