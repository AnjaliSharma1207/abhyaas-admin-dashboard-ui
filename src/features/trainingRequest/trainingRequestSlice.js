import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'employeeTrainingRequests';

const getInitialState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Dummy data for first load
  return [
    {
      id: 1,
      topic: 'React Basics',
      description: 'Introduction to React fundamentals.',
      date: '2024-07-01',
      mode: 'Online',
    },
    {
      id: 2,
      topic: 'Advanced JavaScript',
      description: 'Deep dive into ES6+ features.',
      date: '2024-07-10',
      mode: 'Offline',
    },
  ];
};

const initialState = {
  requests: getInitialState(),
};

const persist = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.requests));
};

const trainingRequestSlice = createSlice({
  name: 'trainingRequest',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.requests.push(action.payload);
      persist(state);
    },
    updateRequest: (state, action) => {
      const idx = state.requests.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) {
        state.requests[idx] = action.payload;
        persist(state);
      }
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(r => r.id !== action.payload);
      persist(state);
    },
    loadRequests: (state) => {
      state.requests = getInitialState();
      persist(state);
    },
  },
});

export const { addRequest, updateRequest, deleteRequest, loadRequests } = trainingRequestSlice.actions;
export default trainingRequestSlice.reducer; 