import { cn } from "@/lib/utils/cn";

export default function Headline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-2xl w-fit mb-6 font-semibold text-gray-900 relative ",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
