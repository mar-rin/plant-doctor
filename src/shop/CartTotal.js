import React, { useState, useMemo } from "react";

function CartTotal({ inCart }) {
    let total = 0;
    const [vat, setVat] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    for (let i = 0; i < inCart.length; i++) {
        total = total + inCart[i]["price"];
    }

    useMemo(() => {
        return setVat(total * 0.2);
    }, [total]);

    useMemo(() => {
        return setGrandTotal(total + vat);
    }, [total, vat]);

    console.log("inCart from CartTotal: " + inCart);

    return (
        <div className="cart-data separator">
            <div className="cart-item">
                <span className="prod aggr">Sum Total:</span>
                <span className="price total">€ {total.toFixed(2)}</span>
            </div>
            <div className="cart-item">
                <span className="prod aggr">VAT:</span>
                <span className="price total">€ {vat.toFixed(2)}</span>
            </div>
            <div className="cart-item">
                <span className="prod aggr">Grand Total:</span>
                <span className="price total">€ {grandTotal.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default CartTotal;
