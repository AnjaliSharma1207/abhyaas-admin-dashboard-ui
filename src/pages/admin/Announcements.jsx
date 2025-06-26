
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
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Add, MoreVert, Edit, Delete, Visibility } from '@mui/icons-material';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Training Portal Features',
      content: 'We are excited to announce new features in our training portal including enhanced reporting and better mobile support.',
      author: 'Admin',
      date: '2024-01-15',
      priority: 'High',
      status: 'Published',
      views: 45,
    },
    {
      id: 2,
      title: 'Upcoming React Workshop',
      content: 'Join us for an intensive React workshop scheduled for next month. Limited seats available.',
      author: 'L&D Team',
      date: '2024-01-10',
      priority: 'Medium',
      status: 'Published',
      views: 23,
    },
    {
      id: 3,
      title: 'System Maintenance Notice',
      content: 'The training system will be down for maintenance this weekend from 10 PM to 6 AM.',
      author: 'IT Team',
      date: '2024-01-08',
      priority: 'High',
      status: 'Draft',
      views: 0,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnnouncementId, setMenuAnnouncementId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    status: 'Draft',
  });

  const handleOpen = (announcement = null) => {
    setSelectedAnnouncement(announcement);
    setFormData(announcement || {
      title: '',
      content: '',
      priority: 'Medium',
      status: 'Draft',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnnouncement(null);
    setFormData({
      title: '',
      content: '',
      priority: 'Medium',
      status: 'Draft',
    });
  };

  const handleSave = () => {
    const newAnnouncement = {
      ...formData,
      id: selectedAnnouncement ? selectedAnnouncement.id : Date.now(),
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      views: selectedAnnouncement ? selectedAnnouncement.views : 0,
    };

    if (selectedAnnouncement) {
      setAnnouncements(announcements.map(ann => 
        ann.id === selectedAnnouncement.id ? newAnnouncement : ann
      ));
    } else {
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    handleClose();
  };

  const handleMenuOpen = (event, announcementId) => {
    setAnchorEl(event.currentTarget);
    setMenuAnnouncementId(announcementId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuAnnouncementId(null);
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    handleMenuClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Published' ? 'success' : 'default';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Announcements</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Create Announcement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {announcements.map((announcement) => (
          <Grid item xs={12} md={6} lg={4} key={announcement.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="div">
                    {announcement.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, announcement.id)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {announcement.content.substring(0, 100)}
                  {announcement.content.length > 100 && '...'}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip 
                    label={announcement.priority} 
                    color={getPriorityColor(announcement.priority)} 
                    size="small" 
                  />
                  <Chip 
                    label={announcement.status} 
                    color={getStatusColor(announcement.status)} 
                    size="small" 
                  />
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    By {announcement.author} • {announcement.date}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Visibility fontSize="small" />
                    <Typography variant="caption">
                      {announcement.views}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          const announcement = announcements.find(a => a.id === menuAnnouncementId);
          handleOpen(announcement);
        }}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(menuAnnouncementId)}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              margin="normal"
              required
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedAnnouncement ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Announcements;
