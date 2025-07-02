"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderItemSkeleton() {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-pink-700">
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-24" />
          </div>
          <Badge variant="secondary" className="w-fit capitalize">
            <Skeleton className="h-4 w-20" />
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {[1, 2].map((_, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        ))}

        <Separator className="my-2" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-between font-bold text-pink-900">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 w-full flex-1" />
          <Skeleton className="h-10 w-full flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}
