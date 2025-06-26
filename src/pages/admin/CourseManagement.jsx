
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React development',
      duration: '40 hours',
      level: 'Beginner',
      status: 'Active',
      enrollments: 25,
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts',
      duration: '60 hours',
      level: 'Advanced',
      status: 'Active',
      enrollments: 18,
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Python programming for data analysis',
      duration: '80 hours',
      level: 'Intermediate',
      status: 'Draft',
      enrollments: 0,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    status: 'Draft',
  });

  const handleOpen = (course = null) => {
    setSelectedCourse(course);
    setFormData(course || {
      title: '',
      description: '',
      duration: '',
      level: '',
      status: 'Draft',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleSave = () => {
    if (selectedCourse) {
      setCourses(courses.map(course => 
        course.id === selectedCourse.id ? { ...formData, id: selectedCourse.id, enrollments: selectedCourse.enrollments } : course
      ));
    } else {
      setCourses([...courses, { ...formData, id: Date.now(), enrollments: 0 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Course Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Chip
                    label={course.status}
                    color={course.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {course.description}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip label={course.level} color={getLevelColor(course.level)} size="small" />
                  <Chip label={course.duration} variant="outlined" size="small" />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {course.enrollments} students enrolled
                </Typography>
              </CardContent>
              
              <CardActions>
                <IconButton size="small" color="primary">
                  <Visibility />
                </IconButton>
                <IconButton size="small" color="primary" onClick={() => handleOpen(course)}>
                  <Edit />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(course.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement;
