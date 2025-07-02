import { Skeleton } from "@/components/ui/skeleton";

export function FilterSkeleton() {
  // Array of item for mapping
  const items = ["r1", "r2", "r3", "r4"];

  return (
    <div className="flex flex-col gap-3 mb-6">
      {items.map((id) => (
        <div key={id} className="flex items-center space-x-3">
          {/* Radio button */}
          <input
            type="radio"
            name="skeleton-filter"
            id={id}
            disabled
            className="h-4 w-4 bg-gray-300 border-gray-400 rounded-full cursor-not-allowed"
          />

          {/* Hidden Label */}
          <label htmlFor={id} className="sr-only">
            Loading option
          </label>

          {/* Skeleton */}
          <Skeleton className="h-10 w-[250px] rounded-full" />
        </div>
      ))}
    </div>
  );
}
