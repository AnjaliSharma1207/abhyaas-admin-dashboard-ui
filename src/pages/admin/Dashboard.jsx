import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, People, Security, School, Assignment, PersonAdd, BarChart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import CourseManagement from './CourseManagement';
import TrainingRequests from './TrainingRequests';
import AssignTrainer from './AssignTrainer';
import Reports from './Reports';
import SubmitRequest from '../../pages/employee/SubmitRequest';
import EmployeeDashboard from '../../pages/employee/EmployeeDashboard';

const menuConfig = {
  admin: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'User Management', icon: <People />, key: 'user-management' },
    { label: 'Role Management', icon: <Security />, key: 'role-management' },
    { label: 'Course Management', icon: <School />, key: 'course-management' },
  ],
  ld: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Training Requests', icon: <Assignment />, key: 'training-requests' },
    { label: 'Assign Trainer', icon: <PersonAdd />, key: 'assign-trainer' },
    { label: 'Generate Report', icon: <BarChart />, key: 'generate-report' },
  ],
  employee: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard' },
    { label: 'Submit Training Request', icon: <Assignment />, key: 'submit-training-request' },
    { label: 'My Trainings', icon: <School />, key: 'my-trainings' },
  ],
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const menuItems = menuConfig[role] || [];
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync activeTab with location.state.tab
  useEffect(() => {
    if (location.state && location.state.tab && menuItems.some(item => item.key === location.state.tab)) {
      setActiveTab(location.state.tab);
    } else {
      setActiveTab('dashboard');
    }
    // eslint-disable-next-line
  }, [location.state, role]);

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <Paper sx={{ p: 4, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {role === 'admin' && 'Welcome to the Admin Dashboard!'}
            {role === 'ld' && 'Welcome to the L&D Dashboard!'}
            {role === 'employee' && 'Welcome to your Dashboard!'}
          </Typography>
          <Typography variant="body1">
            {role === 'admin' && 'Manage users, roles, and courses from the sidebar.'}
            {role === 'ld' && 'Manage training requests, assign trainers, and generate reports.'}
            {role === 'employee' && 'Submit training requests and view your trainings.'}
          </Typography>
        </Paper>
      );
    }
    if (role === 'admin') {
      if (activeTab === 'user-management') return <UserManagement />;
      if (activeTab === 'role-management') return <RoleManagement />;
      if (activeTab === 'course-management') return <CourseManagement />;
    }
    if (role === 'ld') {
      if (activeTab === 'training-requests') return <TrainingRequests />;
      if (activeTab === 'assign-trainer') return <AssignTrainer />;
      if (activeTab === 'generate-report') return <Reports />;
    }
    if (role === 'employee') {
      if (activeTab === 'submit-training-request') return <SubmitRequest />;
      if (activeTab === 'my-trainings') return <EmployeeDashboard />;
    }
    return null;
  };

  return (
    <Box sx={{ minHeight: '80vh' }}>
      {renderContent()}
    </Box>
  );
};

export default Dashboard;
