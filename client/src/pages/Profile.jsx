import React, { Component } from "react";
import { withUser } from "../components/Auth/withUser";

import MiniRecipe from "../components/Forms/miniRecipe";


import apiHandler from "../api/apiHandler";


class Profile extends Component {

  constructor(props) {
    super(props);
    this.initData = this.initData.bind(this);
  }

  state = {
    favoriteRecipes: [],
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
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
      <section>
        <div className="text-center">
          <h2 className="mb-5">Hello {user.username}, In this section you can find all your favourite recipes !</h2>
          <div className="m-5">
            <div className="card d-flex flex-row flex-wrap justify-content-center ">
              {(
                this.state.favoriteRecipes.length === 0 &&
                <h5>You don't have any favourite recipes.</h5>
              )}
              {this.state.favoriteRecipes.length !== 0 && this.state.favoriteRecipes.map((Recp) => {
                return (
                  <div key={Recp._id}  className="m-2 border rounded">
                    <MiniRecipe recipe={Recp} initData={this.initData} />
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>
    )
  }
}


export default withUser(Profile);