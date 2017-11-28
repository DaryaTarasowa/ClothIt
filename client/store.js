/**
* Main store function
*/
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';

export function configureStore(initialState = {
	showAddCloth: true,
}) {
	// Middleware and store enhancers
	const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancers = [
		applyMiddleware(thunk),
	];

	// if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	// 	// Enable DevTools only when rendering on client and during development.
	// 	enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
	// }

	//const store = createStore(rootReducer, initialState, compose(...enhancers));
	const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));
	// For hot reloading reducers
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextReducer = require('./reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
