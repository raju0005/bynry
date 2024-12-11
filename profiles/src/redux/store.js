import { configureStore } from '@reduxjs/toolkit';
import { profileApi } from './slices/profileApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import profileReducer from './slices/profileSlice'


const store = configureStore({
  reducer: {
    profile: profileReducer, 
    [profileApi.reducerPath]: profileApi.reducer, 
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware), 
});

setupListeners(store.dispatch); 

export default store;
