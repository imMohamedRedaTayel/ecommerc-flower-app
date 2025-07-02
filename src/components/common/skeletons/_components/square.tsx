import { cn } from "@/lib/utils/cn";

type SquareProps = {
  className?: string;
};

export default function Square({ className }: SquareProps) {
  return (
    <div className={cn("h-[320px] w-[320px] bg-zinc-200 rounded-xl animate-pulse", className)} />
  );
}
