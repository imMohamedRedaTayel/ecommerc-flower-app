/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Headline from "@/components/common/(dashboard)/headline";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export function RevenueChart({ statistics }: Statistics) {
  // Translations
  const t = useTranslations();

  // Varibales
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const format = useFormatter();
  const locale = useLocale();

  const monthlyData = statistics?.orders?.monthlyRevenue?.map((item: any) => ({
    label: format.dateTime(new Date(item._id + "-01"), {
      month: "short",
      year: "2-digit",
    }),
    revenue: item.revenue,
  }));

  const weeklyData = statistics?.orders?.dailyRevenue?.map((item: any) => ({
    label: format.dateTime(new Date(item._id), {
      weekday: "short"
    }),
    revenue: item.revenue,
  }));

  const data = view === "monthly" ? monthlyData : weeklyData;

  return (
    <Card className="h-full p-6 border-none ">
      <CardHeader className="flex md:flex-row items-center justify-between ">
        {/* Head Line */}
        <Headline className="mb-0"> {t("revenue")} </Headline>

        <div className="flex items-center !m-0 ">
          <Button
            variant="ghost"
            className={
              view === "monthly" ? "text-pink-900 font-semibold" : "text-gray-400 font-normal"
            }
            onClick={() => setView("monthly")}
          >
            {t("monthly")}
          </Button>

          <Button
            variant="ghost"
            className={
              view === "weekly" ? "text-pink-900 font-semibold" : "text-gray-400 font-normal"
            }
            onClick={() => setView("weekly")}
          >
            {t("last-week")}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={locale === "ar" ? { right: 40, left: 0 } : { left: 40, right: 0 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F9ADE2" />
                <stop offset="100%" stopColor="#F8B1EF00" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickFormatter={(value) => format.number(value, "currency-base-no-fractions")}
              tickLine={false}
              axisLine={false}
              tickMargin={locale === "ar" ? 40 : 8}
              tick={{ fontSize: 10, fontWeight: 700 }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="natural"
              stroke="url(#gradient)"
              fill="url(#gradient)"
              fillOpacity={0.4}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
