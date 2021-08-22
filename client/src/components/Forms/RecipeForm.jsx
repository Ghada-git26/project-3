import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class RecipeForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleNutritiousChange = this.handleNutritiousChange.bind(this);
    }


    componentDidMount() {
        if (this.props.match.params.id) {
            apiHandler.getRecipe(this.props.match.params.id)
                .then((recipe) => {
                    let newState = {
                        name: recipe.name,
                        image: recipe.image,
                        prep: recipe.prep,
                        cook: recipe.cook,
                        category: recipe.category,
                        difficulty: recipe.difficulty,
                        nutrition: recipe.nutrition,
                        ingredients: recipe.ingredients,
                        title: "Edit " + recipe.name
                    }
                    this.setState(newState);
                })
        }
    }

    getTitle() {
        return this.title;
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
        title: "Create new Recipe"
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


    handleSubmit = async (event) => {
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
        const formData = apiHandler.jsonToFormData(recipe);

        if (this.props.match.params.id) {
            recipe._id = this.props.match.params.id;
            await apiHandler.updateRecipe(recipe._id, formData);

        } else {
            await apiHandler.postRecipe(formData);
        }
        this.props.history.push('/Recipes');
    }

    render() {
        return (
            <div className="">
                <form className="form">
                    <h2 className="title">{this.state.title}</h2>

                    <div className="form-group">
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            className="input"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="custom-upload label" htmlFor="image">
                            Upload image
                        </label>
                        <input className="input" id="image" type="file" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Category
                        </label>

                        <select id="category" value={this.state.category} onChange={this.handleChange} required>
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
                        <input value={this.state.prep} className="input" id="prep" type="number" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="cook">
                            Cooking time
                        </label>
                        <input className="input" value={this.state.cook} id="cook" type="number" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Difficulty
                        </label>

                        <select id="difficulty" value={this.state.difficulty} onChange={this.handleChange} required>
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
                        <input className="input" value={this.state.nutrition.kcal} id="kcal" type="number" onChange={this.handleNutritiousChange} placeholder="Kcal" />
                        <input className="input" value={this.state.nutrition.carbs} id="carbs" type="number" onChange={this.handleNutritiousChange} placeholder="carbs" />
                        <input className="input" value={this.state.nutrition.fiber} id="fiber" type="number" onChange={this.handleNutritiousChange} placeholder="fiber" />
                        <input className="input" value={this.state.nutrition.protein} id="protein" type="number" onChange={this.handleNutritiousChange} placeholder="protein" />
                        <input className="input" value={this.state.nutrition.sugars} id="sugars" type="number" onChange={this.handleNutritiousChange} placeholder="sugars" />
                        <input className="input" value={this.state.nutrition.salts} id="salts" type="number" onChange={this.handleNutritiousChange} placeholder="salts" />
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
                    <button type="button" className="btn-submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}


export default RecipeForm;
