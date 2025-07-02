import { useMutation } from "@tanstack/react-query";
import { checkoutOrder } from "@/lib/actions/checkout-action";
import { useGeolocation } from "./use-geolocation";

interface UseCheckoutProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useCheckout(options: UseCheckoutProps) {
  // Geolocation
  const location = useGeolocation();

  // Mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = await checkoutOrder(data, location);
      return payload;
    },
    onSuccess: options.onSuccess,
    onError: options.onError,
  });

  return mutation;
}