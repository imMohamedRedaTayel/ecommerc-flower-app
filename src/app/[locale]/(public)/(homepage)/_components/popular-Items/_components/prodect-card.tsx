import React from 'react';
import Image from 'next/image';

type ProdectCardProps = {
  title: string;
  price: number;
  imgCover: string;
  priceAfterDiscount?: number;
};

const ProdectCard = ({ title, price, imgCover, priceAfterDiscount }: ProdectCardProps) => {
  return (
    <div className="w-3/12">
      <div className="card rounded-[20px] flex flex-col gap-y-[1rem] px-4 ">
        <div className="relative h-[272px] w-full rounded-[20px] overflow-hidden">
          <Image src={imgCover} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          {priceAfterDiscount ? (
            <p className="text-sm text-red-500">
              ${priceAfterDiscount.toFixed(2)}{' '}
              <span className="line-through text-gray-400">${price.toFixed(2)}</span>
            </p>
          ) : (
            <p className="text-sm">${price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdectCard;
