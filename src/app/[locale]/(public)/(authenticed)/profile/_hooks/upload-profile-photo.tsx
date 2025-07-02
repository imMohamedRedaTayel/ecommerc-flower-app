import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadProfilePhotoAction } from "@/lib/actions/auth/upload-profile-Photo.action";
import { useTranslations } from "next-intl";

export function useUploadProfilePhoto() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("photo", file);

        const payload = await uploadProfilePhotoAction(formData);
        console.log("File uploaded successfully:", payload);

        if (payload?.error) {
          console.log("Error in payload:", payload.error);
          throw new Error(payload.error);
        }

        return payload;
      } catch (err) {
        console.error("Error in uploadPhoto hook:", err);
        throw new Error("An error occurred while uploading the photo.");
      }
    },
    onSuccess: () => {
      toast.success(t("Save-Changes"));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    },
  });

  return { isPending, error, uploadPhoto: mutate };
}
