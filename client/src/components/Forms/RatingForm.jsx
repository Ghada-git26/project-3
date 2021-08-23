import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";

class RatingForm extends Component {
    
constructor(props){
super(props);
this.handleChange = this.handleChange.bind(this)
}
    state = {
        recipeId: this.props.recipeId,
        rating: 3,
        comment: "",
    }

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
        apiHandler.postRating(this.state.recipeId, rating);
    }

    render() {
        return (

            <div>
                <form>
                    <label for="rating">Rate</label>
                    <select name="rating" value={this.state.rating} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label for="comment">Comment</label>
                    <textarea name="comment" value={this.state.comment} onChange={this.handleChange} required></textarea>
                    <div class="UDlink">
                        <button type="button" className="btn-submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        );
    };

}

export default RatingForm