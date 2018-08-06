import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer } from './reducer';
import { sagas as userSaga } from './user/sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  connectRouter(history)(persistedReducer),
  composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
  )
);

export const persistor = persistStore(store);
sagaMiddleware.run(userSaga);
