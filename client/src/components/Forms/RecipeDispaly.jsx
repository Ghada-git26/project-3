import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import apiHandler from '../../api/apiHandler'

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
        return (<div>
            <Link to={`/Recipes/${Recp._id}`}>
                {Recp.name}
            </Link>
            <img src={Recp.image} alt="" />
            <p>Preparation time : {Recp.prep}</p>
            <p>Cooking time : {Recp.cook}</p>
            <p>Category : {Recp.category}</p>
            <p>Description : {Recp.description}</p>
            <div>
                <table>
                    <tr>
                        <th colspan="6">Nutritious Value</th>
                    </tr>
                    <tr>
                        <th>Kcal</th>
                        <th>carbs</th>
                        <th>fiber</th>
                        <th>protein</th>
                        <th>sugars</th>
                        <th>salts</th>
                    </tr>
                    <tr>
                        <td>{Recp.nutrition.kcal}kcal</td>
                        <td>{Recp.nutrition.carbs}g</td>
                        <td>{Recp.nutrition.fiber}g</td>
                        <td>{Recp.nutrition.protein}g</td>
                        <td>{Recp.nutrition.sugars}g</td>
                        <td>{Recp.nutrition.salts}g</td>
                    </tr>
                </table>
            </div>
        </div>);
    }

    render() {
        return (
            <div>

                <div id="mainDishes">
                    {this.state.Recipes.mainDishes.map((Recp) => {
                        return (
                            this.getRecipeFromObj(Recp)
                        )
                    })}
                </div>
                <div id="desserts">
                    {this.state.Recipes.desserts.map((Recp) => {
                        return (
                            this.getRecipeFromObj(Recp)
                        )
                    })}
                </div>
                <div id="beverages">
                    {this.state.Recipes.beverages.map((Recp) => {
                        return (
                            this.getRecipeFromObj(Recp)
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default RecipeDispaly






