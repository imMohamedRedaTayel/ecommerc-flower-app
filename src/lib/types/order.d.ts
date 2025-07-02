declare type Order = {
    user: string,
    orderItems: [
        {
            product: Product,
            price: number,
            quantity: number,
            _id: string
        }
    ],
    totalPrice: number,
    paymentType: string,
    isPaid: boolean,
    isDelivered: boolean,
    state: string,
    orderNumber: string,
} & DataBaseFields;