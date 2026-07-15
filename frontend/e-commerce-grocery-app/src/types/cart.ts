export interface CartItem {
    product: string;
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
    subTotal: number;
  }
  
  export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    totalItems: number;
    totalQuantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  }