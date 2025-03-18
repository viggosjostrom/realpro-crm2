import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  NoteAlt as NotesIcon,
  Today as TodayIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Client, Property, Activity } from '@/lib/types';
import { getClientTypeColor } from './ClientCard';
import { mockOffers } from '@/lib/utils/mockData';

interface ClientInfoProps {
  client: Client;
  clientProperties: Property[];
  clientActivities: Activity[];
  formatDate: (date: Date) => string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ 
  client, 
  clientProperties, 
  clientActivities, 
  formatDate 
}) => {
  // State for note dialog
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  
  // Get viewing activities
  const clientViewings = clientActivities.filter(activity => activity.type === 'viewing');
  
  // Get client offers
  const clientOffers = mockOffers.filter(offer => offer.buyerId === client.id);
  
  // Handle email click
  const handleEmailClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(`Email action for: ${client.email}`);
  };
  
  // Handle phone click
  const handlePhoneClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(`Call action for: ${client.phone}`);
  };
  
  // Handle open note dialog
  const handleOpenNoteDialog = () => {
    setNewNote('');
    setNoteDialogOpen(true);
  };
  
  // Handle close note dialog
  const handleCloseNoteDialog = () => {
    setNoteDialogOpen(false);
  };
  
  // Handle add note
  const handleAddNote = () => {
    // Just for showcase, we don't actually add the note
    console.log('Note would be added:', newNote);
    handleCloseNoteDialog();
  };
  
  return (
    <Paper sx={{ mb: 3, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: getClientTypeColor(client.type), 
                width: 64, 
                height: 64, 
                mr: 2,
                color: 'white'
              }}
            >
              {client.firstName[0]}{client.lastName[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {client.firstName} {client.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Client since {formatDate(client.createdAt)}
              </Typography>
            </Box>
          </Box>
          
          <List>
            <ListItem>
              <Tooltip title={`Send email to ${client.email}`} placement="top">
                <ListItemIcon sx={{ cursor: 'pointer' }}>
                  <IconButton color="primary" size="small" onClick={handleEmailClick}>
                    <EmailIcon />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
              <ListItemText 
                primary="Email" 
                secondary={client.email}
              />
            </ListItem>
            <ListItem>
              <Tooltip title={`Call ${client.phone}`} placement="top">
                <ListItemIcon sx={{ cursor: 'pointer' }}>
                  <IconButton color="primary" size="small" onClick={handlePhoneClick}>
                    <PhoneIcon />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
              <ListItemText 
                primary="Phone" 
                secondary={client.phone}
              />
            </ListItem>
            {client.address && (
              <ListItem>
                <ListItemIcon>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Address" 
                  secondary={`${client.address}, ${client.city || ''} ${client.postalCode || ''}`}
                />
              </ListItem>
            )}
          </List>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>Client Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <HomeIcon color="primary" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientProperties.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Properties
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <TodayIcon color="secondary" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientViewings.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Viewings
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <ReceiptIcon color="info" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientOffers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Offers
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <TaskIcon color="warning" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientActivities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activities
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <NotesIcon sx={{ mr: 1 }} />
                Notes
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<AddIcon />}
                onClick={handleOpenNoteDialog}
              >
                Add Note
              </Button>
            </Box>
            {client.notes ? (
              <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                <Typography variant="body2">
                  {client.notes}
                </Typography>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ p: 2, mt: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No notes yet. Click &quot;Add Note&quot; to create one.
                </Typography>
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
      
      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onClose={handleCloseNoteDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Note for {client.firstName} {client.lastName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter notes about this client..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNote} color="primary" variant="contained">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ClientInfo; 