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
import { useSelector, useDispatch } from 'react-redux';
import { addCourse, updateCourse, deleteCourse as deleteCourseAction } from '../../store/slices/coursesSlice';

const CourseManagement = () => {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    status: 'Draft',
    image: '',
  });
  const [error, setError] = useState(null);

  const handleOpen = (course = null) => {
    setSelectedCourse(course);
    setFormData(course || {
      title: '',
      description: '',
      duration: '',
      level: '',
      status: 'Draft',
      image: '',
    });
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setError(null);
    if (!formData.title || !formData.description || !formData.duration || !formData.level) {
      setError('All fields except image are required.');
      return;
    }
    if (selectedCourse) {
      dispatch(updateCourse({ ...formData, id: selectedCourse.id, enrollments: selectedCourse.enrollments || 0 }));
    } else {
      const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
      dispatch(addCourse({ ...formData, id, enrollments: 0 }));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteCourseAction(id));
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
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{ width: '100%', height: 160, objectFit: 'cover', marginBottom: 8, borderRadius: 4 }}
                  />
                )}
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
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
            )}
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
            <TextField
              fullWidth
              label="Image"
              type="file"
              onChange={handleImageChange}
              margin="normal"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Course"
                style={{ maxWidth: '100%', marginTop: 10 }}
              />
            )}
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
