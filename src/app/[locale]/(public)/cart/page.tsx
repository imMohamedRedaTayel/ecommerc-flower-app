import React from "react";
import { getCartItems } from "@/lib/apis/cart.api";
import CartContent from "./_components/cart-content";

export default async function CartPage() {

  // Fetch Statistics
  const response = await getCartItems();
  
  // Handle null
  if (!response) {
    return <div className="text-red-500">Error loading response</div>;
  }
  const payload = response.cart;
  
  return (
    <section className="container mx-auto py-20"> 
      {/* Cart main content */}
      <CartContent data={ payload } />
    </section>
  );
}
