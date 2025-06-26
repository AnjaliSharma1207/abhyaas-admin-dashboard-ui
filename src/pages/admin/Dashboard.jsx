
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  People,
  School,
  Assignment,
  TrendingUp,
  Event,
  CheckCircle,
  Pending,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: <People />, color: '#1976d2' },
    { title: 'Active Courses', value: '45', icon: <School />, color: '#2e7d32' },
    { title: 'Training Requests', value: '128', icon: <Assignment />, color: '#ed6c02' },
    { title: 'Completion Rate', value: '87%', icon: <TrendingUp />, color: '#9c27b0' },
  ];

  const recentActivities = [
    { text: 'New user registration: John Doe', time: '2 hours ago', status: 'new' },
    { text: 'Training completed: React Fundamentals', time: '4 hours ago', status: 'completed' },
    { text: 'Course updated: Advanced JavaScript', time: '1 day ago', status: 'updated' },
    { text: 'Training request: Python for Beginners', time: '2 days ago', status: 'pending' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: stat.color,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    {activity.status === 'completed' && <CheckCircle color="success" />}
                    {activity.status === 'pending' && <Pending color="warning" />}
                    {activity.status === 'new' && <People color="primary" />}
                    {activity.status === 'updated' && <Event color="info" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                  />
                  <Chip
                    label={activity.status}
                    size="small"
                    color={
                      activity.status === 'completed' ? 'success' :
                      activity.status === 'pending' ? 'warning' :
                      activity.status === 'new' ? 'primary' : 'info'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Pending Requests</Typography>
                <Typography variant="body2" fontWeight="bold">23</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Active Trainers</Typography>
                <Typography variant="body2" fontWeight="bold">15</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">This Month's Trainings</Typography>
                <Typography variant="body2" fontWeight="bold">34</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">User Satisfaction</Typography>
                <Typography variant="body2" fontWeight="bold">4.8/5</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
