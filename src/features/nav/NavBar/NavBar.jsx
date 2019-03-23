import React, { Component } from 'react';
import {NavLink,Link,withRouter } from 'react-router-dom';
import {Menu,Container,Button} from 'semantic-ui-react';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';


class NavBar extends Component {
  state = {
    authenticated:false
  }

  handleSignIn=()=>{
    this.setState({authenticated:true});
  };
  handleSignOut=()=>{
    this.setState({authenticated:false});
    this.props.history.push('/');
  };

  render() {
    const {authenticated} = this.state;
    return (
            <Menu inverted fixed="top">
              <Container>
                <Menu.Item as = {Link} to ='/' header>
                  <img src="/assets/logo.png" alt="logo" />
                 <i className="fas fa-futbol fa-spin"></i>
                  Event-Mingle
                </Menu.Item>
                <Menu.Item  as={NavLink} to='/events'  name="Events" />
                {authenticated&&
                <Menu.Item  as={NavLink} to='/people'  name="People" />}

                {authenticated&&
                <Menu.Item>
                  <Button as = {Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                </Menu.Item>}
                <Menu.Item>
                  <p>A Harikrishnan Kuppusamykrishnan Product</p>
                </Menu.Item>
                {authenticated ? <SignedInMenu signOut = {this.handleSignOut}/>: <SignedOutMenu signIn = {this.handleSignIn} />}
              </Container>
            </Menu>
    );
  }
}

export default withRouter(NavBar);