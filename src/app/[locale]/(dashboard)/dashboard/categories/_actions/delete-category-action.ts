"use server";

import { getAuthToken } from "@/lib/utils/get-auth-token";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export default async function DeleteCategoryAction(id: string) {
  // Translation
  const t = await getTranslations();

  // Variables
  const baseUrl = `${process.env.API}/categories/${id}`;

   const userToken = await getAuthToken();

  // Request options
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(baseUrl, requestOptions);

  const payload: APIResponse<CategoriesResponse> = await response.json();

  // Check if request is not ok, throw this
  if (!response.ok) {
    if ("error" in payload) throw new Error(payload.error);
    throw new Error(t("failed-to-delete-this-category"));
  }

  revalidatePath("categories");

  return payload;
}