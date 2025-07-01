import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import usersSlice from './slices/usersSlice';
import coursesSlice from './slices/coursesSlice';
import trainingSlice from './slices/trainingSlice';
import trainingRequestsReducer from './slices/trainingRequestsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    courses: coursesSlice,
    training: trainingSlice,
    trainingRequests: trainingRequestsReducer,
  },
});
