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
  ArrowForward as ArrowIcon
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
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column: Property Info, Seller & Buyer, Activity Data */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Basic Property Info */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {property.address}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {property.postalCode} {property.city}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    icon={<MoneyIcon />} 
                    label={formatPrice(property.price)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<SizeIcon />} 
                    label={`${property.size} m²`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<RoomsIcon />} 
                    label={`${property.rooms} room${property.rooms > 1 ? 's' : ''}`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    icon={<ApartmentIcon />} 
                    label={getPropertyTypeLabel(property.type)}
                    variant="outlined"
                    size="small"
                  />
                  <Chip 
                    label={getPropertyStatusLabel(property.status)}
                    color={getPropertyStatusColor(property.status)}
                    size="small"
                  />
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                  Listed: {formatDate(property.listedAt)}
                </Typography>
              </Paper>
            </Grid>

            {/* Seller and Buyer Information */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} /> Seller
                </Typography>
                
                {seller ? (
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {seller.firstName} {seller.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{seller.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
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
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} /> Buyer
                </Typography>
                
                {property.status === 'sold' && buyer ? (
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {buyer.firstName} {buyer.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{buyer.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{buyer.email}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No buyer(s) yet.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Upcoming Viewings */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} /> Upcoming Viewings
                </Typography>
                
                {upcomingViewings.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        {upcomingViewings.slice(0, 5).map((viewing) => (
                          <TableRow key={viewing.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ width: '30%' }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {formatDate(viewing.date)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(viewing.date).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {viewing.title}
                              </Typography>
                              {viewing.description && (
                                <Typography variant="caption" color="text.secondary">
                                  {viewing.description}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Chip 
                                size="small" 
                                label={viewing.status} 
                                color={viewing.status === 'scheduled' ? 'primary' : 'default'} 
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No upcoming viewings scheduled
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Offers */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <OfferIcon sx={{ mr: 1, color: 'primary.main' }} /> Recent Offers
                </Typography>
                
                {propertyOffers.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        {propertyOffers.slice(0, 5).map((offer) => {
                          const offerBuyer = getClient(offer.buyerId);
                          return (
                            <TableRow key={offer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell sx={{ width: '40%' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {formatPrice(offer.amount)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(offer.date)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                {offerBuyer && (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                                      {offerBuyer.firstName.charAt(0)}{offerBuyer.lastName.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body2">
                                      {offerBuyer.firstName} {offerBuyer.lastName}
                                    </Typography>
                                  </Box>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <Chip 
                                  size="small" 
                                  label={offer.status.charAt(0).toUpperCase() + offer.status.slice(1)} 
                                  color={getOfferStatusColor(offer.status)} 
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No offers received yet
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Interested Buyers */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} /> Interested Buyers
                </Typography>
                
                {interestedBuyers.length > 0 ? (
                  <List dense sx={{ p: 0 }}>
                    <Grid container spacing={2}>
                      {interestedBuyers.slice(0, 6).map((buyer) => (
                        <Grid item xs={12} sm={6} key={buyer.id}>
                          <ListItem 
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'divider', 
                              borderRadius: 1,
                              p: 1
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar>
                                {buyer.firstName.charAt(0)}{buyer.lastName.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary={`${buyer.firstName} ${buyer.lastName}`} 
                              secondary={buyer.phone}
                            />
                            <ListItemSecondaryAction>
                              <Tooltip title="View details">
                                <IconButton edge="end" size="small">
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
                        color="text.secondary" 
                        align="center" 
                        sx={{ mt: 2 }}
                      >
                        + {interestedBuyers.length - 6} more interested buyers
                      </Typography>
                    )}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
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
            elevation={3} 
            sx={{ 
              position: 'sticky', 
              top: 16,
              maxHeight: 'calc(100vh - 32px)',
              display: 'flex',
              flexDirection: 'column'
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
                borderRadius: 1
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
