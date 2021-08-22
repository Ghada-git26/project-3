import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredients = this.handleAddIngredients.bind(this);
    }

    state = {
        name: "",
        image: "",
        prep: 0,
        cook: 0,
        category: "",
        difficulty: 0,
        Nutrition: null,
        ingredients: [],
    }

    componentDidMount() {
    const id = this.props.match.params.id;

    apiHandler.getRecipe(id)
      .then((apiResponse) => {
        console.log(apiResponse);
        const data = apiResponse;

        this.setState({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
      });



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

    // handleIngredientsChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);
    //   };

    handleAddIngredients() {
        this.setState({ ingredients: this.state.ingredients + 1 });
    }

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
        apiHandler.updateRecipe(this.props.match.params.id);
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
                            value={this.state.name}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="category">
                            Category
                        </label>

                        <select id="category" value={this.state.name} onChange={this.handleChange}>
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
                        <input className="input" id="prep" type="number" onChange={this.handleChange} value={this.state.prep} />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="cook">
                            Cooking time
                        </label>
                        <input className="input" id="cook" type="number" onChange={this.handleChange} value={this.state.cook} />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="difficulty">
                           difficulty
                        </label>

                        <select id="difficulty" value={this.state.difficulty} onChange={this.handleChange}>
                            <option value="" disabled>
                                Select a difficulty
                            </option>
                            <option value="1">Easy</option>
                            <option value="2">More Effort</option>
                            <option value="3">Challenging</option>
                        </select>
                    </div>



                    <div className="form-group">
                        <label className="label" htmlFor="ingredients">
                            Ingredients
                        </label>
                        <input
                            id="ingredients"
                            className="text-area"
                            placeholder="Add Recipe's Ingredients"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                        ></input>
                        <button type="button" onClick={this.handleAddIngredients}>
                            Add ingredients
                        </button>
                    </div>


                    <button type="button" className="btn-submit" onClick={this.handleSubmit}>Edit Recipe</button>
                </form>
            </div>
        );
    }
}


export default EditRecipe;
