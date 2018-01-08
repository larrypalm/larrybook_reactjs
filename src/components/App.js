import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import firebase from '../firebase';
import {Button} from 'react-bootstrap';

import Header from './Header';
import Home from './Home';
import FeedPage from './FeedPage';

class App extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  }

  componentDidMount() {
    this.props.userChanged();
  }

signIn(newStatus){
  if(this.state.email === ""){
    this.setState({error: 'Var vänlig och skriv in en e-post adress!'})
  }
  else{
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    this.setState({error: ''})
  }
};

  userHandler(e){
    this.setState({email: e.target.value});
  }

  passwordHandler(e){
    this.setState({password: e.target.value});
  }

onRegister(e){
  e.preventDefault();
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(user => {
    const newUser = {
      email: user.email,
      isAdmin: false
    }
    firebase.database().ref(`users/${user.uid}`).set(newUser);
  });
}

  render() {
    return (
      <div>
        <Header />
        {this.props.user ?
        <FeedPage
          userInfo={this.state.user && this.state.user.email }
        />
        :
        <Home
           register={this.onRegister.bind(this)}
           signIn={this.signIn.bind(this)}
           userHandler={this.userHandler.bind(this)}
           passwordHandler={this.passwordHandler.bind(this)}
           error={this.state.error}
        />
        }

      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state){
 return {
   user: state.user
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
