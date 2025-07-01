import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      const { topic, preferredDate, requester, ...rest } = action.payload;

      const existing = state.requests.find(
        (req) => req.topic === topic && req.preferredDate === preferredDate
      );

      if (existing) {
        if (!existing.requesters.includes(requester)) {
          existing.requesters.push(requester);
        }
      } else {
        state.requests.push({
          id: Date.now(),
          topic,
          preferredDate,
          priority: rest.priority,
          objective: rest.objective,
          requesters: [requester],
          status: 'Pending',
        });
      }
    },

    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const req = state.requests.find((r) => r.id === id);
      if (req) {
        req.status = status;
      }
    },
  },
});

export const { addRequest, updateRequestStatus } = trainingSlice.actions;
export default trainingSlice.reducer;
