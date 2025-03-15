import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Card,
  CardMedia,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  SquareFoot as SizeIcon,
  MeetingRoom as RoomsIcon,
  Apartment as ApartmentIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocalOffer as OfferIcon,
  ArrowForward as ArrowIcon,
  Call as CallIcon,
  Sms as SmsIcon
} from '@mui/icons-material';
import { Property, Client } from '@/lib/types';
import { mockClients, mockOffers, mockActivities } from '@/lib/utils/mockData';

// Helper function to format price in SEK
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price);
};

// Helper function to format date
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

// Helper function to get property type label
const getPropertyTypeLabel = (type: string): string => {
  switch (type) {
    case 'apartment':
      return 'Apartment';
    case 'house':
      return 'House';
    case 'villa':
      return 'Villa';
    case 'townhouse':
      return 'Townhouse';
    case 'cottage':
      return 'Cottage';
    default:
      return type;
  }
};

// Helper function to get property status label
const getPropertyStatusLabel = (status: string): string => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'pending':
      return 'Under Contract';
    case 'sold':
      return 'Sold';
    default:
      return status;
  }
};

// Get property status color as MUI color
const getPropertyStatusColor = (status: string): 'success' | 'warning' | 'error' => {
  switch (status) {
    case 'available':
      return 'success';
    case 'pending':
      return 'warning';
    case 'sold':
      return 'error';
    default:
      return 'warning';
  }
};

// Get offer status color
const getOfferStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' | 'default' => {
  switch (status) {
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    case 'withdrawn':
      return 'error';
    case 'negotiating':
      return 'warning';
    case 'submitted':
      return 'info';
    default:
      return 'default';
  }
};

// Helper function to get client by ID
const getClient = (clientId: string | undefined): Client | undefined => {
  if (!clientId) return undefined;
  return mockClients.find(client => client.id === clientId);
};

interface OverviewProps {
  property: Property;
}

