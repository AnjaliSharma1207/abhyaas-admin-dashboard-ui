import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  Security,
  School,
  Assignment,
  PersonAdd,
  BarChart,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const drawerWidth = 260;

const menuConfig = {
  admin: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard', path: '/dashboard' },
    { label: 'User Management', icon: <People />, key: 'user-management', path: '/dashboard' },
    { label: 'Role Management', icon: <Security />, key: 'role-management', path: '/dashboard' },
    { label: 'Course Management', icon: <School />, key: 'course-management', path: '/dashboard' },
  ],
  ld: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard', path: '/dashboard' },
    { label: 'Training Requests', icon: <Assignment />, key: 'training-requests', path: '/dashboard' },
    { label: 'Assign Trainer', icon: <PersonAdd />, key: 'assign-trainer', path: '/dashboard' },
    { label: 'Generate Report', icon: <BarChart />, key: 'generate-report', path: '/dashboard' },
  ],
  employee: [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard', path: '/dashboard' },
    { label: 'Submit Training Request', icon: <Assignment />, key: 'submit-training-request', path: '/dashboard' },
    { label: 'My Trainings', icon: <School />, key: 'my-trainings', path: '/dashboard' },
  ],
};

const Sidebar = ({ open, onClose, variant, drawerWidth: propDrawerWidth = drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const menuItems = menuConfig[role] || [];

  const handleItemClick = (item) => {
    navigate('/dashboard', { state: { tab: item.key } });
    if (variant === 'temporary') onClose();
  };

  const activeTab = location.state?.tab || 'dashboard';

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: propDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: propDrawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #eee',
          height: '100vh', // Full height
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header (Logo + Title) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 2,
          minHeight: '64px',
          borderBottom: '1px solid #eee',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#fff',
        }}
      >
        <Box
          component="img"
          src="/training.png"
          alt="logo"
          sx={{ width: 36, height: 36 }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#1f2937' }}
        >
          अभ्यास
        </Typography>
      </Box>

      {/* Menu List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ px: 2, mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                selected={activeTab === item.key}
                sx={{
                  borderRadius: 2,
                  backgroundColor:
                    activeTab === item.key ? 'rgba(33, 150, 243, 0.12)' : 'transparent',
                  color: activeTab === item.key ? '#1976d2' : '#222',
                  fontWeight: activeTab === item.key ? 600 : 400,
                  '& .MuiListItemIcon-root': {
                    color: activeTab === item.key ? '#1976d2' : '#888',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.08)',
                  },
                  minHeight: 48,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: activeTab === item.key ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ px: 2, py: 2.5 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              backgroundColor: 'rgba(244, 67, 54, 0.08)',
              color: '#d32f2f',
              fontWeight: 600,
              minHeight: 44,
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.15)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: '#d32f2f' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
