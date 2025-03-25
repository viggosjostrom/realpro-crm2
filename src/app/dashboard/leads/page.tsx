'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
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
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Badge,
  Stack,
  Card,
  CardContent,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
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
  Article as ArticleIcon,
  LocalOffer as TagIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Sms as MessageIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { mockLeads, mockProperties, mockUsers } from '@/lib/utils/mockData';
import { Lead, Property } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

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

// The main leads component wrapped with Suspense
function LeadsContent() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Add New Lead Modal state
  const [openAddLeadModal, setOpenAddLeadModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  // Form state (for demonstration only)
  const [newLeadForm, setNewLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: 'website',
    leadType: 'website_inquiry',
    budget: '',
    notes: '',
  });

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

  // Effect to handle leadId from query params
  useEffect(() => {
    const leadId = searchParams.get('leadId');
    if (leadId) {
      const lead = mockLeads.find(lead => lead.id === leadId);
      if (lead) {
        setSelectedLead(lead);
      }
    }
  }, [searchParams]);

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
    setOpenAddLeadModal(true);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setOpenAddLeadModal(false);
    setActiveStep(0);
    // Reset form (in real app)
    setNewLeadForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      source: 'website',
      leadType: 'website_inquiry',
      budget: '',
      notes: '',
    });
  };
  
  // Handle next step in stepper
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  // Handle back step in stepper
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would save the lead
    alert('In a real app, this would save the new lead to the database. For this showcase, we\'ll just close the modal.');
    handleCloseModal();
  };
  
  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const name = e.target.name as string;
    const value = e.target.value;
    setNewLeadForm({
      ...newLeadForm,
      [name]: value,
    });
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

  // Handle property navigation
  const handleViewProperty = (propertyId: string) => {
    router.push(`/dashboard/properties/${propertyId}`);
  };

  // Return the component JSX
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
      
      {/* Add New Lead Modal */}
      <Dialog 
        open={openAddLeadModal} 
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add New Lead
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            <Step>
              <StepLabel>Basic Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Lead Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Additional Information</StepLabel>
            </Step>
          </Stepper>
          
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={newLeadForm.firstName}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={newLeadForm.lastName}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={newLeadForm.email}
                  onChange={handleFormChange}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={newLeadForm.phone}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
          )}
          
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="source-label">Lead Source</InputLabel>
                  <Select
                    labelId="source-label"
                    name="source"
                    value={newLeadForm.source}
                    label="Lead Source"
                    onChange={handleFormChange}
                  >
                    <MenuItem value="website">Website</MenuItem>
                    <MenuItem value="referral">Referral</MenuItem>
                    <MenuItem value="social">Social Media</MenuItem>
                    <MenuItem value="event">Event</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="leadType-label">Lead Type</InputLabel>
                  <Select
                    labelId="leadType-label"
                    name="leadType"
                    value={newLeadForm.leadType}
                    label="Lead Type"
                    onChange={handleFormChange}
                  >
                    <MenuItem value="valuation_request">Valuation Request</MenuItem>
                    <MenuItem value="viewing_attendee">Viewing Attendee</MenuItem>
                    <MenuItem value="website_inquiry">Website Inquiry</MenuItem>
                    <MenuItem value="referral_lead">Referral</MenuItem>
                    <MenuItem value="manual_entry">Manual Entry</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="budget"
                  label="Budget (SEK)"
                  type="number"
                  value={newLeadForm.budget}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">kr</InputAdornment>,
                  }}
                  helperText="Approximate budget range"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: 1, border: '1px dashed #bdbdbd' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Tip:</strong> Adding an accurate budget helps match leads with suitable properties.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Notes"
                  value={newLeadForm.notes}
                  onChange={handleFormChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  placeholder="Enter any additional information about this lead..."
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-label">Initial Status</InputLabel>
                  <Select
                    labelId="status-label"
                    label="Initial Status"
                    defaultValue="new"
                    disabled
                  >
                    <MenuItem value="new">New</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" color="text.secondary">
                  All new leads start with &quot;New&quot; status. You can update this later.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="assign-agent-label">Assign Agent</InputLabel>
                  <Select
                    labelId="assign-agent-label"
                    label="Assign Agent"
                    defaultValue=""
                  >
                    <MenuItem value="">
                      <em>Select an agent (optional)</em>
                    </MenuItem>
                    {mockUsers.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} - {user.workrole}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          <Box>
            <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
              Cancel
            </Button>
            {activeStep < 2 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} startIcon={<AddIcon />}>
                Create Lead
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      
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
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Box>
                                <Typography 
                                  variant="subtitle1" 
                                  fontWeight={isNew ? 'bold' : 'normal'}
                                  component="span"
                                >
                                  {lead.firstName} {lead.lastName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <Typography
                                    component="div"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {formatLeadType(lead.leadType)}
                                  </Typography>
                                  {lead.score && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                                      <TrendingUpIcon sx={{ fontSize: 16, color: lead.score >= 80 ? 'success.main' : lead.score >= 60 ? 'warning.main' : 'error.main' }} />
                                      <Typography component="div" variant="caption" sx={{ color: lead.score >= 80 ? 'success.main' : lead.score >= 60 ? 'warning.main' : 'error.main' }}>
                                        {lead.score}
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
                            </Box>
                          }
                          secondaryTypographyProps={{ component: 'div' }}
                          secondary={
                            <>
                              {lead.budget && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                  <MoneyIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                  <Typography component="div" variant="caption" color="primary">
                                    {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(lead.budget)}
                                  </Typography>
                                </Box>
                              )}
                              
                              {lead.tags && lead.tags.length > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mb: 0.5 }}>
                                  <TagIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                  {lead.tags.map((tag, index) => (
                                    <Chip
                                      key={index}
                                      label={tag}
                                      size="small"
                                      sx={{
                                        backgroundColor: alpha('#1976d2', 0.1),
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        fontSize: '0.7rem',
                                        height: 20,
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                {lead.followUpDate ? (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EventIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography component="div" variant="caption" color="text.secondary">
                                      Follow-up: {formatTimeDistance(lead.followUpDate)}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography component="div" variant="caption" color="text.secondary">
                                      Created: {formatTimeDistance(lead.createdAt)}
                                    </Typography>
                                  </Box>
                                )}
                                
                                {lead.lastContactedAt && (
                                  <Typography component="div" variant="caption" color="text.secondary">
                                    Last contacted: {formatTimeDistance(lead.lastContactedAt)}
                                  </Typography>
                                )}
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
                <Box>
                  <Chip
                    label={selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                    sx={{
                      ...getStatusColor(selectedLead.status),
                      fontWeight: 'bold',
                      px: 1,
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ width: '100%', mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="lead detail tabs">
                    <Tab label="Basic Info" />
                    <Tab label="Notes" />
                    <Tab label="Activities" />
                  </Tabs>
                </Box>
                
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Contact Information
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography component="div">{selectedLead.email}</Typography>
                          </Box>
                          {selectedLead.phone && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Typography component="div">{selectedLead.phone}</Typography>
                            </Box>
                          )}
                          
                          <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                            {selectedLead.phone && (
                              <>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<PhoneIcon />}
                                  sx={{ borderRadius: 1 }}
                                  href={`tel:${selectedLead.phone}`}
                                >
                                  Call
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<MessageIcon />}
                                  sx={{ borderRadius: 1 }}
                                  href={`sms:${selectedLead.phone}`}
                                >
                                  Text
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EmailIcon />}
                              sx={{ borderRadius: 1 }}
                              href={`mailto:${selectedLead.email}`}
                            >
                              Email
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
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
                            <Typography component="div" variant="caption">
                              Created: {new Date(selectedLead.createdAt).toLocaleDateString()} ({formatTimeDistance(selectedLead.createdAt)})
                            </Typography>
                          </Box>
                          {selectedLead.lastContactedAt && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Typography component="div" variant="caption">
                                Last contacted: {new Date(selectedLead.lastContactedAt).toLocaleDateString()} ({formatTimeDistance(selectedLead.lastContactedAt)})
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Lead Score and Budget */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Lead Score & Budget
                          </Typography>
                          {selectedLead.score && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <TrendingUpIcon sx={{ mr: 1, color: selectedLead.score >= 80 ? 'success.main' : selectedLead.score >= 60 ? 'warning.main' : 'error.main' }} />
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                                <Typography>Lead Score:</Typography>
                                <Box 
                                  sx={{ 
                                    width: '100%', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <Box
                                    sx={{
                                      flex: 1,
                                      height: 10,
                                      bgcolor: 'grey.200',
                                      borderRadius: 5,
                                      position: 'relative',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: `${selectedLead.score}%`,
                                        bgcolor: selectedLead.score >= 80 ? 'success.main' : selectedLead.score >= 60 ? 'warning.main' : 'error.main',
                                        borderRadius: 5,
                                      }}
                                    />
                                  </Box>
                                  <Typography component="div" fontWeight="bold">{selectedLead.score}</Typography>
                                </Box>
                              </Box>
                            </Box>
                          )}
                          {selectedLead.budget && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography component="div">Budget:</Typography>
                                <Typography component="div" fontWeight="medium">
                                  {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(selectedLead.budget)}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Follow-up Date */}
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Follow-up Information
                          </Typography>
                          {selectedLead.followUpDate ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                              <Box>
                                <Typography>Follow-up scheduled for:</Typography>
                                <Typography fontWeight="medium">
                                  {new Date(selectedLead.followUpDate).toLocaleString('sv-SE', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </Typography>
                                <Typography component="div" variant="caption" color="textSecondary">
                                  {formatTimeDistance(selectedLead.followUpDate)}
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography color="text.secondary">No follow-up scheduled</Typography>
                            </Box>
                          )}
                          <Box sx={{ mt: 2 }}>
                            <Button 
                              variant="outlined" 
                              startIcon={<EventIcon />}
                              size="small"
                            >
                              {selectedLead.followUpDate ? 'Update Follow-up' : 'Schedule Follow-up'}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    {/* Lead Progress and Tags Row */}
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {/* Lead Progress */}
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined" sx={{ height: '100%' }}>
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
                        </Grid>
                        
                        {/* Tags */}
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Tags
                              </Typography>
                              {selectedLead.tags && selectedLead.tags.length > 0 ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {selectedLead.tags.map((tag, index) => (
                                    <Chip
                                      key={index}
                                      label={tag}
                                      sx={{
                                        bgcolor: alpha('#1976d2', 0.1),
                                        color: 'primary.main',
                                      }}
                                    />
                                  ))}
                                </Box>
                              ) : (
                                <Typography color="text.secondary">No tags added yet</Typography>
                              )}
                              <Box sx={{ mt: 3 }}>
                                <Button 
                                  variant="outlined"
                                  size="small"
                                  startIcon={<TagIcon />}
                                >
                                  Manage Tags
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
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
                                <>
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <Box
                                      component="img"
                                      src={property.images && property.images.length > 0 ? property.images[0] : '/placeholder-property.jpg'}
                                      alt={property.address}
                                      sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        mr: 2,
                                        border: '1px solid',
                                        borderColor: 'divider'
                                      }}
                                    />
                                    <Box>
                                      <Typography fontWeight="medium">
                                        {property.address}, {property.city}
                                      </Typography>
                                      <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}, {property.size} m², {property.rooms} rooms
                                      </Typography>
                                      <Typography component="div" variant="body2" fontWeight="medium" sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                        <MoneyIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
                                        {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(property.price)}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box sx={{ pl: 0 }}>
                                    <Typography component="div" variant="body2" gutterBottom>
                                      <strong>Status:</strong> {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                      <Button 
                                        size="small" 
                                        variant="outlined" 
                                        startIcon={<HomeIcon />}
                                        onClick={() => handleViewProperty(property.id)}
                                      >
                                        View Property
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
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
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <PhoneIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography component="div" variant="body2" color="text.secondary">{agent.phone}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography component="div" variant="body2" color="text.secondary">{agent.email}</Typography>
                                  </Box>
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
                      <Box 
                        sx={{ 
                          p: 2, 
                          border: '1px solid #e0e0e0', 
                          borderRadius: 1, 
                          bgcolor: '#fafafa',
                          mb: 3,
                          minHeight: 120,
                        }}
                      >
                        <Typography paragraph>
                          {selectedLead.notes || 'No notes added yet.'}
                        </Typography>
                      </Box>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Add or Edit Notes:
                      </Typography>
                      <TextField
                        multiline
                        rows={4}
                        fullWidth
                        defaultValue={selectedLead.notes || ''}
                        placeholder="Enter notes about this lead..."
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                      <Button 
                        variant="contained" 
                        startIcon={<EditIcon />}
                        size="small"
                      >
                        Save Notes
                      </Button>
                    </CardContent>
                  </Card>
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
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
                        
                        {/* Display activities if they exist */}
                        {selectedLead.activities && selectedLead.activities.length > 0 ? (
                          selectedLead.activities.map((activity) => {
                            const activityIcon = () => {
                              switch (activity.type) {
                                case 'call': return <PhoneIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                                case 'email': return <EmailIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                                case 'meeting': return <EventIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                                case 'viewing': return <HomeIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                                case 'status_change': return <AssessmentIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                                default: return <ArticleIcon sx={{ fontSize: 16, color: '#1976d2' }} />;
                              }
                            };
                            
                            return (
                              <Box key={activity.id} sx={{ position: 'relative', mb: 4, pl: 4 }}>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {activityIcon()}
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {activity.type.replace('_', ' ')}
                                  </Typography>
                                </Box>
                                <Typography component="div" variant="body2" color="textSecondary">
                                  {new Date(activity.createdAt).toLocaleString()}
                                </Typography>
                                <Typography component="div" variant="body2" sx={{ mt: 1 }}>
                                  {activity.description}
                                </Typography>
                              </Box>
                            );
                          })
                        ) : (
                          // Fallback activities if none exist in the lead data
                          <>
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
                              <Typography component="div" variant="body2" color="textSecondary">
                                {new Date(selectedLead.createdAt).toLocaleString()}
                              </Typography>
                              <Typography component="div" variant="body2" sx={{ mt: 1 }}>
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
                                <Typography component="div" variant="body2" color="textSecondary">
                                  {new Date(selectedLead.lastContactedAt).toLocaleString()}
                                </Typography>
                                <Typography component="div" variant="body2" sx={{ mt: 1 }}>
                                  Initial contact made with lead.
                                </Typography>
                              </Box>
                            )}
                          </>
                        )}
                        
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                          <Button 
                            variant="outlined" 
                            startIcon={<AddIcon />} 
                            size="small"
                          >
                            Add Activity
                          </Button>
                          <Button 
                            variant="outlined" 
                            startIcon={<EventIcon />} 
                            size="small"
                          >
                            Schedule Meeting
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

// Loading fallback component
function LeadsLoading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );
}

// Wrapper component with Suspense
export default function LeadsPage() {
  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadsContent />
    </Suspense>
  );
} 