import {applyMiddleware, compose, createStore} from 'redux';
import { loadState, saveState} from './localStorage';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = loadState();

const store = createStore(
    rootReducer,
    initialState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)),
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
