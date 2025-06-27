
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
  ListItemButton,
} from '@mui/material';
import {
  Dashboard,
  People,
  Security,
  School,
  Assignment,
  PersonAdd,
  BarChart,
  Announcement,
  Book,
  RequestPage,
  GroupAdd,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'User Management', icon: <People />, path: '/admin/users' },
  { text: 'Role Management', icon: <Security />, path: '/admin/roles' },
  { text: 'Course Management', icon: <School />, path: '/admin/courses' },
  { text: 'Training Requests', icon: <Assignment />, path: '/admin/training-requests' },
  { text: 'Assign Trainer', icon: <PersonAdd />, path: '/admin/assign-trainer' },
  { text: 'Reports', icon: <BarChart />, path: '/admin/reports' },
  { text: 'Announcements', icon: <Announcement />, path: '/admin/announcements' },
  { text: 'My Trainings', icon: <Book />, path: '/employee/dashboard' },
  { text: 'Submit Training Request', icon: <RequestPage />, path: '/employee/submit-request' },
  { text: 'Invite Trainers', icon: <GroupAdd />, path: '/lnd/invite-trainer' },
];

const Sidebar = ({ open, onClose, variant, drawerWidth = 260 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper
    }}>
      <Box sx={{ 
        p: theme.spacing(3), 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}>
        <Typography variant="h5" fontWeight="bold">
          Abhyaas
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Training Management
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText,
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    boxShadow: theme.shadows[1],
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          boxShadow: variant === 'persistent' ? theme.shadows[2] : 'none',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
