
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

const AppContent = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  
  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        ) : (
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/roles" element={<RoleManagement />} />
            <Route path="admin/courses" element={<CourseManagement />} />
            <Route path="admin/training-requests" element={<TrainingRequests />} />
            <Route path="admin/assign-trainer" element={<AssignTrainer />} />
            <Route path="admin/reports" element={<Reports />} />
            <Route path="admin/announcements" element={<Announcements />} />
            <Route path="employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="employee/submit-request" element={<SubmitRequest />} />
            <Route path="lnd/invite-trainer" element={<InviteTrainer />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        )}
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
