import { getAuthToken } from "../utils/get-auth-token";

const BASE_URL = `${process.env.API}/statistics`;

export default async function fetchStatistics() {
  // Token
  const token = await getAuthToken();

  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const payload :APIResponse<Statistics> = await response.json();

    if ("error" in payload) throw new Error(payload.error);

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
