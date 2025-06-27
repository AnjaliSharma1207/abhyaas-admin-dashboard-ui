
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme, Container } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const DRAWER_WIDTH = 280;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar 
        open={sidebarOpen} 
        onClose={handleDrawerToggle}
        variant={isMobile ? 'temporary' : 'persistent'}
        drawerWidth={DRAWER_WIDTH}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          marginTop: '64px', // AppBar height
          marginLeft: { 
            xs: 0, 
            md: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 
          },
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            flexGrow: 1,
            py: 3,
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
