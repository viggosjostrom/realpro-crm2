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
  alpha
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
  Notes as NotesIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Call as CallIcon,
  Sms as SmsIcon
} from '@mui/icons-material';
import { Property, Client } from '@/lib/types';
import { mockClients } from '@/lib/utils/mockData';

// Helper function to format date
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

// Helper function to get client type color
const getClientTypeColor = (type: string): string => {
  switch (type) {
    case 'buyer':
      return '#2196F3'; // Blue
    case 'seller':
      return '#4CAF50'; // Green
    case 'both':
      return '#9C27B0'; // Purple
    default:
      return '#9E9E9E'; // Grey
  }
};

// Helper function to get client type label
const getClientTypeLabel = (type: string): string => {
  switch (type) {
    case 'buyer':
      return 'Buyer';
    case 'seller':
      return 'Seller';
    case 'both':
      return 'Buyer & Seller';
    default:
      return type;
  }
};

interface SellersAndBuyersProps {
  property: Property;
}

interface Note {
  id: string;
  text: string;
  date: Date;
  clientId: string;
}

const SellersAndBuyers: React.FC<SellersAndBuyersProps> = ({ property }) => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [noteText, setNoteText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for sellers and buyers
  const sellers = mockClients.filter(client => 
    (client.type === 'seller' || client.type === 'both') && 
    (property.ownerId === client.id)
  );
  
  // Get the actual buyer if exists
  const buyer = property.buyerId ? mockClients.find(client => client.id === property.buyerId) : null;
  
  // Mock interested buyers (in a real app, this would come from a database)
  const interestedBuyers = mockClients.filter(client => 
    client.type === 'buyer' || client.type === 'both'
  );

  // Mock notes (in a real app, this would come from a database)
  const mockNotes: Note[] = [
    {
      id: '1',
      text: 'Initial meeting to discuss selling the property. Owner is motivated to sell quickly due to relocation.',
      date: new Date('2023-02-15'),
      clientId: '2'
    },
    {
      id: '2',
      text: 'Showed the property to Anders. He seemed very interested in the balcony and view.',
      date: new Date('2023-03-05'),
      clientId: '1'
    },
    {
      id: '3',
      text: 'Follow-up call with Maria about the listing price. She agreed to the suggested price.',
      date: new Date('2023-02-20'),
      clientId: '2'
    },
    {
      id: '4',
      text: 'Erik visited the property for the second time. Particularly interested in the kitchen renovation.',
      date: new Date('2023-03-10'),
      clientId: '3'
    }
  ];

  // Filter clients based on search term
  const filteredBuyers = interestedBuyers.filter(client => 
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenNoteDialog = (client: Client) => {
    setSelectedClient(client);
    setNoteText('');
    setOpenNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
    setSelectedClient(null);
  };

  const handleAddNote = () => {
    // In a real app, this would add the note to the database
    console.log('Adding note:', noteText, 'for client:', selectedClient?.id);
    handleCloseNoteDialog();
  };

  const getClientNotes = (clientId: string) => {
    return mockNotes.filter(note => note.clientId === clientId);
  };

  return (
    <Card 
      sx={{ 
        bgcolor: '#f5f7fa',
        boxShadow: 1,
        borderRadius: 2,
        p: 3,
        mb: 3 
      }}
    >
      <Box sx={{ 
        '& .detail-card': {
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 5,
          },
          mb: 3,
          background: (theme) => alpha(theme.palette.background.paper, 0.98),
        },
        '& .card-header': {
          p: 2,
          pb: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '& .content-area': {
          p: 2,
        },
      }}>
        <Card className="detail-card">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'medium',
                fontSize: '0.95rem'
              },
              px: 2,
              pt: 1
            }}
          >
            <Tab label="Sellers" />
            <Tab label="Buyers" />
            <Tab label="Interested Buyers" />
          </Tabs>
          
          <Box className="content-area">
            {/* Sellers Tab */}
            {tabValue === 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Property Sellers
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                  >
                    Add Seller
                  </Button>
                </Box>
                
                {sellers.length > 0 ? (
                  <Grid container spacing={3}>
                    {sellers.map(seller => (
                      <Grid item xs={12} key={seller.id}>
                        <Card sx={{ 
                          boxShadow: 2, 
                          borderRadius: 2,
                          transition: 'box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            boxShadow: 4,
                          }
                        }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: getClientTypeColor(seller.type), mr: 2 }}>
                                  {seller.firstName.charAt(0)}{seller.lastName.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6">
                                    {seller.firstName} {seller.lastName}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                    <Chip 
                                      label={getClientTypeLabel(seller.type)} 
                                      size="small" 
                                      sx={{ 
                                        bgcolor: getClientTypeColor(seller.type), 
                                        color: 'white',
                                        mr: 1
                                      }} 
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                      <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                                      Listed: {formatDate(property.listedAt)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Box>
                                <Tooltip title="View Profile">
                                  <IconButton size="small" sx={{ mr: 1 }}>
                                    <LinkIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton size="small" sx={{ mr: 1 }}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove">
                                  <IconButton size="small" color="error">
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Contact Information
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2">{seller.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2">{seller.phone || 'No phone number'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                  <LocationIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2">
                                    {seller.address || 'No address'}<br />
                                    {seller.postalCode} {seller.city}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                  <Tooltip title={`Call ${seller.phone || 'N/A'}`} arrow placement="top">
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<CallIcon />}
                                      sx={{ 
                                        color: 'success.main', 
                                        borderColor: 'success.main',
                                        '&:hover': { 
                                          backgroundColor: 'success.lighter', 
                                          borderColor: 'success.main' 
                                        }
                                      }}
                                    >
                                      Call
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title={`Text ${seller.phone || 'N/A'}`} arrow placement="top">
                                    <Button 
                                      variant="outlined" 
                                      size="small" 
                                      startIcon={<SmsIcon />}
                                      sx={{ 
                                        color: 'info.main', 
                                        borderColor: 'info.main',
                                        '&:hover': { 
                                          backgroundColor: 'info.lighter', 
                                          borderColor: 'info.main' 
                                        }
                                      }}
                                    >
                                      Text
                                    </Button>
                                  </Tooltip>
                                  <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<EmailIcon />}
                                  >
                                    Email
                                  </Button>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="subtitle2">
                                    Notes & Communication
                                  </Typography>
                                  <Button 
                                    size="small" 
                                    startIcon={<AddIcon />}
                                    onClick={() => handleOpenNoteDialog(seller)}
                                  >
                                    Add Note
                                  </Button>
                                </Box>
                                
                                {getClientNotes(seller.id).length > 0 ? (
                                  <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                                    {getClientNotes(seller.id).map(note => (
                                      <Box key={note.id} sx={{ mb: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                          {formatDate(note.date)}
                                        </Typography>
                                        <Typography variant="body2">
                                          {note.text}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                ) : (
                                  <Typography variant="body2" color="text.secondary">
                                    No notes available
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                              <Button 
                                variant="outlined" 
                                size="small" 
                                startIcon={<EventIcon />}
                              >
                                Schedule Meeting
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Card sx={{ 
                    boxShadow: 2, 
                    borderRadius: 2,
                    p: 3, 
                    textAlign: 'center' 
                  }}>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      No sellers associated with this property yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleOpenAddDialog}
                    >
                      Add Seller
                    </Button>
                  </Card>
                )}
              </>
            )}
            
            {/* Buyers Tab */}
            {tabValue === 1 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Property Buyer{buyer && property.status === 'sold' ? '' : 's'}
                    </Typography>
                    {property.status === 'sold' && (
                      <Chip 
                        label="SOLD" 
                        color="success"
                        size="small"
                        sx={{ ml: 2, fontWeight: 'bold' }}
                      />
                    )}
                  </Box>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                  >
                    Add Buyer
                  </Button>
                </Box>
                
                {property.status === 'sold' && buyer ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card sx={{ 
                        boxShadow: 2, 
                        borderRadius: 2,
                        transition: 'box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: 4,
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: getClientTypeColor(buyer.type), mr: 2 }}>
                                {buyer.firstName.charAt(0)}{buyer.lastName.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="h6">
                                  {buyer.firstName} {buyer.lastName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <Chip 
                                    label={getClientTypeLabel(buyer.type)} 
                                    size="small" 
                                    sx={{ 
                                      bgcolor: getClientTypeColor(buyer.type), 
                                      color: 'white',
                                      mr: 1
                                    }} 
                                  />
                                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarIcon fontSize="small" sx={{ mr: 0.5 }} />
                                    Purchased: {formatDate(property.soldAt)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Tooltip title="View Profile">
                                <IconButton size="small" sx={{ mr: 1 }}>
                                  <LinkIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" sx={{ mr: 1 }}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Contact Information
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">{buyer.email}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">{buyer.phone || 'No phone number'}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                <LocationIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {buyer.address || 'No address'}<br />
                                  {buyer.postalCode} {buyer.city}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Tooltip title={`Call ${buyer.phone || 'N/A'}`} arrow placement="top">
                                  <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<CallIcon />}
                                    sx={{ 
                                      color: 'success.main', 
                                      borderColor: 'success.main',
                                      '&:hover': { 
                                        backgroundColor: 'success.lighter', 
                                        borderColor: 'success.main' 
                                      }
                                    }}
                                  >
                                    Call
                                  </Button>
                                </Tooltip>
                                <Tooltip title={`Text ${buyer.phone || 'N/A'}`} arrow placement="top">
                                  <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<SmsIcon />}
                                    sx={{ 
                                      color: 'info.main', 
                                      borderColor: 'info.main',
                                      '&:hover': { 
                                        backgroundColor: 'info.lighter', 
                                        borderColor: 'info.main' 
                                      }
                                    }}
                                  >
                                    Text
                                  </Button>
                                </Tooltip>
                                <Button 
                                  variant="outlined" 
                                  size="small" 
                                  startIcon={<EmailIcon />}
                                >
                                  Email
                                </Button>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle2">
                                  Notes & Communication
                                </Typography>
                                <Button 
                                  size="small" 
                                  startIcon={<AddIcon />}
                                  onClick={() => handleOpenNoteDialog(buyer)}
                                >
                                  Add Note
                                </Button>
                              </Box>
                              
                              {getClientNotes(buyer.id).length > 0 ? (
                                <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                                  {getClientNotes(buyer.id).map(note => (
                                    <Box key={note.id} sx={{ mb: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                        {formatDate(note.date)}
                                      </Typography>
                                      <Typography variant="body2">
                                        {note.text}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No notes available
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              startIcon={<EventIcon />}
                            >
                              Schedule Meeting
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ) : (
                  <Card sx={{ 
                    boxShadow: 2, 
                    borderRadius: 2,
                    p: 3, 
                    textAlign: 'center' 
                  }}>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {property.status === 'sold' 
                        ? 'Property is marked as sold but no buyer information is available.'
                        : 'This property has not been sold yet. When the property is sold, the buyer information will appear here.'}
                    </Typography>
                    {property.status !== 'sold' && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        You can view potential buyers in the &quot;Interested Buyers&quot; tab.
                      </Typography>
                    )}
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleOpenAddDialog}
                    >
                      Add Buyer
                    </Button>
                  </Card>
                )}
              </>
            )}
            
            {/* Interested Buyers Tab */}
            {tabValue === 2 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Interested Buyers
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      size="small"
                      placeholder="Search buyers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                      sx={{ width: 250 }}
                    />
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      onClick={handleOpenAddDialog}
                    >
                      Add Buyer
                    </Button>
                  </Box>
                </Box>
                
                <Card sx={{ 
                  boxShadow: 2, 
                  borderRadius: 2, 
                  overflow: 'hidden'
                }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Buyer</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Interest Level</TableCell>
                          <TableCell>Last Contacted</TableCell>
                          <TableCell>Notes</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBuyers.map(buyer => {
                          // Mock interest level (in a real app, this would come from a database)
                          const interestLevel = ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)];
                          const interestColor = interestLevel === 'High' ? 'success' : interestLevel === 'Medium' ? 'warning' : 'error';
                          
                          // Mock last contacted date (in a real app, this would come from a database)
                          const lastContactedDays = Math.floor(Math.random() * 30);
                          const lastContacted = new Date();
                          lastContacted.setDate(lastContacted.getDate() - lastContactedDays);
                          
                          return (
                            <TableRow key={buyer.id}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar sx={{ bgcolor: getClientTypeColor(buyer.type), mr: 2, width: 32, height: 32 }}>
                                    {buyer.firstName.charAt(0)}{buyer.lastName.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                      {buyer.firstName} {buyer.lastName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {buyer.city || 'No location'}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                                    {buyer.email}
                                  </Typography>
                                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PhoneIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                                    {buyer.phone || 'No phone'}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={interestLevel} 
                                  size="small"
                                  color={interestColor}
                                  sx={{ fontWeight: 'medium' }}
                                />
                              </TableCell>
                              <TableCell>
                                {formatDate(lastContacted)}
                                <Typography variant="caption" display="block" color="text.secondary">
                                  {lastContactedDays === 0 ? 'Today' : `${lastContactedDays} days ago`}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Tooltip title="View Notes">
                                  <IconButton size="small" onClick={() => handleOpenNoteDialog(buyer)}>
                                    <NotesIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                {getClientNotes(buyer.id).length > 0 && (
                                  <Chip 
                                    label={getClientNotes(buyer.id).length} 
                                    size="small" 
                                    sx={{ 
                                      ml: 1, 
                                      height: 20, 
                                      fontSize: '0.7rem', 
                                      bgcolor: 'primary.light', 
                                      color: 'white' 
                                    }} 
                                  />
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title="Call">
                                  <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                    <CallIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Email">
                                  <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                    <EmailIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Schedule Viewing">
                                  <IconButton size="small" color="primary">
                                    <EventIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {filteredBuyers.length === 0 && (
                  <Card sx={{ 
                    boxShadow: 2, 
                    borderRadius: 2,
                    p: 3, 
                    textAlign: 'center',
                    mt: 2
                  }}>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      No buyers found matching your search criteria.
                    </Typography>
                  </Card>
                )}
              </>
            )}
          </Box>
        </Card>
      </Box>

      {/* Add Client Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {tabValue === 0 ? 'Add Seller' : 'Add Buyer'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                size="small"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseAddDialog}>
            {tabValue === 0 ? 'Add Seller' : 'Add Buyer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={openNoteDialog} onClose={handleCloseNoteDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Note for {selectedClient?.firstName} {selectedClient?.lastName}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Note"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoteDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddNote}
            disabled={!noteText.trim()}
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SellersAndBuyers; 