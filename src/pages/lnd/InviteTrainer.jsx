
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
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { Send, Person, Email } from '@mui/icons-material';

const InviteTrainer = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    trainerType: 'internal',
    role: 'Trainer',
    expertise: '',
    message: '',
  });
  
  const [invitations, setInvitations] = useState([
    { id: 1, email: 'john.trainer@company.com', name: 'John Smith', type: 'Internal', status: 'Sent', date: '2024-01-15' },
    { id: 2, email: 'external@training.com', name: 'Sarah Wilson', type: 'External', status: 'Accepted', date: '2024-01-10' },
    { id: 3, email: 'mike@consultant.com', name: 'Mike Johnson', type: 'External', status: 'Pending', date: '2024-01-08' },
  ]);
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newInvitation = {
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      type: formData.trainerType === 'internal' ? 'Internal' : 'External',
      status: 'Sent',
      date: new Date().toISOString().split('T')[0],
    };
    
    setInvitations([newInvitation, ...invitations]);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        email: '',
        name: '',
        trainerType: 'internal',
        role: 'Trainer',
        expertise: '',
        message: '',
      });
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'success';
      case 'Sent': return 'info';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Invite Trainer
      </Typography>

      <Grid container spacing={3}>
        {/* Invitation Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Send Trainer Invitation
              </Typography>
              
              {showSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Trainer invitation sent successfully!
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Trainer Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Trainer Type</FormLabel>
                      <RadioGroup
                        row
                        name="trainerType"
                        value={formData.trainerType}
                        onChange={handleChange}
                      >
                        <FormControlLabel 
                          value="internal" 
                          control={<Radio />} 
                          label="Internal Employee" 
                        />
                        <FormControlLabel 
                          value="external" 
                          control={<Radio />} 
                          label="External Consultant" 
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <MenuItem value="Trainer">Trainer</MenuItem>
                        <MenuItem value="Senior Trainer">Senior Trainer</MenuItem>
                        <MenuItem value="Training Consultant">Training Consultant</MenuItem>
                        <MenuItem value="Subject Matter Expert">Subject Matter Expert</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Areas of Expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder="e.g., React, Python, Data Science"
                      helperText="Comma-separated list of skills"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Personal Message (Optional)"
                      name="message"
                      multiline
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Add a personal message to the invitation..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Send />}
                      size="large"
                    >
                      Send Invitation
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Invitations */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Invitations
            </Typography>
            
            <List>
              {invitations.slice(0, 5).map((invitation) => (
                <ListItem key={invitation.id} divider>
                  <ListItemIcon>
                    {invitation.type === 'Internal' ? <Person /> : <Email />}
                  </ListItemIcon>
                  <ListItemText
                    primary={invitation.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {invitation.email}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                          <Chip
                            label={invitation.status}
                            color={getStatusColor(invitation.status)}
                            size="small"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {invitation.date}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* All Invitations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              All Trainer Invitations
            </Typography>
            
            <List>
              {invitations.map((invitation) => (
                <ListItem key={invitation.id} divider>
                  <ListItemIcon>
                    {invitation.type === 'Internal' ? <Person /> : <Email />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body1" fontWeight="medium">
                          {invitation.name}
                        </Typography>
                        <Chip
                          label={invitation.type}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {invitation.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Sent: {invitation.date}
                        </Typography>
                      </Box>
                    }
                  />
                  <Chip
                    label={invitation.status}
                    color={getStatusColor(invitation.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InviteTrainer;
