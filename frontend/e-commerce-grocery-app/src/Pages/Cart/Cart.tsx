import { useEffect, useState } from "react";
import CartItem from "../../components/Cart/CartItem.js";
import CartSummary from "../../components/Cart/CartSummary.js";
import EmptyCart from "../../components/Cart/EmptyCart.js";
import { decreaseItem, getCart, increaseItem, removeItem } from "../../services/cartService.js";
import CartSkeleton from "../../components/Cart/CartSkeleton.js";

const Cart = () => {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        try {
            const res = await getCart();
            setCart(res);
        } finally {
            setLoading(false);
        }
    };

    console.log("cart", cart)

    useEffect(() => {
        loadCart();
    }, []);

    const handleIncrease = async (productId: string) => {
        try {
            await increaseItem(productId);

            await loadCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecrease = async (productId: string) => {
        try {
            await decreaseItem(productId);

            await loadCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = async (productId: string) => {
        try {
            const confirmDelete = window.confirm(
                "Remove this item from cart?"
            );

            if (!confirmDelete) return;

            await removeItem(productId);

            await loadCart();
        } catch (error) {
            console.log(error);
        }
    };


    if (loading) {
        return <CartSkeleton />;
    }

    if (!cart || cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-5">

                <h1 className="text-3xl font-bold">
                    Shopping Cart
                </h1>

                {cart.items.map((item: any) => (
                    <CartItem
                        key={item.product}
                        item={item}
                        onIncrease={() => handleIncrease(item.product)}
                        onDecrease={() => handleDecrease(item.product)}
                        onRemove={() => handleRemove(item.product)}
                    />
                ))}

            </div>

            <CartSummary cart={cart} />

        </div>
    );
};

export default Cart;