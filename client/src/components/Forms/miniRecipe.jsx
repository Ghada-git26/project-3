import React, { Component } from 'react'
import FavoriteBtn from "./FavoriteBtn";
import { Link } from "react-router-dom";
import "../../styles/MiniRecipe.css";

class MiniRecipe extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        recipe: this.props.recipe,
        initData: this.props.initData
    }

    render() {
        return (
            <div className="OneRecipe" key={this.state.recipe._id}>
                <div className="RecipeName">
                    <Link to={`/Recipes/Details/${this.state.recipe._id}`}>
                        {this.state.recipe.name}
                    </Link>
                    <FavoriteBtn key={this.state.recipe._id} recipe={this.state.recipe} callback={this.state.initData} className="FavBtn" />
                </div>

                <div className="recipeInfo">
                    <div style={{ backgroundImage: `url(${this.state.recipe.image})` }} className="MiniRecipe-Img" > </div>
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