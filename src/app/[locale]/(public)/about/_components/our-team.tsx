import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function OurTeam() {
  // Translation
  const t = useTranslations();

  // Variables
  const teamMembers = [
    {
      name: "Ahmed Mohamed",
      title: t("senior-manager"),
      image: "/assets/images/about/our-team-1.png",
    },
    {
      name: "Sara Ali",
      title: t("product-designer"),
      image: "/assets/images/about/our-team-2.png",
    },
    {
      name: "Khaled Hassan",
      title: t("frontend-developer"),
      image: "/assets/images/about/our-team-3.png",
    },
    {
      name: "Fatma Tarek",
      title: t("marketing-lead"),
      image: "/assets/images/about/our-team-4.png",
    },
  ];

  return (
    <section className="container mx-auto my-[80px]">
      <div className="flex flex-col items-center justify-center">
        {/* Heading */}
        <h5 className="text-pink-900 font-bold text-lg tracking-[4px] uppercase mb-[24px]">
          {t("our-team")}
        </h5>

        {/* Sub Heading */}
        <h3 className="font-bold text-3xl relative after:content-[''] after:block after:w-[53px] after:h-[2px] after:bg-pink-900 before:content-[''] before:w-[140px] before:h-[20px] before:bg-pink-50 before:rounded-full before:block before:absolute before:top-1/2 before:left-0 before:-z-20">
          {t.rich("our-team-heading", {
            span: (v) => <span className="text-pink-900">{v}</span>,
          })}
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {teamMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={250}
                height={272}
                className="w-full h-auto object-cover rounded pb-4 "
              />
              <CardTitle className="font-bold">{member.name}</CardTitle>
              <CardDescription className="font-bold text-base text-pink-900 ">
                {member.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <hr className="border-storm-500" />
            </CardContent>
            <CardFooter className="flex justify-center gap-3 ">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-pink-900 text-white flex items-center justify-center hover:bg-pink-100 hover:text-pink-900 transition cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
