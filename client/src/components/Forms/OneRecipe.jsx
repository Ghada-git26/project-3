import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import apiHandler from '../../api/apiHandler'
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
                            <div className="one-recipe-full rounded-div mb-2">
                                <div className="flex">
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
                        {(
                            this.props.context.isAdmin &&
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-danger m-2" onClick={this.removeRecipe}>Delete Recipe</button>
                                <NavLink className="btn btn-outline-secondary m-2" to={`/Recipes/update/${this.props.match.params.id}`}>Edit Recipes</NavLink>
                            </div>
                        )}

                        <div className="mt-2 rounded-div mb-5 rating-box">
                            <div>
                                {(
                                    this.state.Recipe.ratings.map((r) => {
                                        return (
                                            <div className="border rounded m-1 p-2">
                                                <div >
                                                    <p>
                                                        <small>
                                                            {r.user.email}  : {r.rating} /5
                                                        </small>
                                                    </p>
                                                    <div>
                                                        {r.comment}

                                                    </div>
                                                </div>

                                                {(
                                                    this.props.context.isAdmin &&
                                                    <div className="rating-btns">
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.removeRating(r._id)}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                            {(
                                !this.props.context.isLoggedIn &&
                                <p className="mt-5">Log in in order to rate recipes !</p>
                            )}
                            {(
                                this.props.context.isLoggedIn && this.state.Recipe.canComment &&
                                <RatingForm recipeId={this.state.Recipe._id} submitCallBack={this.initData} />
                            )}
                        </div>

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