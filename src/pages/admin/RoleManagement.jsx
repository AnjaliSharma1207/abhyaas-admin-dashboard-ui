
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access',
      permissions: {
        userManagement: true,
        courseManagement: true,
        reportAccess: true,
        systemSettings: true,
        trainingRequests: true,
      },
      userCount: 3,
    },
    {
      id: 2,
      name: 'Employee',
      description: 'Basic employee access',
      permissions: {
        userManagement: false,
        courseManagement: false,
        reportAccess: false,
        systemSettings: false,
        trainingRequests: true,
      },
      userCount: 245,
    },
    {
      id: 3,
      name: 'Trainer',
      description: 'Training management access',
      permissions: {
        userManagement: false,
        courseManagement: true,
        reportAccess: true,
        systemSettings: false,
        trainingRequests: true,
      },
      userCount: 12,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      userManagement: false,
      courseManagement: false,
      reportAccess: false,
      systemSettings: false,
      trainingRequests: false,
    },
  });

  const permissionLabels = {
    userManagement: 'User Management',
    courseManagement: 'Course Management',
    reportAccess: 'Report Access',
    systemSettings: 'System Settings',
    trainingRequests: 'Training Requests',
  };

  const handleOpen = (role = null) => {
    setSelectedRole(role);
    setFormData(role || {
      name: '',
      description: '',
      permissions: {
        userManagement: false,
        courseManagement: false,
        reportAccess: false,
        systemSettings: false,
        trainingRequests: false,
      },
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRole(null);
  };

  const handlePermissionChange = (permission, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  const handleSave = () => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id ? { ...formData, id: selectedRole.id, userCount: selectedRole.userCount } : role
      ));
    } else {
      setRoles([...roles, { ...formData, id: Date.now(), userCount: 0 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Role Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Role
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} md={6} lg={4} key={role.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{role.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {role.userCount} users
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {role.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Permissions:
                </Typography>
                
                <List dense>
                  {Object.entries(role.permissions).map(([key, value]) => (
                    <ListItem key={key} sx={{ px: 0 }}>
                      <ListItemText
                        primary={permissionLabels[key]}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                      <Switch
                        checked={value}
                        size="small"
                        disabled
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(role)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Add New Role'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Role Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Permissions
            </Typography>
            
            {Object.entries(permissionLabels).map(([key, label]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={formData.permissions[key]}
                    onChange={(e) => handlePermissionChange(key, e.target.checked)}
                  />
                }
                label={label}
                sx={{ display: 'block', mb: 1 }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedRole ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
