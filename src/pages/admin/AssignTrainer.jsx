
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
} from '@mui/material';
import { Assignment, Person } from '@mui/icons-material';

const AssignTrainer = () => {
  const [assignments, setAssignments] = useState([]);
  
  const trainingRequests = [
    { id: 1, topic: 'React Development', requester: 'John Doe', participants: 8, priority: 'High' },
    { id: 2, topic: 'Python Programming', requester: 'Jane Smith', participants: 12, priority: 'Medium' },
    { id: 3, topic: 'Node.js', requester: 'Bob Johnson', participants: 6, priority: 'Low' },
  ];

  const trainers = [
    { id: 1, name: 'Sarah Wilson', expertise: ['React', 'JavaScript', 'Node.js'], rating: 4.8, availability: 'Available' },
    { id: 2, name: 'Mike Johnson', expertise: ['Python', 'Data Science', 'ML'], rating: 4.9, availability: 'Available' },
    { id: 3, name: 'Emma Davis', expertise: ['React', 'Vue.js', 'Angular'], rating: 4.7, availability: 'Busy' },
    { id: 4, name: 'David Brown', expertise: ['Node.js', 'Express', 'MongoDB'], rating: 4.6, availability: 'Available' },
  ];

  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');

  const handleAssign = () => {
    if (selectedRequest && selectedTrainer) {
      const request = trainingRequests.find(r => r.id === parseInt(selectedRequest));
      const trainer = trainers.find(t => t.id === parseInt(selectedTrainer));
      
      const newAssignment = {
        id: Date.now(),
        request,
        trainer,
        assignedDate: new Date().toISOString().split('T')[0],
        status: 'Assigned',
      };
      
      setAssignments([...assignments, newAssignment]);
      setSelectedRequest('');
      setSelectedTrainer('');
    }
  };

  const getAvailableTrainers = () => {
    if (!selectedRequest) return trainers;
    
    const request = trainingRequests.find(r => r.id === parseInt(selectedRequest));
    if (!request) return trainers;
    
    return trainers.filter(trainer => {
      const hasExpertise = trainer.expertise.some(skill => 
        request.topic.toLowerCase().includes(skill.toLowerCase())
      );
      return hasExpertise && trainer.availability === 'Available';
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Assign Trainer
      </Typography>

      <Grid container spacing={3}>
        {/* Assignment Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Assignment
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Training Request</InputLabel>
                <Select
                  value={selectedRequest}
                  onChange={(e) => setSelectedRequest(e.target.value)}
                >
                  {trainingRequests.map((request) => (
                    <MenuItem key={request.id} value={request.id}>
                      <Box>
                        <Typography variant="body1">{request.topic}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.requester} - {request.participants} participants
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Select Trainer</InputLabel>
                <Select
                  value={selectedTrainer}
                  onChange={(e) => setSelectedTrainer(e.target.value)}
                  disabled={!selectedRequest}
                >
                  {getAvailableTrainers().map((trainer) => (
                    <MenuItem key={trainer.id} value={trainer.id}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {trainer.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body1">{trainer.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {trainer.expertise.join(', ')} - Rating: {trainer.rating}/5
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleAssign}
                disabled={!selectedRequest || !selectedTrainer}
              >
                Assign Trainer
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Assignments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Assignments
            </Typography>
            
            {assignments.length === 0 ? (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                No assignments yet. Create your first assignment using the form.
              </Typography>
            ) : (
              <List>
                {assignments.map((assignment) => (
                  <ListItem key={assignment.id} divider>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Assignment fontSize="small" />
                          {assignment.request.topic}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Box display="flex" alignItems="center" gap={1} mt={1}>
                            <Person fontSize="small" />
                            <Typography variant="body2">
                              Trainer: {assignment.trainer.name}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Assigned: {assignment.assignedDate}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={assignment.status}
                      color="success"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Trainer List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Trainers
            </Typography>
            
            <Grid container spacing={2}>
              {trainers.map((trainer) => (
                <Grid item xs={12} sm={6} md={3} key={trainer.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar>{trainer.name[0]}</Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {trainer.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Rating: {trainer.rating}/5
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" gutterBottom>
                        Expertise:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                        {trainer.expertise.map((skill) => (
                          <Chip key={skill} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                      
                      <Chip
                        label={trainer.availability}
                        color={trainer.availability === 'Available' ? 'success' : 'warning'}
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssignTrainer;
