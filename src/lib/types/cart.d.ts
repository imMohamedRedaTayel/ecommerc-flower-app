declare type CartItem = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

declare type AddToCartInput = {
  productId: string;
  quantity: number;
  token: string;
};
declare type CartResponse = {
  numOfCartItems: number;
  cart: {
    _id: string;
    user: string;
    cartItems: cartItem[];
    discount: number;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
};

declare type Cart = {
  _id: string;
  user: string;
  cartItems: cartItem[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};

declare type CashCheckoutResponse = {
  order: Order;
};

declare type CreditCheckoutResponse = {
  session: {
    id: string;
    object: string;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      status: string | null;
    };
    cancel_url: string;
    client_reference_id: string | null;
    currency: string;
    customer: string | null;
    customer_email: string | null;
    expires_at: number;
    livemode: boolean;
    metadata: Record<string, string>;
    mode: string;
    payment_intent: string | null;
    payment_method_types: string[];
    status: string;
    success_url: string;
    total_details: {
      amount_discount: number;
      amount_shipping: number;
      amount_tax: number;
    };
    url: string;
  };
};
