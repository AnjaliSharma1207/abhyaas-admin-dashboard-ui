
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
} from '@mui/material';
import {
  Assignment,
  School,
  CalendarToday,
  Feedback,
  CloudSync,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const recentRequests = [
    { title: 'React Advanced Concepts', date: '2024-01-15', status: 'Pending' },
    { title: 'Python Data Science', date: '2024-01-10', status: 'Approved' },
    { title: 'Machine Learning Basics', date: '2024-01-05', status: 'Completed' },
  ];

  const upcomingTrainings = [
    { title: 'JavaScript ES6+', date: '2024-01-20', trainer: 'John Smith' },
    { title: 'React Hooks', date: '2024-01-25', trainer: 'Sarah Johnson' },
    { title: 'Node.js Fundamentals', date: '2024-02-01', trainer: 'Mike Wilson' },
  ];

  const myTrainings = [
    { title: 'HTML & CSS Basics', date: '2023-12-15', rating: 5 },
    { title: 'JavaScript Fundamentals', date: '2023-12-10', rating: 4 },
    { title: 'Git Version Control', date: '2023-11-25', rating: 5 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Approved': return 'info';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/employee/submit-request')}
                  fullWidth
                >
                  Submit Training Request
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CloudSync />}
                  fullWidth
                >
                  Sync Calendar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Requests */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Training Requests
            </Typography>
            <List>
              {recentRequests.map((request, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText
                    primary={request.title}
                    secondary={`Submitted: ${request.date}`}
                  />
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Trainings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Trainings (Next 30 Days)
            </Typography>
            <List>
              {upcomingTrainings.map((training, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText
                    primary={training.title}
                    secondary={`${training.date} - Trainer: ${training.trainer}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Past Trainings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              My Training History
            </Typography>
            <List>
              {myTrainings.map((training, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText
                    primary={training.title}
                    secondary={`Completed: ${training.date}`}
                  />
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2">
                      {training.rating}/5 ⭐
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Feedback />}
                      variant="outlined"
                    >
                      Feedback
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
