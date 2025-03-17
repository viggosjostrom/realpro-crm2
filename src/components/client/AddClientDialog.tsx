import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: 'buyer',
    notes: ''
  });

  const handleNewClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleClientTypeChange = (e: SelectChangeEvent) => {
    setNewClient(prev => ({ ...prev, type: e.target.value }));
  };

  const handleAddClient = () => {
    // In a real application, this would save the new client
    // For this mockup, we just close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Client</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Enter the details of the new client. This is a mockup, so data will not be saved.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              required
              margin="dense"
              value={newClient.firstName}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              required
              margin="dense"
              value={newClient.lastName}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email Address"
              fullWidth
              margin="dense"
              type="email"
              value={newClient.email}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone Number"
              fullWidth
              margin="dense"
              value={newClient.phone}
              onChange={handleNewClientChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Client Role</InputLabel>
              <Select
                value={newClient.type}
                onChange={handleClientTypeChange}
                label="Client Role"
                name="type"
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="both">Buyer & Seller</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notes"
              fullWidth
              multiline
              rows={3}
              margin="dense"
              value={newClient.notes}
              onChange={handleNewClientChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleAddClient} 
          variant="contained"
          disabled={!newClient.firstName || !newClient.lastName}
        >
          Add Client
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientDialog; 