import React from "react";
import { Link } from "react-router-dom";

/**
 * Navigation Function
 */
function Navigation() {
  return (
    <nav id="menu-items">
      <Link className="menu-item" to="/">
        Home
      </Link>
      <Link className="menu-item" to="/add-exercise">
        Add
      </Link>
    </nav>
  );
}

export default Navigation;
