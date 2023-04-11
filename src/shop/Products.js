import React from "react";
import ProductCard from "./ProductCard";
import data from "./data";

function Products({ search, catFilter, pricePoint, toCart }) {
    let prodToShow = data;

    if (search !== "") {
        prodToShow = data.filter(
            (item) => item.name.toLowerCase().indexOf(search) !== -1
        );
    }
    if (catFilter !== "All") {
        prodToShow = data.filter((item) => item.cat === catFilter);
    }
    const prodToShowByPrice = prodToShow.filter(
        (item) => item.price <= pricePoint
    );

    return (
        <div className="products">
            {prodToShowByPrice.map((entry, index) => (
                <ProductCard
                    key={index}
                    id={index}
                    src={entry.img}
                    src2={entry.img2}
                    pName={entry.name}
                    pText={entry.text}
                    pPrice={entry.price}
                    toCart={toCart}
                />
            ))}
        </div>
    );
}

export default Products;
