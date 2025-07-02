"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { Plus } from "lucide-react";

interface SectionHeadlineProps {
  title: string;
  route: string;
  btnTitle: string;
}

export default function SectionHeadline({ title, route, btnTitle }: SectionHeadlineProps) {
  // Navigation
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      {/* Section title */}
      <h2 className="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-50">{title}</h2>

      {/* Navigation button */}
      <Button
        onClick={() => router.push(route)}
        size={"sm"}
        variant={"default"}
        className="flex items-center gap-2"
      >
          <Plus size={20}/>
         <span className="hidden md:block">{ btnTitle }</span> 
      </Button>
    </div>
  );
}