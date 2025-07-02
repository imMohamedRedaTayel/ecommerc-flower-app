import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  // Fetch categories from the route
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");

      const payload: APIResponse<PaginatedResponse<{ categories: Category[] }>> =
        await response.json();

      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },
  });

  return { data, isLoading, error };
}
