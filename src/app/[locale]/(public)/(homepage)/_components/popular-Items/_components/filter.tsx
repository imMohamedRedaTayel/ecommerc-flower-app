"use client"
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';


const Filter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

  const { data: payload } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/categories");
      const payload = await response.json();
      return payload;
    },
  });

  console.log( payload , 'data' );
  

  const handleCategoryClick = (categoryId: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("category", categoryId); // تعديل قيمة `category`
    router.push(`?${currentParams.toString()}`); // تحديث رابط الصفحة
  };

  return (
    <>
      <div>
        <ul className="flex gap-x-6">
          {payload?.categories?.map((category: Category) => (
            <li
              key={category._id}
              className="border p-2 rounded shadow-sm cursor-pointer"
              onClick={() => handleCategoryClick(category._id)} // إضافة حدث عند الضغط
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filter;
