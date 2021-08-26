import React from "react";
import "../styles/Home.css"
import home from "../assets/home.png"
import SearchBar from "../components/Forms/SearchBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="card border-dark shadow mb-3">
        <div className="card-body">
          <div className="mb-2">
            Something on your mind, I bet we have a recipe for you. Have a look!
          </div>
          <SearchBar className="home-search"></SearchBar>
        </div>
      </div>
      <div className="card border-dark shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div style={{ backgroundImage: `url(${home})` }} className="home-img shadow" > </div>
            </div>
            <div className="col-md-6 home-right">

              <div className=" m-5">
                <h1>Gluten Free Recipes</h1>
                <h4>For coeliacs by a coeliac</h4>
              </div>
              <div className="m-5">
                <p>Life Transforming, plant-rich super meals.</p>
              </div>
              <div>
                <div className="m-5">
                  <Link to="/Recipes" className="btn btn-lg btn-dark" >Explore Recipes</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;