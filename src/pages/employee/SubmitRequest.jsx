
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import { Send } from '@mui/icons-material';

const SubmitRequest = () => {
  const [formData, setFormData] = useState({
    topic: '',
    customTopic: '',
    objective: '',
    priority: 'Medium',
    preferredDate: '',
    participants: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const topics = [
    'React Development',
    'Node.js',
    'Python Programming',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Project Management',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Training request submitted:', formData);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        topic: '',
        customTopic: '',
        objective: '',
        priority: 'Medium',
        preferredDate: '',
        participants: '',
      });
    }, 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Submit Training Request
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Training request submitted successfully! You will receive a confirmation email shortly.
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Training Topic</InputLabel>
                  <Select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  >
                    {topics.map((topic) => (
                      <MenuItem key={topic} value={topic}>
                        {topic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {formData.topic === 'Other' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Custom Topic"
                    name="customTopic"
                    value={formData.customTopic}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <MenuItem value="Low">
                      <Chip label="Low" color="success" size="small" sx={{ mr: 1 }} />
                      Low Priority
                    </MenuItem>
                    <MenuItem value="Medium">
                      <Chip label="Medium" color="warning" size="small" sx={{ mr: 1 }} />
                      Medium Priority
                    </MenuItem>
                    <MenuItem value="High">
                      <Chip label="High" color="error" size="small" sx={{ mr: 1 }} />
                      High Priority
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Expected Participants"
                  name="participants"
                  type="number"
                  value={formData.participants}
                  onChange={handleChange}
                  helperText="Number of people who will attend"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Training Objective"
                  name="objective"
                  multiline
                  rows={4}
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="Please describe what you want to achieve from this training, specific topics to cover, and any other relevant details..."
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setFormData({
                      topic: '',
                      customTopic: '',
                      objective: '',
                      priority: 'Medium',
                      preferredDate: '',
                      participants: '',
                    })}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Send />}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitRequest;
