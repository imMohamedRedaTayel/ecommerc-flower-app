"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HiMiniXMark } from "react-icons/hi2";
import useDeleteCartItem from "../_hooks/use-delete-item";
import QuantityStepper from "./quantity-stepper";
import { CURRENCY } from "@/lib/constants/common";

export default function CartTable({ cartItems }: { cartItems: CartItem[] }) {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Navigation
  const router = useRouter();

  // Mutations
  const { mutate: deleteProduct } = useDeleteCartItem();

  // Variables
  const tableHeaders = ["image", "product-name", "price", "quantity", "sub-total", "options"];

  return (
    <Table>
      {/* Table Header */}
      <TableHeader>
        <TableRow className={`border-none hover:bg-transparent`}>
          {/* Main head */}
          {tableHeaders.map((headerText, i) => (
            <TableHead
              key={i}
              className={`text-center  font-semibold text-black px-6 text-base rtl:text-lg 
              ${headerText === "product-name" && "rtl:text-start rtl:px-12 "}`}
            >
              {/* Header text */}
              <span className="border-b-2 p-2 pb-[9px] font-roboto">
                {t(headerText).toUpperCase()}
              </span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table body */}
      <TableBody>
        {cartItems?.map((item: CartItem) => (
          <TableRow key={item.product._id} className={`border-none py-5 hover:bg-transparent`}>
            {/* Image data cell */}
            <TableCell className="font-medium text-center relative size-[100px]">
              <div
                onClick={() => router.push(`products/${item.product._id}`)}
                className={`cursor-pointer`}
              >
                <Image
                  src={item.product.imgCover}
                  alt={item.product.title}
                  width={120}
                  height={0}
                  className="rounded-[20px] border-2 size-[100px] mx-auto"
                />
              </div>
            </TableCell>

            {/* Product title data cell */}
            <TableCell className="px-6 max-w-[150px]">
              <div>
                {/* Title */}
                <h2
                  onClick={() => router.push(`products/${item.product._id}`)}
                  className="block hover:underline text-storm-900 font-semibold text-[16px] ps-6 font-inter truncate cursor-pointer"
                >
                  {item.product.title}
                </h2>

                <div className="text-start ps-6">
                  {/* Type */}
                  <p className="text-storm-500 py-1 font-roboto">
                    {t("type")}: {t("unknown")}
                  </p>

                  {/* Color */}
                  <p className="text-storm-500 font-roboto">
                    {t("color")}: {t("unknown")}
                  </p>
                </div>
              </div>
            </TableCell>

            {/* Price data cell */}
            <TableCell className="text-center">
              {format.number(item.price, {
                style: "currency",
                currency: CURRENCY,
                maximumFractionDigits: 0,
              })}
            </TableCell>

            {/* Quantity data cell */}
            <TableCell className="text-center">
              {/* Quantity Stepper */}
              <QuantityStepper
                productId={item.product.id}
                initialQuantity={item.quantity}
                max={item.product.quantity}
              />
            </TableCell>

            {/* Sub total data cell */}
            <TableCell className="text-center">{item.price * item.quantity}</TableCell>

            {/* Action data cell */}
            <TableCell className="text-center">
              {/* Delete button */}
              <Button
                onClick={() => deleteProduct(item.product.id)}
                className="size-7 bg-white border text-storm-900 p-0 me-1 rounded-full hover:bg-red-100 hover:text-pink-900"
              >
                <HiMiniXMark className="text-lg" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
