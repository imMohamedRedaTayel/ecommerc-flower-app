"use server";

export default async function setPasswordAction(
  fields: setPasswordValuse,
): Promise<ResponseSetpasswordData> {
  try {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    // Return updated user data
    const payload: ResponseSetpasswordData = await response.json();

    return payload;
  } catch (error: unknown) {
    console.error("Error in setPasswordAction:", error);

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred." };
  }
}
