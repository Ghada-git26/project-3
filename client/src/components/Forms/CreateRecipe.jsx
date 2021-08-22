import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class CreateRecipe extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleNutritiousChange = this.handleNutritiousChange.bind(this);
    }

    state = {
        name: "",
        image: "",
        prep: 0,
        cook: 0,
        category: "",
        difficulty: 0,
        nutrition: {},
        ingredients: [],
    }

    handleChange(event) {
        const key = event.target.id;
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.type === "file"
                    ? event.target.files[0]
                    : event.target.value;

        this.setState({
            [key]: value,
        });
    }

    handleNutritiousChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        let nutrition = this.state.nutrition;
        if (!nutrition) {
            nutrition = {};
        }
        nutrition[key] = value;
        this.setState({
            nutrition: nutrition,
        });
    }

    handleIngredientsChange(e, index) {
        this.state.ingredients[index] = e.target.value;
        this.setState({
            ingredients: [...this.state.ingredients]
        });
    };

    handleRemoveClick(index) {
        const list = [...this.state.ingredients];
        list.splice(index, 1);
        this.setState({
            ingredients: list,
        });
    };

    handleAddClick = () => {
        this.setState({
            ingredients: [...this.state.ingredients, ""],
        });
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const recipe = {
            name: this.state.name,
            image: this.state.image,
            category: this.state.category,
            difficulty: this.state.difficulty,
            prep: this.state.prep,
            cook: this.state.cook,
            nutrition: this.state.nutrition,
            ingredients: this.state.ingredients,
        };
        apiHandler.postRecipe(recipe);
    }

    render() {
        return (
            <div className="">
                <form className="form">
                    <h2 className="title">Add Recipe</h2>

                    <div className="form-group">
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Category
                        </label>

                        <select id="category" defaultValue="" onChange={this.handleChange} required>
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Main dish">Main Dish</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="prep">
                            Preparation time
                        </label>
                        <input className="input" id="prep" type="number" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="cook">
                            Cooking time
                        </label>
                        <input className="input" id="cook" type="number" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Difficulty
                        </label>


                        <select id="difficulty" defaultValue="" onChange={this.handleChange} required>
                            <option value="" disabled>
                                Select a difficulty
                            </option>
                            <option value="1">Easy</option>
                            <option value="2">More Effort</option>
                            <option value="3">Challenging</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="cook">
                            Nutritious Values
                        </label>
                        <input className="input" id="Kcal" type="number" onChange={this.handleNutritiousChange} placeholder="Kcal" />
                        <input className="input" id="carbs" type="number" onChange={this.handleNutritiousChange} placeholder="carbs" />
                        <input className="input" id="fiber" type="number" onChange={this.handleNutritiousChange} placeholder="fiber" />
                        <input className="input" id="protein" type="number" onChange={this.handleNutritiousChange} placeholder="protein" />
                        <input className="input" id="sugars" type="number" onChange={this.handleNutritiousChange} placeholder="sugars" />
                        <input className="input" id="salts" type="number" onChange={this.handleNutritiousChange} placeholder="salts" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="ingredients">
                            Ingredients
                        </label>
                        {
                            this.state.ingredients.map((ing, i) => {
                                return (<div key={i}>
                                    <input
                                        id="ingredients"
                                        className="text-area"
                                        placeholder="Add Recipe's Ingredients"
                                        onChange={(e) => this.handleIngredientsChange(e, i)}
                                        value={ing}
                                    ></input>
                                    <div className="btn-box">
                                        <button
                                            type="button"
                                            className="mr10"
                                            onClick={() => this.handleRemoveClick(i)}>Remove</button>
                                    </div>
                                </div>)
                            })
                        }
                        <button type="button" onClick={this.handleAddClick}>Add</button>
                    </div>
                    <button type="button" className="btn-submit" onClick={this.handleSubmit}>Add Recipe</button>
                </form>
            </div>
        );
    }
}


export default CreateRecipe;
