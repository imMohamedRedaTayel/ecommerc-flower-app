import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

declare type addContactParams = {
  name: string;
  email: string;
  message: string;
  phone: string;
};
export default function useContactUs() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, mutate, error } = useMutation({
    mutationFn: async (fields: addContactParams) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(fields);
      return fields;
    },
    onSuccess: () => {
      toast.success(t("contact-message-sucess"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, sendMessage: mutate, error };
}
