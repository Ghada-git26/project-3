import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import apiHandler from '../../api/apiHandler'
import Hat from "../../assets/chefHat.png"

class RecipeDispaly extends Component {
    state = {
        Recipes: {
            mainDishes: [],
            desserts: [],
            beverages: []
        },
    }

    componentDidMount() {
        apiHandler.getRecipes()
            .then((response) => {
                this.setState({
                    Recipes: response,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getRecipeFromObj(Recp) {
        return (
            <div className="OneRecipe">
                
                <Link to={`/Recipes/${Recp._id}`} className="RecipeName">
                    {Recp.name}
                </Link>
                <div className="recipeInfo">
                    <img src={Recp.image} alt="" className="RecipeImg" />
                    <div className="RecipesDetails">
                        <p>Preparation time : {Recp.prep} min</p>
                        <p>Cooking time : {Recp.cook} min</p>
                        <p>Difficulty : {Recp.difficulty}</p>
                    </div>
                </div>
            </div>);
    }

    render() {
        return (
            <section>
                <div className="page-logo">
                    <img src={Hat} alt="" className="Hat" />
                    <h1 className="Recipes-Title">Gluten Free Recipes</h1>
                </div>
                <div className="categories">
                    <div id="mainDishes" className="container">
                        <h2 className="CategorieName">Main Dishes</h2>
                        <hr></hr>
                        {this.state.Recipes.mainDishes.map((Recp) => {
                            return (
                                this.getRecipeFromObj(Recp)
                            )
                        })}
                    </div>
                    <div id="desserts" className="container">
                        <h2 className="CategorieName">Desserts</h2>
                        <hr></hr>
                        {this.state.Recipes.desserts.map((Recp) => {
                            return (
                                this.getRecipeFromObj(Recp)
                            )
                        })}
                    </div>
                    <div id="beverages" className="container">
                        <h2 className="CategorieName">Beverages</h2>
                        <hr></hr>
                        {this.state.Recipes.beverages.map((Recp) => {
                            return (
                                this.getRecipeFromObj(Recp)
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}


export default RecipeDispaly






