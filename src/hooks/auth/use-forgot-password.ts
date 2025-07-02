import { forgotpasswordAction } from "@/lib/actions/auth/forgot-password.action";
import { ForgotPasswordFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useForgotPassword() {
    
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ForgotPasswordFields) => {
      const payload = await forgotpasswordAction(fields)
      if ( 'error' in payload ) throw new Error( payload.error ) 
      return payload
    },
    onSuccess: () => {
      toast.success( t("OTP-Email") );
    },
  });

  return { isPending, error, ForgotPassword: mutate };
}
