"use server";

export default async function verifyOtpAction(fields: verifyotp): Promise<ResponseOtpData> {
  try {
    // Make API request to verify OTP
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    // Return updated user data
    const payload: ResponseOtpData = await response.json();
    return payload;
  } catch (error: unknown) {
    console.error("Error in verifyOtpAction:", error);

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred." };
  }
}
