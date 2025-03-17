import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Task as TaskIcon,
  NoteAlt as NotesIcon 
} from '@mui/icons-material';
import { Client, Property, Activity } from '@/lib/types';
import { getClientTypeColor } from './ClientCard';

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
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary={client.email}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
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
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <HomeIcon color="primary" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientProperties.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Properties
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <TaskIcon color="primary" fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {clientActivities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activities
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          {client.notes && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <NotesIcon sx={{ mr: 1 }} />
                Notes
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                <Typography variant="body2">
                  {client.notes}
                </Typography>
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ClientInfo; 