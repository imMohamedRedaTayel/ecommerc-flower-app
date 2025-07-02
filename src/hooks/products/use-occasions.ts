import { useQuery } from "@tanstack/react-query";

export default function useOccasions() {
  // Fetch occasions from the route
  const { data, isLoading, error } = useQuery({
    queryKey: ["occasions"],
    queryFn: async () => {
      const response = await fetch("/api/occasions");

      const payload: APIResponse<PaginatedResponse<{ occasions: Occasions[] }>> =
        await response.json();

      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },
  });

  return { data, isLoading, error };
}
