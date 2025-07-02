"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { LuCalendarHeart } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPackage } from "react-icons/bi";
import { LuFlower } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

export function AppSidebar() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Pathname
  const pathname = usePathname();

  // Get user data
  const session = useSession();
  const userData = session?.data;

  const sideItem = [
    {
      name: t("overview"),
      url: "/dashboard",
      icon: <BiSolidCategoryAlt />,
      match: (path: string) => path === "/dashboard",
    },
    {
      name: t("categories"),
      url: "/dashboard/categories",
      icon: <MdOutlineCategory />,
      match: (path: string) => path.startsWith("/dashboard/categories"),
    },
    {
      name: t("occasions-0"),
      url: "/dashboard/occasions",
      icon: <LuCalendarHeart />,
      match: (path: string) => path.startsWith("/dashboard/occasions"),
    },
    {
      name: t("products-0"),
      url: "/dashboard/products",
      icon: <BiPackage />,
      match: (path: string) => path.startsWith("/dashboard/products"),
    },
  ];

  // Frist character of the user name with random color
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-black",
  ];
  const firstCharacter = userData?.user?.firstName.charAt(0).toUpperCase();
  const firstCharacterColor = colors[Math.floor(Math.random() * colors.length)];
  const firstCharacterStyle = `${firstCharacterColor} text-white font-bold text-2xl flex items-center justify-center rounded-full w-10 h-10`;

  return (
    <Sidebar side={locale === "ar" ? "right" : "left"} className="p-3 !bg-white">
      <SidebarHeader className="m-auto !bg-white ">
        <div className="bg-white px-16">
          <Image
            src={"/assets/images/Logo.png"}
            alt="logo"
            width={86}
            height={86}
            className="object-cover bg-white"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="my-2">
              <SidebarMenuItem>
                <Link
                  href="/"
                  className="flex justify-center items-center content-center bg-pink-900 p-2 rounded-xl"
                >
                  <div className="flex justify-start items-center gap-2">
                    <span className="text-white text-lg">
                      <LuFlower />
                    </span>
                    <span className="font-semibold text-white">{t("preview-website")}</span>
                  </div>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {sideItem.map((item) => (
                <SidebarMenuItem
                  key={item.name}
                  className={` hover:rounded-xl flex justify-start active: items-center content-center ${
                    item.match(pathname) ? "bg-custom-pink" : ""
                  } `}
                >
                  <Link
                    href={item.url}
                    className={`w-60 h-10 rounded-xl ${
                      item.match(pathname) ? "text-pink-900" : "text-slate-800"
                    } `}
                  >
                    <div className="flex justify-start items-center content-center gap-2 pt-1">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-bold text-lg">{item.name}</span>
                    </div>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white  gap-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="grid grid-cols-12 gap-1">
                <div className="col-span-10">
                  <div className="flex gap-1">
                    <div>
                      <div className={firstCharacterStyle}>{firstCharacter}</div>
                    </div>
                    <div className="flex flex-col flex-wrap  justify-start items-start content-center">
                      <span className="font-bold text-sm text-slate-800 capitalize">
                        {userData?.user?.firstName} {userData?.user?.lastName}
                      </span>
                      <span className="text-xs text-slate-500">{userData?.user?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <DropdownMenuTrigger>
                    <div>
                      <BsThreeDotsVertical />
                    </div>
                  </DropdownMenuTrigger>
                </div>
              </div>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <Link href="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="bg-white text-black"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    {t("logout")}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
