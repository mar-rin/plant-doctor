import React from "react";
import icon from "./ShoppingCart.svg";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

function Cart({ inCart, deleteItem }) {
    return (
        <div>
            <img className="icons" src={icon} fill="currentColor" alt="fireSpot" />
            {inCart.length !== 0 && <div className="cartload">{inCart.length}</div>
            }
            <h1 className="checkout">Checkout</h1>
            {inCart.map((entry, index) => (
                <CartItem
                    key={index}
                    cName={entry.name}
                    cPrice={entry.price.toFixed(2)}
                    deleteItem={deleteItem}
                    id={index}
                />
            ))}
            {inCart.length !== 0 ? (
                <CartTotal inCart={inCart} />
            ) : (
                <div>
                    <span className="cart-data separator empty">Your cart is empty</span>
                </div>
            )}
        </div>
    );
}

export default Cart;
