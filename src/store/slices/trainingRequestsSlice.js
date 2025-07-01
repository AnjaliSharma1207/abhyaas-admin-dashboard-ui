import { createSlice } from '@reduxjs/toolkit';

export const topics = [
  'React Development',
  'Node.js',
  'Python Programming',
  'Data Science',
  'Machine Learning',
  'Cloud Computing',
  'DevOps',
  'UI/UX Design',
  'Project Management',
  'Other',
];

export const dummyData = [
  {
    id: 1,
    topic: 'React Development',
    customTopic: '',
    objective: 'Learn React basics',
    priority: 'High',
    preferredDate: '2025-07-05',
    participants: '10',
  },
  {
    id: 2,
    topic: 'Data Science',
    customTopic: '',
    objective: 'Introduction to Data Science',
    priority: 'Medium',
    preferredDate: '2025-07-15',
    participants: '15',
  },
];

const dummyTrainingRequest = {
  id: null,
  topic: '',
  customTopic: '',
  objective: '',
  priority: 'Medium',
  preferredDate: '',
  participants: '',
};

const initialState = {
  requests: JSON.parse(localStorage.getItem('trainingRequests')) || dummyData,
  dummyTrainingRequest,
  topics,
};

const trainingRequestsSlice = createSlice({
  name: 'trainingRequests',
  initialState,
  reducers: {
    addRequest: (state, action) => {
       const newRequest = {
    ...action.payload,
    id: Date.now(),
    status: 'Pending', // ✅ Always add status when submitting
  };
      state.requests.push(newRequest);
      localStorage.setItem('trainingRequests', JSON.stringify(state.requests));
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter((req) => req.id !== action.payload);
      localStorage.setItem('trainingRequests', JSON.stringify(state.requests));
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
      localStorage.setItem('trainingRequests', JSON.stringify(state.requests));
    },
    approveRequest: (state, action) => {
  const id = action.payload;
  state.requests = state.requests.map((req) =>
    req.id === id ? { ...req, status: 'Approved' } : req
  );
},
rejectRequest: (state, action) => {
  const id = action.payload;
  state.requests = state.requests.map((req) =>
    req.id === id ? { ...req, status: 'Rejected' } : req
  );
},
  },
});

export const { addRequest, deleteRequest, setRequests,approveRequest,rejectRequest } = trainingRequestsSlice.actions;
export default trainingRequestsSlice.reducer;
