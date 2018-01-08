import React, { Component } from 'react';
import firebase from '../firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import '../styles/FeedPage.css';
import {Button, Col, Grid, Row} from 'react-bootstrap';

class UserPage extends Component {


  componentDidMount() {
    this.props.fetchUsers();
  }

  onSignOut(){
   firebase.auth().signOut()
  }

  remove = (userData) => {
    this.props.removeUserdata(userData);
  }

  toggleAdmin = (userData) => {
    this.props.toggleAdmin(userData);
  }

  onClick(e) {
    e.preventDefault();
  }

 render(){

  const userList = this.props.userdata.map((userData) => {
   return(
    <div key={userData.key} className="userlistWrapper">
     <p className="users">{userData.email}</p>
     {userData.isAdmin ?
     <button onClick={(e) => this.toggleAdmin(userData)}>Toggle</button>
     :
     <button onClick={(e) => this.toggleAdmin(userData)}>Toggle</button>
     }
     <button onClick={() => this.remove(userData)}>Ta bort</button>
    </div>
   )
 });

  return(

   <section>
      <Grid>
        <Row>
          <h2>Välkommen {this.props.user && this.props.user.email}</h2>
          <Button bsStyle='danger' onClick={this.onSignOut}>
          Logga ut
          </Button>
        </Row>
      </Grid>

    {this.props.value}
    <div>
     {this.props.user.isAdmin === true ?
     <div>
      <h4>Lista över användare</h4>
      <ul>
       <li className="userlist">{userList}</li>
      </ul>
     </div>
     :
     null
    }
    </div>
   </section>
  )
 }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

const mapStateToProps = state =>{
 return {
  user: state.user,
  userdata: state.userdata
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