const Overview: React.FC<OverviewProps> = ({ property }) => {
  // Get seller and buyer information
  const seller = getClient(property.ownerId);
  const buyer = getClient(property.buyerId);

  // Get upcoming viewings
  const upcomingViewings = mockActivities
    .filter(activity => 
      activity.propertyId === property.id && 
      activity.type === 'viewing' && 
      activity.status === 'scheduled' && 
      new Date(activity.date) > new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get interested buyers (clients who attended viewings)
  const viewingAttendees = new Set<string>();
  mockActivities
    .filter(activity => 
      activity.propertyId === property.id && 
      activity.type === 'viewing' && 
      activity.status === 'completed' && 
      activity.clientId
    )
    .forEach(activity => {
      if (activity.clientId) viewingAttendees.add(activity.clientId);
    });

  const interestedBuyers = Array.from(viewingAttendees)
    .map(clientId => getClient(clientId))
    .filter(client => client !== undefined) as Client[];

  // Get offers for this property
  const propertyOffers = mockOffers
    .filter(offer => offer.propertyId === property.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa' }}>
      <Grid container spacing={3}>
        {/* Left Column: Property Info, Seller & Buyer, Activity Data */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Basic Property Info */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h5" component="div" gutterBottom fontWeight="600">
                  {property.address}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {property.postalCode} {property.city}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2.5, mt: 2 }}>
                  <Chip 
                    icon={<MoneyIcon />} 
                    label={formatPrice(property.price)}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                  />
                  <Chip 
                    icon={<SizeIcon />} 
                    label={`${property.size} m²`}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                  />
                  <Chip 
                    icon={<RoomsIcon />} 
                    label={`${property.rooms} room${property.rooms > 1 ? 's' : ''}`}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                  />
                  <Chip 
                    icon={<ApartmentIcon />} 
                    label={getPropertyTypeLabel(property.type)}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                  />
                  <Chip 
                    label={getPropertyStatusLabel(property.status)}
                    color={getPropertyStatusColor(property.status)}
                    size="small"
                    sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                  />
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                  Listed: {formatDate(property.listedAt)}
                </Typography>
              </Paper>
            </Grid>

            {/* Seller and Buyer Information */}
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <PersonIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Seller
                </Typography>
                
                {seller ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                      {seller.firstName} {seller.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>{seller.phone}</Typography>
                      <Box>
                        <Tooltip title={`Call ${seller.phone}`} arrow placement="top">
                          <IconButton 
                            size="medium" 
                            sx={{ 
                              color: 'success.main',
                              mr: 0.5,
                              width: 36,
                              height: 36,
                              '&:hover': { 
                                backgroundColor: 'success.lighter',
                              }
                            }}
                          >
                            <CallIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={`Text ${seller.phone}`} arrow placement="top">
                          <IconButton 
                            size="medium" 
                            sx={{ 
                              color: 'info.main',
                              width: 36,
                              height: 36,
                              '&:hover': { 
                                backgroundColor: 'info.lighter',
                              }
                            }}
                          >
                            <SmsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.2 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{seller.email}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">No seller information available</Typography>
                )}
              </Paper>
            </Grid>

            {/* Buyer Information */}
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <PersonIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Buyer
                </Typography>
                
                {property.status === 'sold' && buyer ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                      {buyer.firstName} {buyer.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>{buyer.phone}</Typography>
                      <Box>
                        <Tooltip title={`Call ${buyer.phone}`} arrow placement="top">
                          <IconButton 
                            size="medium" 
                            sx={{ 
                              color: 'success.main',
                              mr: 0.5,
                              width: 36,
                              height: 36,
                              '&:hover': { 
                                backgroundColor: 'success.lighter',
                              }
                            }}
                          >
                            <CallIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={`Text ${buyer.phone}`} arrow placement="top">
                          <IconButton 
                            size="medium" 
                            sx={{ 
                              color: 'info.main',
                              width: 36,
                              height: 36,
                              '&:hover': { 
                                backgroundColor: 'info.lighter',
                              }
                            }}
                          >
                            <SmsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.2 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{buyer.email}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No buyer(s) yet.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Upcoming Viewings */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <CalendarIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Upcoming Viewings
                </Typography>
                
                {upcomingViewings.length > 0 ? (
                  <TableContainer 
                    component={Paper} 
                    variant="outlined" 
                    sx={{ 
                      mt: 2.5, 
                      border: 'none', 
                      boxShadow: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Table size="small" sx={{ '& .MuiTableCell-root': { borderColor: 'rgba(0,0,0,0.06)' } }}>
                      <TableBody>
                        {upcomingViewings.slice(0, 5).map((viewing) => (
                          <TableRow 
                            key={viewing.id} 
                            sx={{ 
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
                              transition: 'background-color 0.2s ease-in-out'
                            }}
                          >
                            <TableCell sx={{ width: '30%', py: 1.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {formatDate(viewing.date)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(viewing.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.5 }}>
                              <Typography variant="body2" fontWeight={500}>
                                {viewing.title}
                              </Typography>
                              {viewing.description && (
                                <Typography variant="caption" color="text.secondary">
                                  {viewing.description}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.5 }}>
                              <Chip 
                                size="small" 
                                label={viewing.status} 
                                color={viewing.status === 'scheduled' ? 'primary' : 'default'} 
                                sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No upcoming viewings scheduled
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Offers */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <OfferIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Recent Offers
                </Typography>
                
                {propertyOffers.length > 0 ? (
                  <TableContainer 
                    component={Paper} 
                    variant="outlined" 
                    sx={{ 
                      mt: 2.5, 
                      border: 'none', 
                      boxShadow: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Table size="small" sx={{ '& .MuiTableCell-root': { borderColor: 'rgba(0,0,0,0.06)' } }}>
                      <TableBody>
                        {propertyOffers.slice(0, 5).map((offer) => {
                          const offerBuyer = getClient(offer.buyerId);
                          return (
                            <TableRow 
                              key={offer.id} 
                              sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
                                transition: 'background-color 0.2s ease-in-out'
                              }}
                            >
                              <TableCell sx={{ width: '40%', py: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {formatPrice(offer.amount)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(offer.date)}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ py: 1.5 }}>
                                {offerBuyer && (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 28, height: 28, mr: 1.5, fontSize: '0.75rem', bgcolor: 'primary.light' }}>
                                      {offerBuyer.firstName.charAt(0)}{offerBuyer.lastName.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={500}>
                                      {offerBuyer.firstName} {offerBuyer.lastName}
                                    </Typography>
                                  </Box>
                                )}
                              </TableCell>
                              <TableCell align="right" sx={{ py: 1.5 }}>
                                <Chip 
                                  size="small" 
                                  label={offer.status.charAt(0).toUpperCase() + offer.status.slice(1)} 
                                  color={getOfferStatusColor(offer.status)} 
                                  sx={{ borderRadius: 1.5, fontWeight: 500, px: 0.5 }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No offers received yet
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Interested Buyers */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                  <PersonIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Interested Buyers
                </Typography>
                
                {interestedBuyers.length > 0 ? (
                  <List dense sx={{ p: 0, mt: 2 }}>
                    <Grid container spacing={2.5}>
                      {interestedBuyers.slice(0, 6).map((buyer) => (
                        <Grid item xs={12} sm={6} key={buyer.id}>
                          <ListItem 
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'rgba(0,0,0,0.08)', 
                              borderRadius: 2,
                              p: 1.5,
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                borderColor: 'primary.light',
                                backgroundColor: 'rgba(0,0,0,0.01)'
                              }
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'primary.light' }}>
                                {buyer.firstName.charAt(0)}{buyer.lastName.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary={`${buyer.firstName} ${buyer.lastName}`} 
                              secondary={buyer.phone}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              sx={{ my: 0 }}
                            />
                            <ListItemSecondaryAction>
                              <Tooltip title="View details">
                                <IconButton 
                                  edge="end" 
                                  size="small" 
                                  sx={{ 
                                    color: 'primary.main',
                                    transition: 'all 0.2s',
                                    '&:hover': { 
                                      backgroundColor: 'primary.lighter', 
                                      transform: 'translateX(2px)' 
                                    } 
                                  }}
                                >
                                  <ArrowIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                    {interestedBuyers.length > 6 && (
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        align="center" 
                        sx={{ mt: 2.5, fontWeight: 500, cursor: 'pointer' }}
                      >
                        + {interestedBuyers.length - 6} more interested buyers
                      </Typography>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No interested buyers recorded
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: Property Image only */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              position: 'sticky', 
              top: 16,
              maxHeight: 'calc(100vh - 32px)',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
              }
            }}
          >
            <CardMedia
              component="img"
              image={property.images[0] || '/placeholder-property.jpg'}
              alt={property.address}
              sx={{ 
                aspectRatio: '1/1',
                width: '100%',
                objectFit: 'cover',
                borderRadius: 2
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
