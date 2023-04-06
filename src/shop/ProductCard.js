import React, { useState } from "react";


function ProductCard({ src, src2, pName, pPrice, pText, toCart }) {
    const [isActive, setIsActive] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    function handleMouseOver() {
        setIsActive(true);
    }

    function handleMouseOut() {
        setIsActive(false);
    }

    function handleFlip() {
        setIsFlipped(true);
    }

    function handleRevert() {
        setIsFlipped(false);
    }

    function BuyMe() {
        return (
            <button className="buy-button" name={pName} onClick={toCart}>
                ADD TO CART
            </button>
        );
    }

    function ShowDescription() {
        return <span className="productDescription">{pText}</span>;
    }

    function FlipImage() {
        if (isFlipped) {
            return <img src={src2} alt="" />;
        } else {
            return <img src={src} alt="" />;
        }
    }

    return (
        <div>
            <div
                className="product"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <div onMouseOver={handleFlip} onMouseOut={handleRevert}>
                    <FlipImage />
                </div>
                <span className="productName">{pName}</span>
                {isActive ? <BuyMe /> : <ShowDescription />}
                <span className="priceText">€ {pPrice.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default ProductCard;
