import { editprofileAction } from "@/lib/actions/auth/edit-profile.action";
import { EditProfileFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useEditProfile() {
    
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EditProfileFields) => {
      const payload = await editprofileAction(fields)
      if ( 'error' in payload ) throw new Error( payload.error ) 
      return payload
    },
    onSuccess: () => {
      toast.success( t("Save-Changes") );
    },
  });

  return { isPending, error, EditProfile: mutate };
}
