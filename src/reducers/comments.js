export default function comments(state = [], action){
  switch(action.type){
    case "FETCH_ALL_COMMENTS":
      return action.comments;
    case "ADD_COMMENT":
      return [...state, action.comment];
    case "REMOVE_COMMENT":
      return state.filter(comment => comment.key !== action.comment.key)
    default:
      return state;
  }
}
