import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import './App.css';

function App(props) {
  console.log('REACT_APP_STAGE',process.env.REACT_APP_STAGE);
  /**
   * - Initialize the variable isAuthenticated to false
   * - Calling the userHasAuthenticated to update isAuthenticated variable
   */
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(true); // true because as we first load our app, it’ll start by checking the current authentication state.

  /**
   * - The useEffect hook takes a function and an array of variables. 
   *    - The function will be called every time the component is rendered. 
   *    - And the array of variables tell React to only re-run our function if the passed in array of variables have changed.
   * 1. If we don’t pass in an array of variables, our hook gets executed everytime our component is rendered.
   * 2. If we pass in some variables, on every render React will first check if those variables have changed, before running our function.
   * 3. If we pass in an empty list of variables, then it’ll only run our function on the FIRST render. 
   */
  useEffect(() => {
    onLoad();
  }, []); // check the user’s authentication state when our app first loads - with empty list of variables []
  
  async function onLoad() {
    console.log('onload');
    try {
      await Auth.currentSession();
      // const currSession = await Auth.currentSession();
      // console.log('currSession',currSession);
      // props.history.push('/');
      userHasAuthenticated(true);
    }
    catch(e) {
      console.log(e); // No current user | User does not exist (in case user was removed from Cognito User Pool but still set in Local Storage)
      if (e != 'No current user' && e != 'User does not exist') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout(){
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/login');
  }

  return (
    // render when the state is ready
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            {/**
              - The <> or Fragment component can be thought of as a placeholder component.
              - By using the Fragment component (<>) it tells React that the two links are inside this component but we don’t want to render any extra HTML.
            */}
            { isAuthenticated 
              ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              )
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App); // to get access to the history object's properties and the closest <Route>'s match
