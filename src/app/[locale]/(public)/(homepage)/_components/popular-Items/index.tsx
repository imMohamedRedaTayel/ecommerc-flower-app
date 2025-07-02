/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Filter from './_components/filter';
import ProdectCard from './_components/prodect-card';

const PopularItems = async ({searchParams}:any) => {

  // console.log(searchParams , 'searchParams');
  
  const category = searchParams?.category

  // إرسال معلمة 'category' في الطلب إلى الـ API فقط إذا كانت موجودة
  const url = category 
    ? `${process.env.API}/products?category=${category}` 
    : `${process.env.API}/products`; // إذا لم تكن موجودة، استخدم URL بدون معلمة category

  const response = await fetch(url, {
    method: 'GET',
  });

  const payload = await response.json();
  console.log(payload, 'data');

  return (
    <>
      <section>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-y-[40px]">
            <div className="w-full flex items-center justify-between">
              <h2>Popular Items</h2>
              <Filter />
            </div>
            <div className="flex flex-wrap ">
              {payload.products.map((product: any) => (
                <ProdectCard
                  key={product._id}
                  title={product.title}
                  price={product.price}
                  imgCover={product.imgCover}
                  priceAfterDiscount={product.priceAfterDiscount}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularItems;
