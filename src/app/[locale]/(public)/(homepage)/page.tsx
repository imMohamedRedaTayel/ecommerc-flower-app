import React from "react";
import Categories from "./_components/Categories";
import fetchCategories from "@/lib/apis/category.api";
import BestShop from "./_components/best-shop";
import GiftShop from "./_components/gift-shop";
import BestSeller from "./_components/best-selling";
import PopularProducts from "./_components/popular-products";
import Gallery from "./_components/gallery";
import Testmonials from "@/components/common/(shared)/testmonials";
import About from "@/components/common/(shared)/about";
import Features from "@/components/common/(shared)/features";
import Companies from "@/components/common/(shared)/companies";

export default async function Page({ searchParams }: RouteProps) {
  //  Variables
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "673c46fd1159920171827c85";

  // Query params
  const queryParams = {
    category,
    sort: "-sold",
  };

  const payload = await fetchCategories();

  return (
    <>
      <main className=" min-h-screen ">
        {/* Categories */}
        <Categories categories={payload?.categories} />

        {/* Best Shop */}
        <BestShop />

        {/* Gift Shop */}
        <GiftShop />

        {/* Features */}
        <Features />

        {/* Best selling */}
        <BestSeller />

        {/* Popular products */}
        <PopularProducts
          categories={payload?.categories}
          currentCategory={category}
          searchParams={queryParams}
        />

        {/* About */}
        <About />

        {/* Gallery */}
        <Gallery />

        {/* Testimonials */}
        <Testmonials />

        {/* Companies */}
        <Companies />
      </main>
    </>
  );
}
