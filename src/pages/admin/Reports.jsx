
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BarChart, TableChart, Download } from '@mui/icons-material';

const Reports = () => {
  const [viewMode, setViewMode] = useState('chart');
  const [reportType, setReportType] = useState('training');

  const trainingData = [
    { month: 'Jan', completed: 45, requested: 60, satisfaction: 4.2 },
    { month: 'Feb', completed: 52, requested: 58, satisfaction: 4.5 },
    { month: 'Mar', completed: 48, requested: 55, satisfaction: 4.3 },
    { month: 'Apr', completed: 61, requested: 65, satisfaction: 4.6 },
    { month: 'May', completed: 55, requested: 62, satisfaction: 4.4 },
    { month: 'Jun', completed: 58, requested: 63, satisfaction: 4.7 },
  ];

  const userStats = [
    { role: 'Admin', count: 3, active: 3 },
    { role: 'Employee', count: 245, active: 238 },
    { role: 'Trainer', count: 12, active: 11 },
    { role: 'L&D', count: 5, active: 5 },
  ];

  const courseStats = [
    { course: 'React Development', enrollments: 89, completions: 76, rating: 4.6 },
    { course: 'Python Programming', enrollments: 67, completions: 58, rating: 4.5 },
    { course: 'Node.js', enrollments: 45, completions: 41, rating: 4.4 },
    { course: 'Data Science', enrollments: 34, completions: 28, rating: 4.7 },
  ];

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const renderChartView = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Training Progress Over Time
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            <Typography>
              Chart visualization would be rendered here using a charting library like Recharts
            </Typography>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            User Distribution
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            <Typography>Pie chart for user roles</Typography>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            Course Completion Rates
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            <Typography>Bar chart for course completions</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderTableView = () => {
    if (reportType === 'training') {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Completed</TableCell>
                <TableCell align="right">Requested</TableCell>
                <TableCell align="right">Satisfaction</TableCell>
                <TableCell align="right">Completion Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingData.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{row.completed}</TableCell>
                  <TableCell align="right">{row.requested}</TableCell>
                  <TableCell align="right">{row.satisfaction}/5</TableCell>
                  <TableCell align="right">
                    {((row.completed / row.requested) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else if (reportType === 'users') {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell align="right">Total Users</TableCell>
                <TableCell align="right">Active Users</TableCell>
                <TableCell align="right">Activity Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStats.map((row) => (
                <TableRow key={row.role}>
                  <TableCell>{row.role}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.active}</TableCell>
                  <TableCell align="right">
                    {((row.active / row.count) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell align="right">Enrollments</TableCell>
                <TableCell align="right">Completions</TableCell>
                <TableCell align="right">Completion Rate</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseStats.map((row) => (
                <TableRow key={row.course}>
                  <TableCell>{row.course}</TableCell>
                  <TableCell align="right">{row.enrollments}</TableCell>
                  <TableCell align="right">{row.completions}</TableCell>
                  <TableCell align="right">
                    {((row.completions / row.enrollments) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell align="right">{row.rating}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Button variant="contained" startIcon={<Download />}>
          Export Data
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Trainings
              </Typography>
              <Typography variant="h4">
                342
              </Typography>
              <Typography variant="body2" color="success.main">
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h4">
                87%
              </Typography>
              <Typography variant="body2" color="success.main">
                +5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Satisfaction
              </Typography>
              <Typography variant="h4">
                4.6/5
              </Typography>
              <Typography variant="body2" color="success.main">
                +0.2 from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Trainers
              </Typography>
              <Typography variant="h4">
                15
              </Typography>
              <Typography variant="body2" color="info.main">
                No change
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Report Type</InputLabel>
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <MenuItem value="training">Training Reports</MenuItem>
            <MenuItem value="users">User Reports</MenuItem>
            <MenuItem value="courses">Course Reports</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
        >
          <ToggleButton value="chart">
            <BarChart sx={{ mr: 1 }} />
            Chart View
          </ToggleButton>
          <ToggleButton value="table">
            <TableChart sx={{ mr: 1 }} />
            Table View
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      {viewMode === 'chart' ? renderChartView() : renderTableView()}
    </Box>
  );
};

export default Reports;
