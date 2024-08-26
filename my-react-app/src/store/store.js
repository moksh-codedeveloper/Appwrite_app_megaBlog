import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice, { post } from './postSlice';

const store = configureStore({
    reducer : {
        auth: authSlice,
        post: postSlice
    },
});

export default store;
