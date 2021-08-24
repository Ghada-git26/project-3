import React, { Component } from "react";
import apiHandler from '../../api/apiHandler'
import MiniRecipe from "./miniRecipe";

class RecipeDispaly extends Component {
    constructor(props) {
        super(props);
        this.initData = this.initData.bind(this);
    }

    state = {
        Recipes: {
            mainDishes: [],
            desserts: [],
            beverages: []
        },
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
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

    render() {
        return (
            <section className="categories">

                <div id="mainDishes" className="recipe-container">
                    <h2 className="CategorieName">Main Dishes</h2>
                    <hr></hr>
                    {this.state.Recipes.mainDishes.map((Recp) => {
                        return (
                            <MiniRecipe key={Recp._id} recipe={Recp} initData={this.initData} />
                        )
                    })}
                </div>
                <div id="desserts" className="recipe-container">
                    <h2 className="CategorieName">Desserts</h2>
                    <hr></hr>
                    {this.state.Recipes.desserts.map((Recp) => {
                        return (
                            <MiniRecipe key={Recp._id} recipe={Recp} initData={this.initData} />
                        )
                    })}
                </div>
                <div id="beverages" className="recipe-container">
                    <h2 className="CategorieName">Beverages</h2>
                    <hr></hr>
                    {this.state.Recipes.beverages.map((Recp) => {
                        return (
                            <MiniRecipe key={Recp._id} recipe={Recp} initData={this.initData} />
                        )
                    })}
                </div>
            </section>
        )
    }
}


export default RecipeDispaly






