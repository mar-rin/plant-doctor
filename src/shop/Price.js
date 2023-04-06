import React from "react";
import data from "./data";

let priceList = [];
let maxPrice;
let minPrice;

function Price({ handlePrice, catFilter, pricePoint }) {
    if (catFilter === "All") {
        priceList = data.map((item) => item.price);
    } else {
        const prodToShow = data.filter((item) => item.cat === catFilter);
        priceList = prodToShow.map((item) => item.price);
    }

    maxPrice = Math.max(...priceList);
    minPrice = Math.min(...priceList);

    return (
        <div>
            <h1>Maximum Price</h1>
            <div className="prices">
                <input
                    onChange={handlePrice}
                    type="range"
                    className="priceRange"
                    min={minPrice}
                    max={maxPrice}
                    value={pricePoint}
                />
                <span className="priceValue">€{maxPrice}</span>
            </div>
        </div>
    );
}

export default Price;
