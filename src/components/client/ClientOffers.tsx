import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  CardMedia,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  HomeWork as PropertyIcon,
  CalendarToday as CalendarIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { Offer, Property, OfferStatus } from '@/lib/types';
import { mockProperties } from '@/lib/utils/mockData';

interface ClientOffersProps {
  clientOffers: Offer[];
  formatDate: (date: Date) => string;
}

// Get offer status color
const getOfferStatusColor = (status: OfferStatus): string => {
  switch (status) {
    case 'submitted':
      return '#3f51b5'; // Indigo
    case 'negotiating':
      return '#ff9800'; // Orange
    case 'accepted':
      return '#4caf50'; // Green
    case 'rejected':
      return '#f44336'; // Red
    case 'withdrawn':
      return '#9e9e9e'; // Grey
    default:
      return '#9e9e9e'; // Grey
  }
};

// Get offer status label
const getOfferStatusLabel = (status: OfferStatus): string => {
  switch (status) {
    case 'submitted':
      return 'Submitted';
    case 'negotiating':
      return 'Negotiating';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    case 'withdrawn':
      return 'Withdrawn';
    default:
      return status;
  }
};

const ClientOffers: React.FC<ClientOffersProps> = ({ clientOffers, formatDate }) => {
  // Get property details for an offer
  const getProperty = (propertyId: string): Property | undefined => {
    return mockProperties.find(property => property.id === propertyId);
  };

  // Format price in SEK
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('sv-SE', { 
      style: 'currency', 
      currency: 'SEK', 
      maximumFractionDigits: 0 
    }).format(price);
  };

  // Calculate percentage compared to asking price
  const calculatePricePercentage = (offerAmount: number, propertyPrice: number): number => {
    return (offerAmount / propertyPrice) * 100;
  };

  if (clientOffers.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1">No offers made by this client yet.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Client Offers ({clientOffers.length})
      </Typography>
      
      <Grid container spacing={3}>
        {clientOffers.map(offer => {
          const property = getProperty(offer.propertyId);
          if (!property) return null;
          
          const pricePercentage = calculatePricePercentage(offer.amount, property.price);
          const isBelowAskingPrice = offer.amount < property.price;
          
          return (
            <Grid item xs={12} md={6} key={offer.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Box sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, objectFit: 'cover' }}
                    image={property.images[0] || '/properties/property-placeholder.jpg'}
                    alt={property.address}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" component="div" fontWeight="bold">
                        {property.address}
                      </Typography>
                      <Chip
                        label={getOfferStatusLabel(offer.status)}
                        size="small"
                        sx={{
                          bgcolor: getOfferStatusColor(offer.status),
                          color: 'white'
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <PropertyIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {property.city} • {property.size} m² • {property.rooms} rooms
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Offered on {formatDate(offer.date)}
                      </Typography>
                    </Box>

                    {offer.expiryDate && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TimerIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Expires {formatDate(offer.expiryDate)}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Box>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Asking price: {formatPrice(property.price)}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Offer: {formatPrice(offer.amount)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title={`${pricePercentage.toFixed(1)}% of asking price`}>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(pricePercentage, 100)}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4, 
                          flexGrow: 1,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: isBelowAskingPrice ? '#ff9800' : '#4caf50'
                          }
                        }}
                      />
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isBelowAskingPrice ? (
                      <>
                        <TrendingDownIcon fontSize="small" sx={{ color: '#ff9800' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {formatPrice(property.price - offer.amount)} below asking price ({(100 - pricePercentage).toFixed(1)}%)
                        </Typography>
                      </>
                    ) : (
                      <>
                        <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {formatPrice(offer.amount - property.price)} above asking price ({(pricePercentage - 100).toFixed(1)}%)
                        </Typography>
                      </>
                    )}
                  </Box>

                  {offer.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                      Note: {offer.notes}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ClientOffers; 