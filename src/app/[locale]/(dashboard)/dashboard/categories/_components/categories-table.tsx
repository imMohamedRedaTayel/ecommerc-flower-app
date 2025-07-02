"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "@/i18n/routing";
import DeleteCategoryAction from "../_actions/delete-category-action";
import { useDeleteItem } from "@/hooks/use-delete-item";
import { DeleteConfirmationDialog } from "@/components/features/delete-confirmation-dialog/delete-confirmation-dialog";

// Table component
export function CategoriesTable({
  categories,
  isLoading,
}: {
  categories: Category[];
  isLoading: boolean;
}) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutations
  const {mutate: deleteCategory} = useDeleteItem(DeleteCategoryAction);

  return (
    <div className="bg-white rounded-t-custom-10 overflow-hidden">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-gray-100 hover-bg-gray-100">
            <TableHead className="md:w-[200px] text-slate-800">{t("name")}</TableHead>
            <TableHead className="md:w-[200px] text-slate-800">{t("products")}</TableHead>
            <TableHead className="md:w-auto text-right text-slate-800"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* If loading, show skeletons */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3}>
                  <div className="w-full py-3 flex items-center gap-2">
                    <Skeleton className="md:w-[195px] h-4" />
                    <Skeleton className="md:w-[195px] h-4" />
                    <Skeleton className="flex-1 h-4" />
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {/* If no Categories found */}
          {!isLoading && categories.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3} className="py-10 text-center">
                {t("no-results")}
              </TableCell>
            </TableRow>
          )}

          {/* Map through Categories */}
          {!isLoading &&
            categories.length > 0 &&
            categories.map((category) => (
              <TableRow
                key={category._id}
                className={"hover:bg-[#fff4fb] transition-colors duration-300 h-14 px-6"}
              >
                {/* category name */}
                <TableCell className="font-medium">
                  {category.name}
                </TableCell>

                {/* Products Count */}
                <TableCell className="capitalize">
                  {`${category.productsCount} ${t("products").toLocaleLowerCase()}`}
                </TableCell>

                {/* Actions */}
                <TableCell className="w-full text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit action */}
                    <Button
                      onClick={() => router.push("/dashboard/categories/[id]/update-category")}
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <Pencil size={17} />
                      {t("edit")}
                    </Button>

                    {/* Delete action */}
                    <DeleteConfirmationDialog
                      title={t("are-you-absolutely-sure")}
                      onConfirm={() => deleteCategory(category._id)}
                    >
                      <Button className="bg-red-100 text-red-500 hover:bg-red-200 flex items-center gap-1">
                        <RiDeleteBin5Line size={17} />
                        {t("delete")}
                      </Button>
                    </DeleteConfirmationDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}