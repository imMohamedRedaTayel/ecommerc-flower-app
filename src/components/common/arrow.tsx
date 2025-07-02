import { cn } from "@/lib/utils/cn";
import { ArrowRight as LucidArrowRight, LucideProps } from "lucide-react";
import { RefAttributes } from "react";

export function ArrowRight(props: Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>) {
  return <LucidArrowRight {...props} className={cn("rtl:-scale-x-100", props.className)} />;
}

export function ArrowLeft(props: Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>) {
  return <LucidArrowRight {...props} className={cn("ltr:-scale-x-100", props.className)} />;
}
