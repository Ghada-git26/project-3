import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
          this.doSearch();
        }
      }

    handleSearch(event) {
        const value = event.target.value;
        this.setState({
            searchValue: value
        })
    };

    doSearch() {
        this.props.history.push("/Recipes/Search/" + this.state.searchValue);
    }

    render() {
        return (

            <div className="input-group mb-3">
                <input onChange={this.handleSearch} onKeyDown={this.handleKeyDown}  type="text" className="form-control" placeholder="Search for a recipe" />
                <button onClick={this.doSearch} className="btn btn-outline-secondary" type="button">
                <i className="fa fa-search"></i>
                </button>
            </div>

        );
    }
}

export default withRouter(SearchBar);