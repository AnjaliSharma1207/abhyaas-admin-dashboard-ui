import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import theme from './theme/theme';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import CourseManagement from './pages/admin/CourseManagement';
import TrainingRequests from './pages/admin/TrainingRequests';
import AssignTrainer from './pages/admin/AssignTrainer';
import Reports from './pages/admin/Reports';
import Announcements from './pages/admin/Announcements';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import SubmitRequest from './pages/employee/SubmitRequest';
import InviteTrainer from './pages/lnd/InviteTrainer';
import PrivateRoute from './components/common/PrivateRoute';

const AppContent = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={["admin", "ld", "employee"]} user={user}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<div>User Management Page</div>} />
          <Route path="role-management" element={<div>Role Management Page</div>} />
          <Route path="course-management" element={<div>Course Management Page</div>} />
          <Route path="training-requests" element={<div>Training Requests Page</div>} />
          <Route path="assign-trainer" element={<div>Assign Trainer Page</div>} />
          <Route path="generate-report" element={<div>Generate Report Page</div>} />
          <Route path="submit-training-request" element={<div>Submit Training Request Page</div>} />
          <Route path="my-trainings" element={<div>My Trainings Page</div>} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
