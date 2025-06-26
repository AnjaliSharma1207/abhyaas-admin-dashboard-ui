
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  announcements: [],
  reports: [],
  loading: false,
  error: null,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
    addAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
    },
  },
});

export const { setRequests, addRequest, setAnnouncements, addAnnouncement } = trainingSlice.actions;
export default trainingSlice.reducer;
