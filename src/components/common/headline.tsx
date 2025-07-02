import { cn } from "@/lib/utils/cn";

export default function Headline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-3xl mx-auto w-fit mb-12 font-bold text-storm-900 relative before:absolute before:-z-10 before:h-1/2 before:rounded-full before:w-9/12 before:bg-pink-50 before:bottom-0 before:left-0 rtl:before:left-auto rtl:before:right-0 after:absolute after:bg-pink-900 after:h-[2px] after:w-2/5 after:bottom-0 after:left-0 rtl:after:left-auto rtl:after:right-0",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
