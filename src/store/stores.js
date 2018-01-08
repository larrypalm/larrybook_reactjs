import {
 createStore,
 combineReducers,
 applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import comments from '../reducers/comments';
import user from '../reducers/user';
import userdata from '../reducers/userdata';

const rootReducer = combineReducers({
 comments,
 user,
 userdata,
});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
export default store;
