import { cn } from "@/lib/utils/cn";

type BarProps = {
  className?: string;
};

export default function Bar({ className }: BarProps) {
  return <div className={cn("h-5 w-full bg-zinc-200 animate-pulse rounded-sm", className)} />;
}
