
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
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
  ExpandLess,
  ExpandMore,
  RequestPage,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 280;

const menuItems = [
  {
    title: 'Admin Panel',
    items: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
      { text: 'User Management', icon: <People />, path: '/admin/users' },
      { text: 'Role Management', icon: <Security />, path: '/admin/roles' },
      { text: 'Course Management', icon: <School />, path: '/admin/courses' },
      { text: 'Training Requests', icon: <Assignment />, path: '/admin/training-requests' },
      { text: 'Assign Trainer', icon: <PersonAdd />, path: '/admin/assign-trainer' },
      { text: 'Reports', icon: <BarChart />, path: '/admin/reports' },
      { text: 'Announcements', icon: <Announcement />, path: '/admin/announcements' },
    ],
  },
  {
    title: 'Employee Panel',
    items: [
      { text: 'My Dashboard', icon: <Dashboard />, path: '/employee/dashboard' },
      { text: 'Submit Request', icon: <RequestPage />, path: '/employee/submit-request' },
    ],
  },
  {
    title: 'L&D Panel',
    items: [
      { text: 'Invite Trainer', icon: <PersonAdd />, path: '/lnd/invite-trainer' },
    ],
  },
];

const Sidebar = ({ open, onClose, variant }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    'Admin Panel': true,
    'Employee Panel': false,
    'L&D Panel': false,
  });

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleItemClick = (path) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, mt: 8 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Abhyaas
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Admin Dashboard
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((section) => (
          <Box key={section.title}>
            <ListItem 
              button 
              onClick={() => handleSectionToggle(section.title)}
              sx={{ 
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                mb: 1,
                mx: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText 
                primary={section.title} 
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'primary.main',
                }}
              />
              {expandedSections[section.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            
            <Collapse in={expandedSections[section.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items.map((item) => (
                  <ListItem
                    key={item.text}
                    button
                    onClick={() => handleItemClick(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      pl: 4,
                      mx: 1,
                      borderRadius: 1,
                      mb: 0.5,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
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
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
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
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
