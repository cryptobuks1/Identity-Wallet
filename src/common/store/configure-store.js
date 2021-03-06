/* istanbul ignore file */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import history from './history';
import { createReducers } from './reducers';
import {
	forwardToMain,
	forwardToRenderer,
	triggerAlias,
	replayActionMain,
	replayActionRenderer
} from 'electron-redux';

export default (initialState, scope = 'main') => {
	let middleware = [thunk, promise];
	let composeFunction = compose;
	if (scope === 'renderer') {
		if (process.env.ENABLE_REDUX_LOGGER) {
			const logger = createLogger({ collapsed: (getState, actions) => true });
			middleware.push(logger);
		}
		middleware = [forwardToMain, ...middleware];

		if (!history.getHistory()) {
			history.create();
		}

		middleware = [forwardToMain, ...middleware, routerMiddleware(history.getHistory())];
		if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
			composeFunction = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
		}
	}

	if (scope === 'main') {
		middleware = [triggerAlias, ...middleware, forwardToRenderer];
	}

	const enhanced = [applyMiddleware(...middleware)];

	const rootReducer = createReducers(scope);
	const enhancer = composeFunction(...enhanced);
	const store = createStore(rootReducer, initialState, enhancer);

	if (scope === 'main') {
		replayActionMain(store);
	} else {
		replayActionRenderer(store);
	}

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(createReducers(scope));
		});
	}

	return store;
};
