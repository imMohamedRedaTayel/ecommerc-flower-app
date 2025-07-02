"use server";

import { decode } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function uploadProfilePhotoAction(formData: FormData) {
  try {

    const tokenCookie = cookies().get("next-auth.session-token")?.value;
    const token = await decode({ token: tokenCookie, secret: process.env.NEXTAUTH_SECRET! });

    const response = await fetch(`${process.env.API}/auth/upload-photo`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      console.error("Failed to upload photo:", response.statusText);
      throw new Error(`Error uploading photo: ${response.statusText}`);
    }

    const payload = await response.json();
    revalidateTag('profile')
    
    if (payload.error) {
      console.log("Error in server payload:", payload.error);
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw new Error("An error occurred while uploading the photo.");
  }
}

