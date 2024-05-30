import React from "react";

const Navbar = () => {
  return (
    <div className="flex py-3 flex-wrap justify-around">
      <h1 className="text-lg font-semibold">Todo App</h1>
      <ul className="flex gap-[40px] text-m">
        <li>Home</li>
        <li>Products</li>
        <li>About </li>
        <li>Contract</li>
      </ul>
    </div>
  );
};

export default Navbar;
