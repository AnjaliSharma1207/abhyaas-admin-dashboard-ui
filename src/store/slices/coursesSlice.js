import { createSlice } from '@reduxjs/toolkit';

const getInitialCourses = () => {
  const courses = localStorage.getItem('courses');
  return courses ? JSON.parse(courses) : [];
};

const initialState = {
  courses: getInitialCourses(),
  loading: false,
  error: null,
};

const persistCourses = (courses) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
      persistCourses(state.courses);
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
      persistCourses(state.courses);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
        persistCourses(state.courses);
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
      persistCourses(state.courses);
    },
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
