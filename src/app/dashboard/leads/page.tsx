'use client';

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip, 
  Divider,
  TextField,
  InputAdornment,
  Button,
  Tab,
  Tabs,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge,
  Stack,
  Card,
  CardContent,
  alpha
} from '@mui/material';
import { 
  Search as SearchIcon, 
  PersonOutline as PersonIcon,
  EventAvailable as EventIcon,
  Home as HomeIcon,
  Assessment as AssessmentIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Add as AddIcon,
  Edit as EditIcon,
  AccessTime as TimeIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { mockLeads, mockProperties, mockUsers } from '@/lib/utils/mockData';
import { Lead, Property } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
      style={{ padding: '16px 0' }}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

// Convert lead type to display format
const formatLeadType = (type: string): string => {
  switch (type) {
    case 'valuation_request': return 'Valuation Request';
    case 'viewing_attendee': return 'Viewing Attendee';
    case 'website_inquiry': return 'Website Inquiry';
    case 'referral_lead': return 'Referral';
    case 'manual_entry': return 'Manual Entry';
    default: return type.replace('_', ' ');
  }
};

// Get icon for lead type
const getLeadTypeIcon = (type: string) => {
  switch (type) {
    case 'valuation_request': return <AssessmentIcon />;
    case 'viewing_attendee': return <EventIcon />;
    case 'website_inquiry': return <ArticleIcon />;
    case 'referral_lead': return <PersonIcon />;
    case 'manual_entry': return <EditIcon />;
    default: return <PersonIcon />;
  }
};

// Get color for lead status
const getStatusColor = (status: string): { color: string, bgColor: string } => {
  switch (status) {
    case 'new':
      return { color: '#1565c0', bgColor: '#e3f2fd' };
    case 'contacted':
      return { color: '#7b1fa2', bgColor: '#f3e5f5' };
    case 'qualified':
      return { color: '#2e7d32', bgColor: '#e8f5e9' };
    case 'proposal':
      return { color: '#ff8f00', bgColor: '#fff8e1' };
    case 'negotiation':
      return { color: '#d84315', bgColor: '#fbe9e7' };
    case 'closed':
      return { color: '#1976d2', bgColor: '#e3f2fd' };
    case 'lost':
      return { color: '#757575', bgColor: '#f5f5f5' };
    default:
      return { color: '#757575', bgColor: '#f5f5f5' };
  }
};

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [tabValue, setTabValue] = useState(0);

  // Sort leads by newest first
  const sortedLeads = useMemo(() => {
    return [...mockLeads].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, []);

  // Apply filters
  const filteredLeads = useMemo(() => {
    return sortedLeads.filter(lead => {
      const nameMatch = 
        (lead.firstName + ' ' + lead.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.phone && lead.phone.includes(searchQuery));
      
      const statusMatch = statusFilter === 'all' || lead.status === statusFilter;
      const typeMatch = typeFilter === 'all' || lead.leadType === typeFilter;
      
      return nameMatch && statusMatch && typeMatch;
    });
  }, [sortedLeads, searchQuery, statusFilter, typeFilter]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Get property details for lead if available
  const getPropertyDetails = (propertyId?: string): Property | undefined => {
    if (!propertyId) return undefined;
    return mockProperties.find(property => property.id === propertyId);
  };

  // Get assigned agent details
  const getAssignedAgent = (agentId?: string) => {
    if (!agentId) return undefined;
    return mockUsers.find(user => user.id === agentId);
  };

  // Format time distance
  const formatTimeDistance = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  // Add new lead action
  const handleAddNewLead = () => {
    // This would open a modal in a real application
    alert('This would open a new lead form in a real application. For showcase purposes, this is just a placeholder.');
  };

  // Progress steps for the progress tracker
  const progressSteps = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed'];
  
  // Get current step index for progress tracker
  const getCurrentStepIndex = (status: string): number => {
    const statusIndex = progressSteps.findIndex(step => step.toLowerCase() === status);
    return statusIndex >= 0 ? statusIndex : 0;
  };

  // Progress tracker component
  const ProgressTracker = ({ status }: { status: string }) => {
    const currentStep = getCurrentStepIndex(status);
    
    return (
      <Box sx={{ width: '100%', my: 3 }}>
        <Stack 
          direction="row" 
          spacing={0} 
          sx={{ 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: '#e0e0e0',
              transform: 'translateY(-50%)',
              zIndex: 0
            }
          }}
        >
          {progressSteps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isActive = index === currentStep;
            
            return (
              <Box 
                key={step} 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: isCompleted ? '#1976d2' : 'white',
                    border: isCompleted ? 'none' : '2px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: isCompleted ? 'white' : '#757575',
                    fontWeight: isActive ? 'bold' : 'normal',
                    mb: 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {index + 1}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: isActive ? '#1976d2' : (isCompleted ? '#1976d2' : '#757575'),
                    fontWeight: isActive ? 'bold' : 'normal'
                  }}
                >
                  {step}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Leads
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your leads and track their progress through the sales pipeline.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddNewLead}
        >
          Add New Lead
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Left side - Leads list */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Search leads..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="contacted">Contacted</MenuItem>
                  <MenuItem value="qualified">Qualified</MenuItem>
                  <MenuItem value="proposal">Proposal</MenuItem>
                  <MenuItem value="negotiation">Negotiation</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
                <InputLabel id="type-filter-label">Lead Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  value={typeFilter}
                  label="Lead Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="valuation_request">Valuation Request</MenuItem>
                  <MenuItem value="viewing_attendee">Viewing Attendee</MenuItem>
                  <MenuItem value="website_inquiry">Website Inquiry</MenuItem>
                  <MenuItem value="referral_lead">Referral</MenuItem>
                  <MenuItem value="manual_entry">Manual Entry</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <List sx={{ 
              maxHeight: 'calc(100vh - 300px)', 
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a1a1a1',
              },
            }}>
              {filteredLeads.length === 0 ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography color="textSecondary">No leads found</Typography>
                </Box>
              ) : (
                filteredLeads.map((lead) => {
                  const { color: statusColor, bgColor: statusBgColor } = getStatusColor(lead.status);
                  const isNew = lead.status === 'new';
                  const isSelected = selectedLead?.id === lead.id;
                  
                  return (
                    <React.Fragment key={lead.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 1,
                          backgroundColor: isSelected ? alpha('#1976d2', 0.08) : 'transparent',
                          '&:hover': {
                            backgroundColor: isSelected ? alpha('#1976d2', 0.12) : alpha('#000', 0.04),
                          },
                          px: 2,
                          py: 1.5,
                          position: 'relative',
                          transition: 'background-color 0.2s ease',
                        }}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <ListItemAvatar>
                          <Badge 
                            invisible={!isNew}
                            color="secondary"
                            variant="dot"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <Avatar sx={{ bgcolor: statusBgColor, color: statusColor }}>
                              {getLeadTypeIcon(lead.leadType)}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography 
                                variant="subtitle1" 
                                fontWeight={isNew ? 'bold' : 'normal'}
                                component="span"
                              >
                                {lead.firstName} {lead.lastName}
                                {isNew && (
                                  <Chip 
                                    label="New" 
                                    size="small" 
                                    sx={{ 
                                      ml: 1, 
                                      height: 20,
                                      backgroundColor: '#1976d2',
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: '0.7rem',
                                    }} 
                                  />
                                )}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {formatTimeDistance(lead.createdAt)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                sx={{ display: 'block' }}
                              >
                                {formatLeadType(lead.leadType)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Chip
                                  label={lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                  size="small"
                                  sx={{
                                    backgroundColor: statusBgColor,
                                    color: statusColor,
                                    fontWeight: 500,
                                    fontSize: '0.7rem',
                                    height: 20,
                                  }}
                                />
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  );
                })
              )}
            </List>
          </Paper>
        </Grid>
        
        {/* Right side - Lead details */}
        <Grid item xs={12} md={8} lg={8}>
          {selectedLead ? (
            <Paper elevation={0} sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    {selectedLead.firstName} {selectedLead.lastName}
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle1">
                    {formatLeadType(selectedLead.leadType)}
                  </Typography>
                </Box>
                <Chip
                  label={selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                  sx={{
                    ...getStatusColor(selectedLead.status),
                    fontWeight: 'bold',
                    px: 1,
                  }}
                />
              </Box>
              
              <Box sx={{ width: '100%', mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="lead detail tabs">
                    <Tab label="Basic Info" />
                    <Tab label="Notes" />
                    <Tab label="Progress" />
                    <Tab label="Activities" />
                  </Tabs>
                </Box>
                
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Contact Information
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography>{selectedLead.email}</Typography>
                          </Box>
                          {selectedLead.phone && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Typography>{selectedLead.phone}</Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Lead Details
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ArticleIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography>Source: {selectedLead.source.charAt(0).toUpperCase() + selectedLead.source.slice(1)}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography>
                              Created: {new Date(selectedLead.createdAt).toLocaleDateString()} ({formatTimeDistance(selectedLead.createdAt)})
                            </Typography>
                          </Box>
                          {selectedLead.lastContactedAt && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Typography>
                                Last contacted: {new Date(selectedLead.lastContactedAt).toLocaleDateString()} ({formatTimeDistance(selectedLead.lastContactedAt)})
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {selectedLead.propertyId && (
                      <Grid item xs={12}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              Connected Property
                            </Typography>
                            {(() => {
                              const property = getPropertyDetails(selectedLead.propertyId);
                              if (!property) return <Typography>Property not found</Typography>;
                              
                              return (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                                  <Typography>
                                    {property.address}, {property.city} - {property.type.charAt(0).toUpperCase() + property.type.slice(1)}, {property.rooms} rooms, {property.size} m²
                                  </Typography>
                                </Box>
                              );
                            })()}
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Assigned Agent
                          </Typography>
                          {(() => {
                            const agent = getAssignedAgent(selectedLead.assignedTo);
                            if (!agent) return <Typography>No agent assigned</Typography>;
                            
                            return (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                  src={agent.avatar} 
                                  alt={`${agent.firstName} ${agent.lastName}`}
                                  sx={{ mr: 2 }}
                                >
                                  {agent.firstName.charAt(0)}{agent.lastName.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography fontWeight="medium">
                                    {agent.firstName} {agent.lastName}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {agent.workrole} - {agent.office}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })()}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Notes
                      </Typography>
                      <Typography paragraph>
                        {selectedLead.notes || 'No notes added yet.'}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />}
                        size="small"
                      >
                        Edit Notes
                      </Button>
                    </CardContent>
                  </Card>
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Lead Progress
                      </Typography>
                      <ProgressTracker status={selectedLead.status} />
                      
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Update Status:
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={selectedLead.status}
                            size="small"
                            // In a real app, this would update the lead status
                          >
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="contacted">Contacted</MenuItem>
                            <MenuItem value="qualified">Qualified</MenuItem>
                            <MenuItem value="proposal">Proposal</MenuItem>
                            <MenuItem value="negotiation">Negotiation</MenuItem>
                            <MenuItem value="closed">Closed</MenuItem>
                            <MenuItem value="lost">Lost</MenuItem>
                          </Select>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                          <Button 
                            variant="contained"
                            size="small"
                          >
                            Update Status
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </TabPanel>
                
                <TabPanel value={tabValue} index={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Activities Timeline
                      </Typography>
                      
                      <Box sx={{ position: 'relative', minHeight: 200, px: 2 }}>
                        <Box sx={{ 
                          position: 'absolute', 
                          left: 0, 
                          top: 0, 
                          bottom: 0, 
                          width: 2, 
                          bgcolor: '#e0e0e0',
                          ml: 1,
                        }} />
                        
                        {/* In a real app, these would be dynamic based on actual activities */}
                        <Box sx={{ position: 'relative', mb: 4, pl: 4 }}>
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              left: 0, 
                              top: 0, 
                              width: 10, 
                              height: 10, 
                              borderRadius: '50%', 
                              bgcolor: 'primary.main',
                              mt: 1.5,
                              ml: -4,
                              zIndex: 1,
                            }} 
                          />
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            Lead Created
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(selectedLead.createdAt).toLocaleString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            New {formatLeadType(selectedLead.leadType).toLowerCase()} lead created.
                          </Typography>
                        </Box>
                        
                        {selectedLead.lastContactedAt && (
                          <Box sx={{ position: 'relative', mb: 4, pl: 4 }}>
                            <Box 
                              sx={{ 
                                position: 'absolute', 
                                left: 0, 
                                top: 0, 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: 'primary.main',
                                mt: 1.5,
                                ml: -4,
                                zIndex: 1,
                              }} 
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              Lead Contacted
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(selectedLead.lastContactedAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Initial contact made with lead.
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ mt: 3 }}>
                          <Button 
                            variant="outlined" 
                            startIcon={<AddIcon />} 
                            size="small"
                          >
                            Add Activity
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </TabPanel>
              </Box>
            </Paper>
          ) : (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: 'calc(100vh - 300px)',
                bgcolor: '#f9fafb',
                border: '1px dashed #bdbdbd',
                borderRadius: 2,
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: '#e3f2fd', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <PersonIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              </Box>
              <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                No Lead Selected
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary">
                Select a lead from the list to view its details
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
} 