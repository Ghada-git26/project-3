import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import apiHandler from '../../api/apiHandler'
import Hat from "../../assets/chefHat.png"
import "../../styles/OneRecipe.css"
import { withUser } from "../Auth/withUser";
import FavoriteBtn from "./FavoriteBtn";
import RatingForm from "./RatingForm";

class OneRecipe extends Component {
    constructor(props) {
        super(props)
        this.removeRecipe = this.removeRecipe.bind(this);
        this.removeRating = this.removeRating.bind(this)
        this.initData = this.initData.bind(this)
    }

    state = {
        Recipe: null,
        initData: this.props.initData
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        apiHandler.getRecipe(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    Recipe: response,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async removeRecipe() {
        await apiHandler.removeRecipe(this.props.match.params.id);
        this.props.history.push("/Recipes");
    }

    async removeRating(id) {
        await apiHandler.removeRating(id);
        this.initData();
    }


    render() {
        if (this.state.Recipe) {
            return (
                <div>
                    <div className="AllRecipeDetails">
                        <div>
                            <div className="page-logo" >
                                <img src={Hat} alt="" className="Hat" />
                                <h1 className="Recipes-Title">Gluten Free Recipes</h1>
                            </div>
                            <div className="one-recipe-full">
                                <div className="flex felx-row">
                                    <div className="recipe-image-left">
                                        <div style={{ backgroundImage: `url(${this.state.Recipe.image})` }} className="OneRecipe-Img" > </div>
                                    </div>
                                    <div className="recipe-details-full">
                                        <div className="one-recipe-title">
                                            <h2>{this.state.Recipe.name}</h2>
                                            <FavoriteBtn recipe={this.state.Recipe} className="FavBtn" />
                                        </div>
                                        <div className="mainInfo">
                                            <p>{this.state.Recipe.prep}min of Prepration</p>
                                            <p>{this.state.Recipe.cook} min of cooking</p>
                                            <p>Difficulty : <span className={("difficulty-" + this.state.Recipe.difficulty)}></span></p>
                                        </div>
                                        <table className="nutritious-values">
                                            <tbody>
                                                <tr>
                                                    <th colSpan="6">Nutritious Value</th>
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
                                                    <td>{this.state.Recipe.nutrition.kcal}kcal</td>
                                                    <td>{this.state.Recipe.nutrition.carbs}g</td>
                                                    <td>{this.state.Recipe.nutrition.fiber}g</td>
                                                    <td>{this.state.Recipe.nutrition.protein}g</td>
                                                    <td>{this.state.Recipe.nutrition.sugars}g</td>
                                                    <td>{this.state.Recipe.nutrition.salts}g</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            <p>
                                                <strong>
                                                    Ingredients
                                                </strong>
                                            </p>
                                            <ul className="ingredient-list">
                                                {this.state.Recipe.ingredients.map(ingredient => {
                                                    return (
                                                        <li key={ingredient}>{ingredient}</li>

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            {(
                                this.state.Recipe.ratings.map((r) => {
                                    return (
                                        <div>
                                            <p key={this.comment}>{r.comment} - {r.rating} </p>

                                            {(
                                                this.props.context.isAdmin &&
                                                <button type="button" className="btn-submit" onClick={() => this.removeRating(r._id)}>Delete</button>
                                            )}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                        {(
                            !this.props.context.isLoggedIn &&
                            <p>Log in in order to rate recipes !</p>
                        )}
                        {(
                            this.props.context.isLoggedIn && this.state.Recipe.canComment &&
                            <RatingForm recipeId={this.state.Recipe._id} submitCallBack={this.initData}/>
                        )}

                        {(
                            this.props.context.isAdmin &&
                            <div>
                                <button type="button" className="btn-remove" onClick={this.removeRecipe}>Delete Recipe</button>
                                <NavLink to={`/Recipes/update/${this.props.match.params.id}`}>Edit Recipes</NavLink>
                            </div>
                        )}

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Loading ...
                </div>
            )
        }

    }

}


export default withUser(OneRecipe)