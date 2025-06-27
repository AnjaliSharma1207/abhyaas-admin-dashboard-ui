
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
  useTheme,
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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

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

const Sidebar = ({ open, onClose, variant, drawerWidth = 280 }) => {
  const theme = useTheme();
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
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'background.paper'
    }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Typography variant="h5" fontWeight="bold">
          Abhyaas
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Training Management
        </Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 1 }}>
        {menuItems.map((section) => (
          <Box key={section.title} sx={{ mb: 1 }}>
            <ListItem 
              button 
              onClick={() => handleSectionToggle(section.title)}
              sx={{ 
                mx: 1,
                borderRadius: 1,
                backgroundColor: 'action.hover',
                '&:hover': {
                  backgroundColor: 'action.selected',
                }
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
                      transition: 'all 0.2s ease',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: theme.shadows[2],
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        boxShadow: theme.shadows[1],
                        transform: 'translateX(4px)',
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
          boxShadow: variant === 'persistent' ? theme.shadows[3] : 'none',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
