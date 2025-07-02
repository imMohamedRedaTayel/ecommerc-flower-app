"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocale } from "next-intl";

export function BreadcrumbWithCustomSeparator() {
  // Navigation
  const pathname = usePathname();
  const locale = useLocale();

  // Pathname split to array
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb className="flex p-3  border-b">
      <BreadcrumbList>
        {/* Dashboard link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${locale}/dashboard`}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Remaining segments */}
        {pathSegments.slice(2).map((segment, index) => {
          const href = `/${locale}/${["dashboard", ...pathSegments.slice(2, index + 2)].join("/")}`;
          const isLast = index === pathSegments.length - 2;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              {/* Breadcrumb list */}
              <BreadcrumbItem className="capitalize">
                {isLast ? (
                  <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{decodeURIComponent(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
