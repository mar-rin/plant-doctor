import React from "react";

function Search({ handleSearch }) {
    return (
        <div>
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search..."
                className="search"
            />
        </div>
    );
}
export default Search;
