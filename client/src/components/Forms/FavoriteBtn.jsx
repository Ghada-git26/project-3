import React, { Component } from "react"
import "../../styles/FavoriteBtn.css"
import apiHandler from '../../api/apiHandler'
import { withUser } from "../Auth/withUser";
import swal from 'sweetalert';

class FavoriteBtn extends Component {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.handleFavouriteClick = this.handleFavouriteClick.bind(this);
    }

    componentDidMount() {
        const recipe = this.props.recipe;
        this.setState({
            recipe: recipe
        });
    }

    state = {};
    callback = null;

    async handleFavouriteClick() {
        if(this.props.context.isLoggedIn){
            if (this.state.recipe.isUserFavourite) {
                await apiHandler.unsetFavRecipe(this.state.recipe._id);
                
            } else {
                await apiHandler.setFavRecipe(this.state.recipe._id);
            }
            this.state.recipe.isUserFavourite = !this.state.recipe.isUserFavourite;
            this.setState({
                recipe: {...this.state.recipe}
            });
            
            if (this.callback) {
                this.callback();
            }
        }else{
            swal("You're not logged In", "You need to log in to save favourites to your profile!", "warning");
        }
        
    }

    render() {
        if (this.state.recipe) {
            return (
                <div className="main-content" onClick={this.handleFavouriteClick} >
                    <div>
                        <input key={Math.random()} type="checkbox" className="favourite-checkBox" onChange={() => {}} defaultChecked={this.state.recipe.isUserFavourite} />
                        <label htmlFor={this.state.recipe._id} >
                            <svg className="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                                <g className="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                                    <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" className="heart" fill="#AAB8C2" />
                                    <circle className="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

                                    <g className="grp7" opacity="0" transform="translate(7 6)">
                                        <circle className="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                                        <circle className="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                                    </g>

                                    <g className="grp6" opacity="0" transform="translate(0 28)">
                                        <circle className="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                                        <circle className="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                                    </g>

                                    <g className="grp3" opacity="0" transform="translate(52 28)">
                                        <circle className="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                                        <circle className="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                                    </g>

                                    <g className="grp2" opacity="0" transform="translate(44 6)">
                                        <circle className="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                                        <circle className="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                                    </g>

                                    <g className="grp5" opacity="0" transform="translate(14 50)">
                                        <circle className="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                                        <circle className="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                                    </g>

                                    <g className="grp4" opacity="0" transform="translate(35 50)">
                                        <circle className="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                                        <circle className="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                                    </g>

                                    <g className="grp1" opacity="0" transform="translate(24)">
                                        <circle className="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                                        <circle className="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                                    </g>
                                </g>
                            </svg>
                        </label>

                    </div>
                </div>
            )
        }else{
            return "";
        }
    }

}

export default withUser(FavoriteBtn);