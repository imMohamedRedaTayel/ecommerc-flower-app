import Bar from "./_components/bar";
import Circle from "./_components/circle";
import Square from "./_components/square";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col w-[302px]">
      {/* Image  */}
      <Square className="h-[272px] bg-zinc-100 mb-2" />

      {/* Title  */}
      <Bar className="w-1/2" />

      {/* Rating */}
      <div className="flex justify-between items-center">
        <Bar className="w-1/3" />
        <Circle className="h-[40px] w-[40px]" />
      </div>

      {/* Price */}
      <Bar className="w-1/4" />
    </div>
  );
}
