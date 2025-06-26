
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Visibility, MergeType, FilterList } from '@mui/icons-material';

const TrainingRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      topic: 'React Development',
      requester: 'John Doe',
      date: '2024-01-15',
      priority: 'High',
      status: 'Pending',
      participants: 8,
      objective: 'Learn React hooks and state management',
    },
    {
      id: 2,
      topic: 'Python Programming',
      requester: 'Jane Smith',
      date: '2024-01-14',
      priority: 'Medium',
      status: 'Approved',
      participants: 12,
      objective: 'Basic Python programming for beginners',
    },
    {
      id: 3,
      topic: 'React Development',
      requester: 'Bob Johnson',
      date: '2024-01-13',
      priority: 'Medium',
      status: 'Pending',
      participants: 6,
      objective: 'Advanced React patterns and performance',
    },
  ]);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    topic: '',
    status: '',
  });

  const [viewDialog, setViewDialog] = useState({ open: false, request: null });
  const [mergeDialog, setMergeDialog] = useState({ open: false, requests: [] });

  const handleViewRequest = (request) => {
    setViewDialog({ open: true, request });
  };

  const handleMergeRequests = () => {
    const similarRequests = requests.filter(req => 
      req.topic === 'React Development' && req.status === 'Pending'
    );
    setMergeDialog({ open: true, requests: similarRequests });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Approved': return 'info';
      case 'Completed': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const filteredRequests = requests.filter(request => {
    return (
      (!filters.topic || request.topic.toLowerCase().includes(filters.topic.toLowerCase())) &&
      (!filters.status || request.status === filters.status) &&
      (!filters.dateFrom || request.date >= filters.dateFrom) &&
      (!filters.dateTo || request.date <= filters.dateTo)
    );
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Training Requests</Typography>
        <Button
          variant="contained"
          startIcon={<MergeType />}
          onClick={handleMergeRequests}
          color="secondary"
        >
          Merge Similar Requests
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <FilterList sx={{ mr: 1 }} />
          Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date From"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date To"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Topic"
              value={filters.topic}
              onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Requests Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
              <TableCell>Requester</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.topic}</TableCell>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <Chip
                    label={request.priority}
                    color={getPriorityColor(request.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{request.participants}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewRequest(request)} color="primary">
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Request Dialog */}
      <Dialog
        open={viewDialog.open}
        onClose={() => setViewDialog({ open: false, request: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Training Request Details</DialogTitle>
        <DialogContent>
          {viewDialog.request && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {viewDialog.request.topic}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Requester:</strong> {viewDialog.request.requester}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong> {viewDialog.request.date}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Priority:</strong> {viewDialog.request.priority}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Expected Participants:</strong> {viewDialog.request.participants}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Objective:</strong>
              </Typography>
              <Typography variant="body2">
                {viewDialog.request.objective}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog({ open: false, request: null })}>
            Close
          </Button>
          <Button variant="contained" color="success">
            Approve
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Merge Requests Dialog */}
      <Dialog
        open={mergeDialog.open}
        onClose={() => setMergeDialog({ open: false, requests: [] })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Merge Similar Requests</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Found {mergeDialog.requests.length} similar requests for "React Development":
          </Typography>
          {mergeDialog.requests.map((request) => (
            <Box key={request.id} sx={{ p: 1, border: 1, borderColor: 'grey.300', mb: 1 }}>
              <Typography variant="body2">
                <strong>{request.requester}</strong> - {request.participants} participants
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.objective}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMergeDialog({ open: false, requests: [] })}>
            Cancel
          </Button>
          <Button variant="contained">
            Merge Selected
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TrainingRequests;
