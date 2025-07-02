/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteItem = (fn: (id: string) => Promise<any>) => {
  return useMutation({
    mutationFn: async (id: string) => fn(id),
    onSuccess: (d) => {
      if ("message" in d) toast.success(d.message);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};