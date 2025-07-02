import verifyOtpAction from "@/lib/actions/verify-otp-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useVerifyOtp() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: verifyotp) => {
      const response = await verifyOtpAction(fields);

      // ✅ If API returns an error, throw an error so React Query can handle it
      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    },

    // Show toast on success
    onSuccess: () => {
      toast.success(t("verified-otp-successfully"));
    },
  });

  return { isPending, error, setPassword: mutate };
}
