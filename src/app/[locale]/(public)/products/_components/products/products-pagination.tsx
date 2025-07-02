"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Pagination = ({ totalItems, currentPage }: Pick<Metadata, "totalItems" | "currentPage">) => {
  // Calculate the total number of pages by dividing total items by items per page
  const itemsPerPage = 6;
  // const totalPages = Math.ceil(totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // Function
  const handlePageChange = (page: number) => {
    // Function to navigate to a specific page, with updated search params for URL
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathName}/?${params.toString()}`);
    }
  };

  // Function
  const renderPageButton = (page: number) => (
    // Helper function to render a page number button
    <Button
      key={page}
      className="w-12 h-12 mx-1 rounded-full font-medium bg-violet-950 text-white hover:bg-pink-700 flex items-center justify-center transition-all"
      onClick={() => handlePageChange(page)} // Change page when clicked
      aria-label={`Page ${page}`}
    >
      {page}
    </Button>
  );

  // Function
  const renderEllipsis = (key: string) => (
    // Function to render ellipsis ("⋯") for skipped pages in pagination
    <span
      key={key}
      className="w-12 h-12 mx-1 rounded-full bg-violet-950 text-white flex items-center justify-center"
      aria-hidden="true"
    >
      ⋯
    </span>
  );

  // Function
  const renderPageNumbers = () => {
    // Function to render page numbers with ellipses where necessary
    const pages = [];

    // Always show the first page (unless already on page 1)
    if (currentPage > 1) {
      pages.push(renderPageButton(1));
    }

    // Show ellipsis after the first page if we are far enough from the start
    if (currentPage > 3) {
      pages.push(renderEllipsis("start-ellipsis"));
    }

    // Show the previous page if it's not the first one
    if (currentPage > 2) {
      pages.push(renderPageButton(currentPage - 1));
    }

    // Highlight and display the current page as a non-clickable element
    pages.push(
      <span
        key={currentPage}
        className="w-12 h-12 mx-1 rounded-full font-medium bg-pink-700 text-white flex items-center justify-center"
        aria-current="page"
      >
        {currentPage}
      </span>,
    );

    // Show the next page if it's not the last one
    if (currentPage < totalPages - 1) {
      pages.push(renderPageButton(currentPage + 1));
    }

    // Show ellipsis before the last page if we are far enough from the end
    if (currentPage < totalPages - 2) {
      pages.push(renderEllipsis("end-ellipsis"));
    }

    // Always show the last page (unless already on the last page)
    if (currentPage < totalPages) {
      pages.push(renderPageButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="col-span-3 w-full flex justify-center items-center gap-1 mt-6">
      {/* Previous button */}
      <Button
        className="w-12 h-12 mx-1 rounded-full bg-violet-950 text-white disabled:opacity-50 flex items-center justify-center hover:bg-[#2a1b5a] transition-all"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1} // Disable if on the first page
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Render page number buttons */}
      <div className="flex items-center">{renderPageNumbers()}</div>

      {/* Next button */}
      <Button
        className="w-12 h-12 mx-1 rounded-full bg-violet-950 text-white disabled:opacity-50 flex items-center justify-center hover:bg-pink-700 transition-all"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable if on the last page
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
