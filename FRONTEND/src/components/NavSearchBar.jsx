import React, { useState } from "react";

const NavSearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <img src="" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div></div>
    </div>
  );
};

export default NavSearchBar;
