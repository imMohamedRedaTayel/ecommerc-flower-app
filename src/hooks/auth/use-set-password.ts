import { FormNameTypes } from "@/components/features/auth/auth-dailog";
import setPasswordAction from "@/lib/actions/set-password-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useSetPassword({setFormState} : FormNameTypes) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: setPasswordValuse) => {
      const response = await setPasswordAction(fields);

      // ✅ If API returns an error, throw an error so React Query can handle it

      return response;
    },

    onSuccess: () => {
      toast.success(t("password-has-been-set-successfully"));
      setFormState('login')
    },
  });
  return { isPending, error, setPassword: mutate };
}
