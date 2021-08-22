import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import RecipeDispaly from "./components/Forms/RecipeDispaly";
import "./styles/AllRecipes.css"
import OneRecipe from "./components/Forms/OneRecipe";
import CreateRecipe from "./components/Forms/CreateRecipe";
import EditRecipe from "./components/Forms/EditRecipe";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/Recipes" component={RecipeDispaly} />
        <Route exact path="/Recipes/create" component={CreateRecipe} />
        <Route exact path="/Recipes/update/:id" component={EditRecipe} />
        <Route exact path="/Recipes/:id" component={OneRecipe} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
