import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, NotificationsNone } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: { xs: 0, md: '260px' },
        top: 0,
        right: 0,
        height: { xs: 56, md: 64 },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#fff',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* Logo + Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Welcome + Bell */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: '#374151', fontSize: '0.95rem' }}
        >
          Welcome, {user?.name} ({user?.role?.toUpperCase()})
        </Typography>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            backgroundColor: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NotificationsNone sx={{ color: '#fff' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
