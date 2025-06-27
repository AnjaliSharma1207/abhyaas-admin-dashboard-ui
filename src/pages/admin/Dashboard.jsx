
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
  useTheme,
  Container,
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
  const theme = useTheme();
  
  const stats = [
    { title: 'Total Users', value: '1,234', icon: <People />, color: theme.palette.primary.main },
    { title: 'Active Courses', value: '45', icon: <School />, color: theme.palette.success.main },
    { title: 'Training Requests', value: '128', icon: <Assignment />, color: theme.palette.warning.main },
    { title: 'Completion Rate', value: '87%', icon: <TrendingUp />, color: theme.palette.info.main },
  ];

  const recentActivities = [
    { text: 'New user registration: John Doe', time: '2 hours ago', status: 'new' },
    { text: 'Training completed: React Fundamentals', time: '4 hours ago', status: 'completed' },
    { text: 'Course updated: Advanced JavaScript', time: '1 day ago', status: 'updated' },
    { text: 'Training request: Python for Beginners', time: '2 days ago', status: 'pending' },
  ];

  const quickStats = [
    { label: 'Pending Requests', value: '23' },
    { label: 'Active Trainers', value: '15' },
    { label: 'This Month\'s Trainings', value: '34' },
    { label: 'User Satisfaction', value: '4.8/5' },
  ];

  return (
    <Container maxWidth={false} disableGutters>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <CardContent sx={{ p: theme.spacing(3) }}>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      p: theme.spacing(2),
                      borderRadius: 2,
                      backgroundColor: stat.color,
                      color: 'white',
                      mr: theme.spacing(2),
                      boxShadow: theme.shadows[3],
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
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
          <Paper 
            sx={{ 
              p: theme.spacing(3), 
              height: '100%',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: theme.spacing(2), fontWeight: 600 }}>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem 
                  key={index} 
                  divider
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'translateX(8px)',
                    }
                  }}
                >
                  <ListItemIcon>
                    {activity.status === 'completed' && <CheckCircle color="success" />}
                    {activity.status === 'pending' && <Pending color="warning" />}
                    {activity.status === 'new' && <People color="primary" />}
                    {activity.status === 'updated' && <Event color="info" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.text}
                    secondary={activity.time}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <Chip
                    label={activity.status}
                    size="small"
                    color={
                      activity.status === 'completed' ? 'success' :
                      activity.status === 'pending' ? 'warning' :
                      activity.status === 'new' ? 'primary' : 'info'
                    }
                    sx={{ ml: 1 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: theme.spacing(3), 
              height: '100%',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: theme.spacing(3), fontWeight: 600 }}>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
              {quickStats.map((stat, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: theme.spacing(2),
                    borderRadius: 1,
                    backgroundColor: 'background.default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[2],
                    }
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
