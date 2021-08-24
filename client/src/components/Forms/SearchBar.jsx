import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler';
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.doSearch = this.doSearch.bind(this);
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
            <div>
                <input onChange={this.handleSearch}></input>

                <button onClick={this.doSearch}>Search</button>
            </div>
        );
    }
}

export default withRouter(SearchBar);