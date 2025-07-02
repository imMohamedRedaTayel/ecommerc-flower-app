
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import deleteCartItem from "../_actions/delete-product";

export default function useDeleteCartItem() {
  // Translation
  const t = useTranslations();
    
  return useMutation({
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      toast.success(t("product-deleted-successfully"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
