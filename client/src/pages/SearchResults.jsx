import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import MiniRecipe from "../components/miniRecipe";

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
            <div className="text-center ">
                <h2 className="mb-5">Search results for {this.state.search}</h2>
                <hr></hr>
                <div className="m-5 shadow">
                    <div className="card d-flex flex-row flex-wrap justify-content-center p-2">
                        {this.state.recipes.map((Recp) => {
                            return (
                                <div key={Recp._id} className="m-1 border rounded">

                                    <MiniRecipe recipe={Recp} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Searchresults;
