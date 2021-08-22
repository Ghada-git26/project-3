import React, { Component } from 'react'
import FavoriteBtn from "./FavoriteBtn";
import { Link } from "react-router-dom";

class MiniRecipe extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    state = {
        recipe: this.props.recipe
    }

    render() {
        return (
            <div className="OneRecipe" key={this.state.recipe._id}>
                <div className="RecipeName">
                    <Link to={`/Recipes/${this.state.recipe._id}`} >
                        {this.state.recipe.name}
                    </Link>
                    <FavoriteBtn key={this.state.recipe._id} recipe={this.state.recipe} clickCallback={this.props.initData} className="FavBtn" />
                </div>

                <div className="recipeInfo">
                    <img src={this.state.recipe.image} alt="" className="RecipeImg" />
                    <div className="RecipesDetails">
                        <p>Preparation time : {this.state.recipe.prep} min</p>
                        <p>Cooking time : {this.state.recipe.cook} min</p>
                        <p>Difficulty : <span className={("difficulty-" + this.state.recipe.difficulty)}></span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MiniRecipe;