import React, {Fragment} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import AppNavigator from './src/navigation/AppNavigator';
import rootReducer from './src/store/rootReducer';

const socket = io('http://localhost:5000', {jsonp: false});
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk, log, socketIoMiddleware];
const enhancers = [];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), ...enhancers));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
};

export default App;
