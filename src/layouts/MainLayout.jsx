import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const DRAWER_WIDTH = 260;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <Box sx={{ display: 'flex', width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
      <Sidebar
        open={sidebarOpen}
        onClose={toggleSidebar}
        variant={isMobile ? 'temporary' : 'persistent'}
        drawerWidth={DRAWER_WIDTH}
      />
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Header onMenuClick={toggleSidebar} />
        <Box
          sx={{
            marginTop: { xs: '56px', md: '64px' },
            padding: { xs: 2, md: 3 },
            marginLeft: !isMobile ? `${DRAWER_WIDTH}px` : 0,
            transition: 'margin 0.3s ease',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
