"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

// Types
interface DeleteConfirmationDialogProps {
  title: string;
  onConfirm: () => void;
  children?: React.ReactNode;
}

export function DeleteConfirmationDialog({ title, onConfirm, children }: DeleteConfirmationDialogProps) {
  // Translation
  const t = useTranslations();

  // States
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="destructive">{t("delete")}</Button>}
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl py-6 px-8 text-center">
        {/* Icon */}
        <div className="relative flex justify-center mb-24">
          <Trash className="z-50 relative top-12 w-6 h-6 text-gray-600" />
          <div className="absolute h-16 w-16 bg-gray-400 opacity-15 rounded-full z-10 top-8"></div>
          <div className="absolute h-28 w-28 bg-gray-400 opacity-5 rounded-full top-2"></div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Button */}
        <div className="flex justify-between gap-2">
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {t("confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}