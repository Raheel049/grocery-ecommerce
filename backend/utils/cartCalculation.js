export const calculateCart = (cart) => {
    cart.totalItems = cart.items.length;
  
    cart.totalQuantity = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.subTotal,
      0
    );
  
    return cart;
  };