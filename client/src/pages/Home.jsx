import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav className="Navbar">
      <div>
      <Link exact to="/">
        <h3 className="logo">Gluten Free Up</h3>
      </Link>
        
      </div>

    </nav>
  );
};

export default Home;