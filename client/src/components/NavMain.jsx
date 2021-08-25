import React, { useState } from "react";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import SearchBar from "./Forms/SearchBar";
import "../styles/NavMain.css";
import Hat from "../assets/chefHat.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { Link } from "react-router-dom";

const NavMain = (props) => {
  const { context } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
            <div className="app-logo">
              <img src={Hat} alt="" className="hat" />
              <h1 className="app-title">Gluten Free Recipes</h1>
            </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <SearchBar></SearchBar>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={`/Recipes`} >All Recipes</NavLink >
            </NavItem>
            {context.isLoggedIn && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/profile" >
                    {context.user && context.user.email}
                  </NavLink>
                </NavItem>
                {(
                  context.isAdmin &&
                  <NavItem>
                    <NavLink tag={Link} to={`/Recipes/create`} >Add more Recipes</NavLink >
                  </NavItem>
                )}
                <NavItem>
                  <p className="nav-NavItemnk nav-link" onClick={handleLogout}>Logout</p>
                </NavItem>
              </React.Fragment>
            )}
            {!context.isLoggedIn && (
              <React.Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/signin" >Log in</NavLink >
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/signup" >Create account</NavLink>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withUser(NavMain);
