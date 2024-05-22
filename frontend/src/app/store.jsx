import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import useReducer from '../features/user/userSlice';
// import authReducer from '../features/authentication/authSlice'
import emailReducer from '../features/user/userEmail'
import {persistReducer} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    // user: useReducer,
    email : emailReducer
    // authentication: authReducer,
})

const persistConfig ={
    key: 'root', 
    storage,
    version: 1,
    whitelist: ['email'],
}

const persistedReducer= persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck: false}),
})

export const  persistor = persistStore(store);