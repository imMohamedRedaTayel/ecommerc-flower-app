"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Headline from "@/components/common/(dashboard)/headline";
import { useFormatter, useTranslations } from "next-intl";

export function DoughnutPieChart({ statistics }: Statistics) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();

  // Mapping between backend status keys and their display properties
  const statusMap: Record<string, { label: string; color: string }> = {
    completed: { label: t("completed"), color: "#00A85F" },
    inProgress: { label: t("in-progress"), color: "#197FD2" },
    pending: { label: t("pending"), color: "#7A3AED" },
    canceled: { label: t("cancelled"), color: "#E93538" },
  };

  // Transform statistics data into chart-compatible format
  const chartData = Object.entries(statusMap).map(([statusKey, { label, color }]) => {
    const match = statistics?.orders.ordersByStatus.find((s) => s._id === statusKey);
    return {
      status: label,
      count: match?.count || 0,
      fill: color,
    };
  });

  const total = chartData.reduce((acc, item) => acc + item.count, 0);

  // Chart configuration for tooltips and legends
const chartConfig: ChartConfig = Object.fromEntries(
  Object.values(statusMap).map(({ label, color }) => [label, { label, color }])
);

  return (
    <Card className="flex flex-col h-full">
      {/* Chart header */}
      <CardHeader className="items-center pb-0">
        <Headline> {t("orders-status")}</Headline>
      </CardHeader>

      {/* Chart content */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              innerRadius={50}
              labelLine={false}
              label={({ cx, cy, midAngle = 0, outerRadius, percent = 0 }) => {
                // Calculate badge position
                const radius = outerRadius;
                const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

                const badgeSize = 32;

                return (
                  <foreignObject
                    x={x - badgeSize / 2}
                    y={y - badgeSize / 2}
                    width={badgeSize}
                    height={badgeSize}
                  >
                    {/* Percentage badge */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold text-gray-800 py-1 px-2 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
                      {format.number(percent, "percentage")}
                    </div>
                  </foreignObject>
                );
              }}
              nameKey="status"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Chart footer */}
      <CardFooter className="flex flex-col gap-2 text-sm justify-center items-center">
        {chartData.map((item) => {
          return (
            <div key={item.status} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-semibold text-xs">{item.status}</span>
              </div>
              {/* Count and percentage */}
              <span className="whitespace-nowrap font-bold text-xs">
                {format.number(item.count, "digit")} (
                {format.number(item.count / total, "percentage")})
              </span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
}
