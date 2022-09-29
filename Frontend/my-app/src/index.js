/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//import store from '../src/Store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
//import store from './Store/store';

import { applyMiddleware } from 'redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './Store/LoginSlice';
import User from './Store/userSlice';
import Post from './Store/PostsSlice';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth,
	User,
	Post,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
const store = configureStore({
	reducer: { auth: authReducer, User: userSlice },
});
*/
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

/*
<Provider store={store}>
		//<PersistGate loading={null} persistor={persistor}>
			<App />
		//</PersistGate>
	</Provider>

	const store = configureStore({
	reducer: { auth: authSlice, User: userSlice },
});

*/
let persistor = persistStore(store, { manualPersist: false });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
