
import firebase from '../firebase';

export function addComment(comment){
  return function(dispatch){
    firebase.database().ref(`comments`).push(comment)
    .catch(error => {
      dispatch({type: "FETCH_ERROR", error: error.message});
    })
  }
}

export function removeComment(comment){
  return function (dispatch){
    firebase.database().ref(`comments/${comment.key}`).remove()
  }
}

export function fetchComments(){
  return function(dispatch){
    return firebase.database().ref(`comments`).on('value', comments => {
        let tempList = [];
        comments.forEach(child => {
          tempList.push({...child.val(), key: child.key});
        })
        dispatch({ type: "FETCH_ALL_COMMENTS", comments: tempList });
    })
  }
}

export function userChanged(){
 return function(dispatch){
  return firebase.auth().onAuthStateChanged(user => {
   if(user){
    firebase.database().ref(`users/${user.uid}`).once('value')
    .then(user => {
     dispatch({ type: "SIGN_IN", user: {...user.val(), key: user.key}});
    })
   }else{
    dispatch({ type: "SIGN_OUT", user: ''})
   }
  })
 }
}

export function removeUserdata(userdata){
  return function (dispatch){
    firebase.database().ref(`users/${userdata.key}`).remove();
  }
}

export function toggleAdmin(userdata){
  return function (dispatch){
    firebase.database().ref(`users/${userdata.key}/isAdmin`).set(!userdata.isAdmin)
  }
}

export function fetchUsers(){
  return function(dispatch){
    return firebase.database().ref(`users`).on('value', userdata => {
        let tempList = [];
        userdata.forEach(userdata => {
          tempList.push({...userdata.val(), key: userdata.key});
        })
        dispatch({ type: "FETCH_ALL_USERS", user: tempList });
    })
  }
}
