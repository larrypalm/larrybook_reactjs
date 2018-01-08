import React, { Component } from 'react';
import UserPage from './UserPage'
import firebase from '../firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/action';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

import '../styles/home.css';
import '../styles/FeedPage.css';

class FeedPage extends Component {
 state = {
   value: "",
   movies: [],
   toggleLike: true,
 }

 componentDidMount(){
  this.props.fetchComments();

  fetch(`https://fend-api.herokuapp.com/movies?_limit=1`)
   .then(response => response.json())
   .then(data => {
    this.setState({movies: data})
   })
  }

  onSignOut(){
    firebase.auth().signOut()
  }

 add = (e) => {
    e.preventDefault();
    this.props.addComment({
      text: this.state.value,
      userID: this.props.user.email
    })
    this.setState({value: ''});
 }

 remove = (comment) => {
   this.props.removeComment(comment);
 }

 onChange = e => this.setState({ [e.target.name]: e.target.value})

 render() {
  const movieList = this.state.movies.map((movie) => {
   return (
    <div>
     <ul className="movie">
      <li key={movie.id}>
       <img height="300px" alt="movie cover" src="https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SY500_CR0,0,336,500_AL_.jpg"/>
       <div className="movieInfo">
        <div className="data">
          <p><strong>Titel:</strong> {movie.title}</p>
        </div>
        <div className="data">
          <p><strong>Skriven av:</strong> {movie.imdbRating}</p>
        </div>
       </div>
      </li>
     </ul>
    </div>
   )
  })


  return(
   <section className="">

    <section className="home">
      <section className="adminsection">
        <UserPage/>
      </section>
     <section className="displayMovie">
      <h1>Dagens film</h1>
      {movieList[0]}
     </section>
     <section className='display-comment'>

        {this.props.comments.map(comment =>
          <div key={comment.key} className="commentsList">
           <div className="comment-txt">
             <p><strong>{comment.userID}:</strong> {comment.text}</p>
            </div>
            <div className="comment-btnfield">
             {comment.userID === this.props.user.email || this.props.user.isAdmin ? //A ternary that checks if the user that posted the comments is the same as the one thats logged in, if so the user can remove his item.

             <Button bsStyle='danger' onClick={() => this.remove(comment)}>Ta bort</Button> : null}

            </div>
           </div>
         )}

        <div className="comment-field">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
             <FormControl
               type="text"
               name="value"
               onChange={this.onChange}
               value={this.state.value}
             >
             </FormControl>
            </FormGroup>
          </form>
          <Button bsStyle='success' onClick={this.add}>Kommentera</Button>
        </div>

     </section>
    </section>

   </section>
  )
 }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch)
}

const mapStateToProps = state =>{
 return {
   comments: state.comments,
   user: state.user,
   error: state.error
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
