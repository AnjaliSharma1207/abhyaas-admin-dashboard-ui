import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const dummyUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@company.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Employee User',
      email: 'employee@company.com',
      password: 'employee123',
      role: 'employee',
    },
    {
      id: 3,
      name: 'L&D User',
      email: 'ld@company.com',
      password: 'ld123',
      role: 'ld',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }
    dispatch(loginStart());
    // Simulate login API call
    setTimeout(() => {
      const foundUser = dummyUsers.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      if (!foundUser) {
        dispatch(loginFailure('Invalid email or password'));
        return;
      }
      const authToken = 'dummy-auth-token-' + Date.now();
      // Store in localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(foundUser));
      dispatch(loginSuccess(foundUser));
      // Redirect based on role
      if (foundUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (foundUser.role === 'employee') {
        navigate('/employee/dashboard');
      } else if (foundUser.role === 'ld') {
        navigate('/lnd/invite-trainer');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        error={error && !formData.email}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        error={error && !formData.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="rememberMe"
            color="primary"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        }
        label="Remember me"
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  );
};

export default Login;
