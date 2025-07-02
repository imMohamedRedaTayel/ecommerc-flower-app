import { cn } from "@/lib/utils/cn";

type CircleProps = {
  className?: string;
};

export default function Circle({ className }: CircleProps) {
  return <div className={cn("h-24 w-24 rounded-full bg-zinc-200 animate-pulse", className)} />;
}
