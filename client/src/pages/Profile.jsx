import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

import MiniRecipe from "../components/Forms/miniRecipe";


import apiHandler from "../api/apiHandler";


class Profile extends Component {

  constructor(props){
    super(props);
    this.initData = this.initData.bind(this);
  }

  state = {
    favoriteRecipes: [],
  }

  componentDidMount() {
   this.initData(); 
  }

  initData(){
    apiHandler.getFavRecipe(this.props.match.params.id)
    .then((apiResponse) => {
      const data = apiResponse;
      this.setState({
        favoriteRecipes: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { context } = this.props;
    const { user } = context;
    return (

      <section className="Profile">
        <div className="user-image round-image">
          <h1>{user.username}</h1>
        </div>

        <div>

          <section>
            <div className="categories">
              <div className="container">
                {this.state.favoriteRecipes.map((Recp) => {
                  return (
                    <MiniRecipe key={Recp._id} recipe={Recp} initData={this.initData} />
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    )
  }
}


export default withUser(Profile);