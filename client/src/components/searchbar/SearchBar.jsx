import "./searchBar.scss";
import { useState } from "react";
const types = ["Buy", "Rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={()=>switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
            
          </button>
         ))} 
      </div>
      <form action="">
        <input type="text" name="location" placeholder="City Location" />

        <input
          type="text"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          max={100000000}
        />
        <input
          type="text"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          max={100000000}
        />
        <button >
          <img src="./search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
