"use client";

import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagHandleOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import SwitchLocale from "@/components/common/switch-locale";
import UserDropdownMenu from "./components/user-dropdown-menu";
import { CgMenuRightAlt } from "react-icons/cg";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { AuthDialog } from "@/components/features/auth/auth-dailog";
import NavbarLinks from "./components/navbar-links";

export default function Header() {
  // Translation
  const t = useTranslations();

  // Navgation
  const router = useRouter();

  // Session
  const session = useSession();

  // States
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Variables
  const headerIcons = [
    {
      icon: <IoMdHeartEmpty size={22} className="text-pink-900" />,
      onClick: () => console.log("Heart clicked"),
    },
    {
      icon: <IoBagHandleOutline size={22} className="text-pink-900" />,
      onClick: () => router.push("/cart"),
    },
  ];

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Side effects
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="container flex justify-between gap-6 items-center py-4">
      {/* Header logo */}
      <Link href={"/"}>
        <Image
          src={"/assets/images/Logo.png"}
          alt="logo"
          width={86}
          height={86}
          className="object-cover"
        />
      </Link>

      {/* Navigation */}
      {!isSmallScreen ? (
        <NavbarLinks />
      ) : (
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-70 ${isMenuOpen ? "block md:hidden" : "hidden md:hidden"}`}
        >
          <div className={`w-[65%] bg-white overflow-hidden`}>
            {/* Logo and Close button */}
            <div className="flex justify-between items-center gap-6 px-6 py-2">
              {/* Header logo */}
              <Link href={"/"}>
                <Image
                  src={"/assets/images/Logo.png"}
                  alt="logo"
                  width={86}
                  height={86}
                  className="object-cover"
                />
              </Link>

              {/* Close button */}
              <Button
                onClick={toggleMenu}
                className="size-10 bg-white border text-storm-900 p-0 me-1 rounded-full hover:bg-gray-100"
              >
                <HiMiniXMark className="text-2xl" />
              </Button>
            </div>

            {/* NavLinks */}
            <NavbarLinks smallScreen={isSmallScreen} openMenu={setIsMenuOpen} />
          </div>
        </div>
      )}

      {/* Header icons */}
      <div className="flex space-x-2 justify-end">
        {/* Search */}
        <Button size={"icon"} variant={"ghost"}>
          <IoSearchOutline size={22} className="text-pink-900" />
        </Button>

        {/* If user is authenticated render the navbar icons, otherwise render login button */}
        {session.data ? (
          <>
            {/* Navbar Icons */}
            {headerIcons.map((item, index) => (
              <Button
                key={index}
                size={"icon"}
                variant={"ghost"}
                onClick={item.onClick}
                className=" shrink-0"
              >
                {item.icon}
              </Button>
            ))}

            {/* User dropdown menu */}
            <UserDropdownMenu />
          </>
        ) : (
          <>
            {/* Login button */}
            <AuthDialog>
              <Button className="bg-pink-900 text-white hover:text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors shadow-sm border border-persianRose-600 font-semibold">
                {t("login")}
              </Button>
            </AuthDialog>
          </>
        )}

        {/* Locale */}
        <SwitchLocale />

        {/* Menubar icon */}
        <Button onClick={toggleMenu} size={"icon"} variant={"ghost"}>
          <CgMenuRightAlt size={28} className="text-pink-900 md:hidden" />
        </Button>
      </div>
    </header>
  );
}
