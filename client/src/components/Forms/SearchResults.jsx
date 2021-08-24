import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import MiniRecipe from "./miniRecipe";

class Searchresults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            search: this.props.match.params.search
        }
    }

    componentDidMount() {
        if (this.state.search) {
            apiHandler.getSearchResults(this.state.search)
                .then((recipes) => {
                    this.setState({
                        recipes: recipes
                    });
                })
        }
    }

    render() {
        return (
            <div>
                <h2>Results</h2>
                <hr></hr>
                {this.state.recipes.map((Recp) => {
                    return (
                        <MiniRecipe key={Recp._id} recipe={Recp} />
                    )
                })}
            </div>
        );
    }
}

export default Searchresults;
