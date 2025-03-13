import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Tab,
  Tabs,
  Rating
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Notes as NotesIcon,
  Assignment as AssignmentIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { Property, Client } from '@/lib/types';
import { mockClients, mockActivities } from '@/lib/utils/mockData';

// Helper function to format date
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

// Interest level enumeration
type InterestLevel = 'high' | 'medium' | 'low' | 'unknown';

// Derived types for the component
interface Viewing {
  id: string;
  propertyId: string;
  date: Date;
  title: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendees: string[]; // Array of client IDs
}

interface InterestedBuyer {
  clientId: string;
  propertyId: string;
  interestLevel: InterestLevel;
  notes?: string;
  lastContact?: Date;
}

interface FollowUp {
  id: string;
  clientId: string;
  propertyId: string;
  date: Date;
  type: 'call' | 'email' | 'meeting';
  title: string;
  description?: string;
  completed: boolean;
}

// Component props
interface ViewingsAndFollowupsProps {
  property: Property;
}

// Main component
const ViewingsAndFollowups: React.FC<ViewingsAndFollowupsProps> = ({ property }) => {
  // State for managing tabs
  const [tabValue, setTabValue] = useState(0);

  // State for dialogs
  const [addViewingDialogOpen, setAddViewingDialogOpen] = useState(false);
  const [addFollowUpDialogOpen, setAddFollowUpDialogOpen] = useState(false);
  const [viewingNotesDialogOpen, setViewingNotesDialogOpen] = useState(false);
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Process activities to get viewings
  const viewings: Viewing[] = mockActivities
    .filter(activity => activity.type === 'viewing' && activity.propertyId === property.id)
    .map(activity => ({
      id: activity.id,
      propertyId: activity.propertyId || '',
      date: activity.date,
      title: activity.title,
      description: activity.description,
      status: activity.completed ? 'completed' : 'scheduled',
      // Extract client IDs from the description or defaulting to empty array
      // In real app, this would be properly structured in the data
      attendees: activity.clientId ? [activity.clientId] : []
    }));

  // Process activities to get follow-ups
  const followUps: FollowUp[] = mockActivities
    .filter(activity => 
      (activity.type === 'call' || activity.type === 'email' || activity.type === 'meeting') && 
      activity.propertyId === property.id
    )
    .map(activity => ({
      id: activity.id,
      clientId: activity.clientId || '',
      propertyId: activity.propertyId || '',
      date: activity.date,
      type: activity.type as 'call' | 'email' | 'meeting',
      title: activity.title,
      description: activity.description,
      completed: activity.completed
    }));

  // Create derived interested buyers data based on viewing attendance
  // In a real app, this would be properly structured in the database
  const interestedBuyers: InterestedBuyer[] = Array.from(
    new Set(
      viewings
        .filter(viewing => viewing.status === 'completed')
        .flatMap(viewing => viewing.attendees)
    )
  ).map((clientId, index) => {
    // Create mock interest levels - in a real app this would come from the database
    const interestLevels: InterestLevel[] = ['high', 'medium', 'low'];
    const interestLevel = interestLevels[index % interestLevels.length];
    
    // Find the most recent activity with this client for this property
    const clientActivities = mockActivities.filter(
      a => a.clientId === clientId && a.propertyId === property.id
    );
    const lastActivity = clientActivities.length > 0 
      ? clientActivities.reduce((latest, current) => 
          latest.date > current.date ? latest : current
        )
      : null;

    return {
      clientId,
      propertyId: property.id,
      interestLevel,
      notes: `Attended a viewing of the property. ${interestLevel === 'high' ? 'Showed strong interest.' : 
              interestLevel === 'medium' ? 'Had some questions about the property.' : 
              'May need more convincing.'}`,
      lastContact: lastActivity?.date
    };
  });

  // Calculate statistics for property
  const completedViewings = viewings.filter(v => v.status === 'completed').length;
  const uniqueAttendees = new Set(
    viewings
      .filter(v => v.status === 'completed')
      .flatMap(v => v.attendees)
  ).size;
  const conversionRate = uniqueAttendees > 0 
    ? ((interestedBuyers.filter(b => b.interestLevel === 'high').length / uniqueAttendees) * 100).toFixed(0)
    : '0';

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Dialog handlers
  const handleOpenAddViewingDialog = () => {
    setAddViewingDialogOpen(true);
  };

  const handleCloseAddViewingDialog = () => {
    setAddViewingDialogOpen(false);
  };

  const handleOpenAddFollowUpDialog = (client: Client) => {
    setSelectedClient(client);
    setAddFollowUpDialogOpen(true);
  };

  const handleCloseAddFollowUpDialog = () => {
    setAddFollowUpDialogOpen(false);
    setSelectedClient(null);
  };

  const handleOpenViewingNotesDialog = (viewing: Viewing) => {
    setSelectedViewing(viewing);
    setViewingNotesDialogOpen(true);
  };

  const handleCloseViewingNotesDialog = () => {
    setViewingNotesDialogOpen(false);
    setSelectedViewing(null);
  };

  // Render interest level as chips with appropriate colors
  const renderInterestLevel = (level: InterestLevel) => {
    let color: 'error' | 'warning' | 'success' | 'default' = 'default';
    let label = 'Unknown';

    switch (level) {
      case 'high':
        color = 'success';
        label = 'High';
        break;
      case 'medium':
        color = 'warning';
        label = 'Medium';
        break;
      case 'low':
        color = 'error';
        label = 'Low';
        break;
    }

    return <Chip color={color} label={label} size="small" />;
  };

  // Get client name by ID
  const getClientName = (clientId: string): string => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
  };

  // Get client by ID
  const getClient = (clientId: string): Client | undefined => {
    return mockClients.find(c => c.id === clientId);
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      borderRadius: 2,
      background: 'linear-gradient(to bottom, #f9fafc, #ffffff)',
      border: '1px solid #eaecef' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 600,
            color: '#1a365d',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: 40,
              height: 3,
              backgroundColor: 'primary.main',
              borderRadius: 1
            }
          }}
        >
          Viewings & Follow-ups
        </Typography>
        
        {/* Show Schedule button for available properties, and show buyer information for sold properties */}
        {property.status === 'sold' ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end'
          }}>
            <Chip 
              label="SOLD" 
              color="success" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 1,
                borderRadius: 1,
                paddingX: 1,
                fontSize: '0.85rem',
                letterSpacing: 0.5
              }} 
            />
            {property.buyerId && (
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Buyer: {getClientName(property.buyerId)}
              </Typography>
            )}
            {property.soldAt && (
              <Typography variant="body2" color="text.secondary">
                Sold on: {formatDate(property.soldAt)}
              </Typography>
            )}
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddViewingDialog}
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            Schedule Viewing
          </Button>
        )}
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            } 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="subtitle2" gutterBottom sx={{ 
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontWeight: 600,
                fontSize: '0.75rem'
              }}>
                Completed Viewings
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {completedViewings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            } 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="subtitle2" gutterBottom sx={{ 
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontWeight: 600,
                fontSize: '0.75rem'
              }}>
                Unique Visitors
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'info.main' }}>
                {uniqueAttendees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            } 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="subtitle2" gutterBottom sx={{ 
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontWeight: 600,
                fontSize: '0.75rem'
              }}>
                Interested Buyers
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'success.main' }}>
                {interestedBuyers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            } 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography color="textSecondary" variant="subtitle2" gutterBottom sx={{ 
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontWeight: 600,
                fontSize: '0.75rem'
              }}>
                Conversion Rate
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {conversionRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for organizing content */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        mb: 2
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="viewings tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              minHeight: 48,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 1.5
            }
          }}
        >
          <Tab label="Upcoming Viewings" icon={<CalendarIcon />} iconPosition="start" />
          <Tab label="Past Viewings" icon={<AssignmentIcon />} iconPosition="start" />
          <Tab label="Interested Buyers" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Follow-ups" icon={<NotesIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Upcoming Viewings Tab */}
      <Box hidden={tabValue !== 0} sx={{ mt: 3 }}>
        {viewings.filter(v => v.status === 'scheduled').length > 0 ? (
          <TableContainer component={Paper} sx={{ 
            borderRadius: 2, 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Attendees</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewings
                  .filter(viewing => viewing.status === 'scheduled')
                  .map(viewing => (
                    <TableRow key={viewing.id} sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.01)' 
                      } 
                    }}>
                      <TableCell>{formatDate(viewing.date)}</TableCell>
                      <TableCell>{viewing.title}</TableCell>
                      <TableCell>
                        {viewing.attendees.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {viewing.attendees.map(attendeeId => (
                              <Chip
                                key={attendeeId}
                                avatar={<Avatar sx={{ bgcolor: 'primary.light' }}><PersonIcon fontSize="small" /></Avatar>}
                                label={getClientName(attendeeId)}
                                size="small"
                                sx={{ 
                                  m: 0.5, 
                                  borderRadius: 1,
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="textSecondary">No attendees specified</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip label="Scheduled" color="primary" size="small" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Add Notes">
                          <IconButton size="small" onClick={() => handleOpenViewingNotesDialog(viewing)}>
                            <NotesIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mark as Completed">
                          <IconButton size="small">
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Viewing">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel Viewing">
                          <IconButton size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="textSecondary">
              No upcoming viewings scheduled
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddViewingDialog}
              sx={{ mt: 2 }}
            >
              Schedule Viewing
            </Button>
          </Box>
        )}
      </Box>

      {/* Past Viewings Tab */}
      <Box hidden={tabValue !== 1} sx={{ mt: 3 }}>
        {viewings.filter(v => v.status === 'completed').length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Attendees</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewings
                  .filter(viewing => viewing.status === 'completed')
                  .map(viewing => (
                    <TableRow key={viewing.id}>
                      <TableCell>{formatDate(viewing.date)}</TableCell>
                      <TableCell>{viewing.title}</TableCell>
                      <TableCell>
                        {viewing.attendees.length > 0 ? (
                          viewing.attendees.map(attendeeId => (
                            <Chip
                              key={attendeeId}
                              avatar={<Avatar><PersonIcon /></Avatar>}
                              label={getClientName(attendeeId)}
                              size="small"
                              sx={{ m: 0.5 }}
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">No attendees specified</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {viewing.description ? (
                          <Tooltip title={viewing.description}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                maxWidth: 200, 
                                textOverflow: 'ellipsis', 
                                overflow: 'hidden', 
                                whiteSpace: 'nowrap' 
                              }}
                            >
                              {viewing.description}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="body2" color="textSecondary">No notes</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View/Edit Notes">
                          <IconButton size="small" onClick={() => handleOpenViewingNotesDialog(viewing)}>
                            <NotesIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="textSecondary">
              No past viewings found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Interested Buyers Tab */}
      <Box hidden={tabValue !== 2} sx={{ mt: 3 }}>
        {interestedBuyers.length > 0 ? (
          <Grid container spacing={3}>
            {interestedBuyers.map(buyer => {
              const client = getClient(buyer.clientId);
              if (!client) return null;
              
              return (
                <Grid item xs={12} md={6} lg={4} key={buyer.clientId}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                    }
                  }}>
                    <CardContent sx={{ p: 3, flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              mr: 2, 
                              bgcolor: 'primary.light',
                              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' 
                            }}
                          >
                            {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {client.firstName} {client.lastName}
                          </Typography>
                        </Box>
                        {renderInterestLevel(buyer.interestLevel)}
                      </Box>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.email}</Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.phone}</Typography>
                      </Box>
                      
                      {buyer.lastContact && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">Last contact: {formatDate(buyer.lastContact)}</Typography>
                        </Box>
                      )}
                      
                      {buyer.notes && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="textSecondary">Notes:</Typography>
                          <Typography variant="body2">{buyer.notes}</Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={<NotesIcon />}
                          onClick={() => handleOpenAddFollowUpDialog(client)}
                          sx={{ mr: 1 }}
                        >
                          Add Follow-up
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          startIcon={<PhoneIcon />}
                        >
                          Contact
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="textSecondary">
              No interested buyers found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Follow-ups Tab */}
      <Box hidden={tabValue !== 3} sx={{ mt: 3 }}>
        {followUps.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Title/Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {followUps.map(followUp => {
                  const client = getClient(followUp.clientId);
                  
                  return (
                    <TableRow key={followUp.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 1, width: 30, height: 30 }}>
                            {client ? client.firstName.charAt(0) : 'U'}
                          </Avatar>
                          <Typography variant="body2">
                            {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={followUp.type.charAt(0).toUpperCase() + followUp.type.slice(1)} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(followUp.date)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{followUp.title}</Typography>
                        {followUp.description && (
                          <Tooltip title={followUp.description}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                maxWidth: 200, 
                                textOverflow: 'ellipsis', 
                                overflow: 'hidden', 
                                whiteSpace: 'nowrap' 
                              }}
                            >
                              {followUp.description}
                            </Typography>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={followUp.completed ? "Completed" : "Pending"} 
                          color={followUp.completed ? "success" : "warning"}
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        {!followUp.completed && (
                          <Tooltip title="Mark as Completed">
                            <IconButton size="small">
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="textSecondary">
              No follow-ups scheduled
            </Typography>
          </Box>
        )}
      </Box>

      {/* Add Viewing Dialog */}
      <Dialog 
        open={addViewingDialogOpen} 
        onClose={handleCloseAddViewingDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <DialogTitle sx={{ 
          paddingBottom: 1, 
          fontWeight: 600,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          Schedule New Viewing
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue="13:00"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue="14:30"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                defaultValue={`Viewing of ${property.address}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                placeholder="Add any notes for the viewing"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddViewingDialog}>Cancel</Button>
          <Button variant="contained">Schedule Viewing</Button>
        </DialogActions>
      </Dialog>

      {/* Add Follow-up Dialog */}
      <Dialog 
        open={addFollowUpDialogOpen} 
        onClose={handleCloseAddFollowUpDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <DialogTitle sx={{ 
          paddingBottom: 1, 
          fontWeight: 600,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          Add Follow-up for {selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : ''}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                label="Follow-up Type"
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                defaultValue={selectedClient ? `Follow-up with ${selectedClient.firstName} ${selectedClient.lastName}` : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                placeholder="Add notes about the follow-up"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddFollowUpDialog}>Cancel</Button>
          <Button variant="contained">Add Follow-up</Button>
        </DialogActions>
      </Dialog>

      {/* Viewing Notes Dialog */}
      <Dialog open={viewingNotesDialogOpen} onClose={handleCloseViewingNotesDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Viewing Notes</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Date: {selectedViewing ? formatDate(selectedViewing.date) : ''}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Title: {selectedViewing ? selectedViewing.title : ''}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                Status: {selectedViewing ? selectedViewing.status.charAt(0).toUpperCase() + selectedViewing.status.slice(1) : ''}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                multiline
                rows={4}
                fullWidth
                defaultValue={selectedViewing?.description || ''}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Rate Interest Level for Attendees</Typography>
              {selectedViewing?.attendees.map(attendeeId => {
                const client = getClient(attendeeId);
                if (!client) return null;
                
                return (
                  <Box key={attendeeId} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography sx={{ minWidth: 150 }}>
                      {client.firstName} {client.lastName}:
                    </Typography>
                    <Rating />
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewingNotesDialog}>Cancel</Button>
          <Button variant="contained">Save Notes</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ViewingsAndFollowups;
