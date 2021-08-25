import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class RatingForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.submitCallBack = this.props.submitCallBack;
    }
    state = {
        recipeId: this.props.recipeId,
        rating: 3,
        comment: "",
    }

    submitCallBack = null;

    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;

        this.setState({
            [key]: value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const rating = {
            rating: this.state.rating,
            comment: this.state.comment,
        };
        await apiHandler.postRating(this.state.recipeId, rating);
        if (this.submitCallBack) {
            this.submitCallBack();
        }
    }


    render() {
        return (

            <div className="border rounded mt-3 p-2">
                <p>Rate this Recipe !</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="rating">Rate</label>
                        <select className="form-control" name="rating" value={this.state.rating} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <textarea className="form-control" name="comment" value={this.state.comment} onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="mt-2 rating-btns">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        );
    };

}

export default RatingForm