import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import React, { Component, useContext } from 'react'
import fire from '../config/fire'
import Home from './Home'
import Login from './Login'
import UserContext from './UserContext'
import Background from './BackgroundCircles'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    return (
      <div >
        <UserContext.Provider value={this.state.user}>
          {this.state.user ? <Home /> : <Login />}
          {/* {console.log(this.state.user)} */}
        </UserContext.Provider>
      </div>
    )
  }

  
  // render() {
  //   return (
  //     <Background>
  //       <UserContext.Provider value={this.state.user}>
  //         {this.state.user ? <Home /> : <Login />}
  //         {/* {console.log(this.state.user)} */}
  //       </UserContext.Provider>
  //     </Background>
  //   )
  // }
}