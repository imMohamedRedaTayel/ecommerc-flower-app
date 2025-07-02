import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { registerAction } from "@/lib/actions/auth/register.action";
import { FormNameTypes } from "@/components/features/auth/auth-dailog";
import { RegisterFields } from "@/lib/types/auth";

export default function useRegister({ setFormState }: FormNameTypes) {
    
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({



    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerAction(fields)
      if ( 'error' in payload ) throw new Error( payload.error ) 
      return payload
    },
    onSuccess: () => {
      toast.success( t("account-created") );
      setTimeout(() => {
        setFormState("login");
      }, 1500);
    },
  });

  return { isPending, error, register: mutate };
}
