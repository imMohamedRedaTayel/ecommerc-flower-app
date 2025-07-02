"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoGlobe } from "react-icons/go";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export default function SwitchLocale() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Functions
  const switchLocale = (locale: "en" | "ar") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <GoGlobe size={22} className=" text-pink-900 " />
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button className="  w-full " variant={"ghost"} onClick={() => switchLocale("ar")}>
            العربية
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className="  w-full " variant={"ghost"} onClick={() => switchLocale("en")}>
            English
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
