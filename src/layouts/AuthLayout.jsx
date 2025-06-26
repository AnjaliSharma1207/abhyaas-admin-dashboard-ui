
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Paper, Typography } from '@mui/material';

const AuthLayout = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              Abhyaas
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Training Management System
            </Typography>
          </Box>
          <Outlet />
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthLayout;
