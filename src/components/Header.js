import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
const Header = () => {
  const [page, activepage] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/Home") {
      activepage("Home");
    } else if (location.pathname === "/add") {
      activepage("AddData");
    }
    
  }, [location]);

  return (
    <div className="main">
      <div>
        <Link to="/">
          <p
            className={`${page === "Home" ? "active" : ""}`}
            onClick={() => activepage("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${page === "AddData" ? "active" : ""}`}
            onClick={() => activepage("AddData")}
          >
            Add Data
          </p>
        </Link>
      </div>
    </div>
  );
};
export default Header;
