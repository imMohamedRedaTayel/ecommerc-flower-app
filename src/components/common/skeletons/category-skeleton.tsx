import Bar from "./_components/bar";
import Circle from "./_components/circle";

export default function CategorySkeleton() {
  return (
    <div className="w-[246px] h-[122px] bg-zinc-100 animate-pulse rounded-[20px] flex items-center px-4">
      {/* Category Image */}
      <div className="flex justify-between items-center gap-3">
        <Circle />

        {/* Text */}
        <div className="flex flex-col gap-4">
          <Bar className="w-20 h-3" />
          <Bar className="w-20 h-3" />
        </div>
      </div>
    </div>
  );
}
