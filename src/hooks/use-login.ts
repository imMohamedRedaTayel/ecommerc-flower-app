import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function useLogin() {
    
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "something went wrong ");
      }

      return response;
    },

    // If mutation succsess
    onSuccess: (data) => {
      toast.success("logged in successfully");
      window.location.href = data?.url || "/";
    },
  });

  return { isPending, error, login: mutate };
}
