/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import updateQuantity from "../_actions/update-quantity-action";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { useTranslations } from "next-intl";

type QuantityStepperProps = {
  productId: string;
  initialQuantity: number;
  max: number;
};

type MutationProps = {
  quantity: number;
} & Pick<QuantityStepperProps, "productId">;

export default function QuantityStepper({ productId, initialQuantity, max }: QuantityStepperProps) {
  // Translation
  const t = useTranslations();

  // States
  const [optimisticQuantity, setOptimisticQuantity] = useState(initialQuantity);

  // Debouncing
  const [debouncedMutate] = useDebounce(optimisticQuantity, 300);

  // Mutations
  const { mutate: update } = useMutation({
    mutationFn: ({ productId, quantity }: MutationProps) => updateQuantity({ productId, quantity }),
    retry: false,
    onMutate: async ({ quantity }) => {
      // Update local quantity
      setOptimisticQuantity(quantity);
    },
    onSuccess: (data) => {
      toast.success(t("quantity-updated"), { duration: 800 });
    },
    onError: (error) => {
      // Set the initial quantity on error
      setOptimisticQuantity(initialQuantity);
      toast.error(error.message);
    },
  });

  // Functions
  const handleIncrement = () => {
    if (optimisticQuantity >= max) {
      toast.warning(t("you-have-reached-the-maximum-of-stock"));
      return;
    }
    const newQuantity = optimisticQuantity + 1;
    setOptimisticQuantity(newQuantity);
    update({ productId, quantity: newQuantity });
  };

  const handleDecrement = () => {
    if (optimisticQuantity <= 1) return;
    const newQuantity = optimisticQuantity - 1;
    setOptimisticQuantity(newQuantity);
    update({ productId, quantity: newQuantity });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Increment button */}
      <Button
        type="button"
        onClick={handleDecrement}
        disabled={optimisticQuantity <= 1}
        className="size-6 bg-pearl text-pink-900 hover:bg-pink-200 p-0 me-1 rounded-full text-lg"
      >
        <LuMinus />
      </Button>

      {/* Quantity */}
      <span className="w-8 text-center">{optimisticQuantity}</span>

      {/* Decrement button */}
      <Button
        type="button"
        onClick={handleIncrement}
        disabled={optimisticQuantity === max}
        className="size-6 p-0 bg-pearl text-pink-900 hover:bg-pink-200 ms-1 rounded-full text-lg"
      >
        <LuPlus />
      </Button>
    </div>
  );
}
