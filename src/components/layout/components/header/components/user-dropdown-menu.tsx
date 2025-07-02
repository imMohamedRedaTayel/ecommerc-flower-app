"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { LuUser } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";

export default function UserDropdownMenu() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Session
  const session = useSession();

  // Variables
  const userName =
  (session.data?.user?.firstName ?? "") + " " + (session.data?.user?.lastName ?? "");
  console.log(session.data?.user , 'session.data?.user');
  

  const dropdownMenuItems = [
    {
      title: t("profile"),
      handleClick: () => router.push("/profile"),
    },
    {
      title: t("orders"),
      handleClick: () => router.push("/orders"),
    },
    {
      title: t("dashboard"),
      handleClick: () => router.push("/dashboard"),
    },
    {
      title: t("log-out"),
      handleClick: () => signOut({ callbackUrl: "/" }),
    },
  ];

  return (
    <div
      className={`hover:bg-accent hover:text-accent-foreground transition-colors text-sm size-10 rounded-md flex justify-center items-center`}
    >
      <DropdownMenu>
        {/* Dropdown trigger button*/}
        <DropdownMenuTrigger asChild>
          <Button
            className={
              "bg-transparent hover:bg-transparent p-0 m-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            }
          >
            <LuUser size={22} className="text-pink-900" />
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent className="w-56 absolute ltr:-end-[70px] rtl:-start-[70px]">
          {/* Menu lable */}
          <DropdownMenuLabel className="rtl:text-end">
          {t("my-account")}: {userName} 
          </DropdownMenuLabel>

          {/* Sperator */}
          <DropdownMenuSeparator />

          {/* Items wrapper */}
          <DropdownMenuGroup>
            {/* Menu items */}
            {dropdownMenuItems.map((item, i) => (
              <>
                {item.title === "Log out" && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  key={i}
                  onClick={item.handleClick}
                  className={"rtl:flex rtl:flex-row-reverse cursor-pointer"}
                >
                  {item.title}
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
