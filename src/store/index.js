import {
  createStore,
  applyMiddleware, //使用redux 中间件
  compose
} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(
  reducer,
  enhancer 
);

export default store;