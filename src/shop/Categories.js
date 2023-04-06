import React from "react";
import data from "./data.js";

function Categories({ handleCatFilter, catFilter }) {
    const allCats = data.map((item) => item.cat);
    const uniqueCats = [
        "All",
        ...allCats.filter((item, i) => {
            return allCats.indexOf(item) === i;
        })
    ];

    return (
        <div>
            <h1>Categories</h1>
            <div className="categories" onClick={handleCatFilter}>
                {uniqueCats.map((item, index) => {
                    return item === catFilter ? (
                        <span className="category c-bold" key={index}>
              {item}
            </span>
                    ) : (
                        <span className="category" key={index}>
              {item}
            </span>
                    );
                })}
            </div>
        </div>
    );
}

export default Categories;
