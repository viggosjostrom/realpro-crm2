import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  Home as HomeIcon,
  DateRange as DateIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { Activity, Property } from '@/lib/types';
import { mockProperties } from '@/lib/utils/mockData';
import { useRouter } from 'next/navigation';

interface ClientViewingsProps {
  clientViewings: Activity[];
  formatDate: (date: Date) => string;
}

const ClientViewings: React.FC<ClientViewingsProps> = ({ clientViewings, formatDate }) => {
  const router = useRouter();
  
  // Filter only viewing activities
  const viewings = clientViewings.filter(activity => activity.type === 'viewing');

  // Get property details for a viewing
  const getProperty = (propertyId: string | undefined): Property | undefined => {
    if (!propertyId) return undefined;
    return mockProperties.find(property => property.id === propertyId);
  };

  // Format time from date
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle click on viewing card
  const handleViewingCardClick = (propertyId: string | undefined) => {
    if (propertyId) {
      // Navigate to property page with tab index 3 (Viewings & Follow-ups)
      router.push(`/dashboard/properties/${propertyId}?tab=3`);
    }
  };

  if (viewings.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1">No viewings recorded for this client yet.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Viewing History ({viewings.length})
      </Typography>
      
      <Grid container spacing={3}>
        {viewings.map(viewing => {
          const property = getProperty(viewing.propertyId);
          
          return (
            <Grid item xs={12} md={6} key={viewing.id}>
              <Card 
                sx={{ 
                  display: 'flex', 
                  height: '100%', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleViewingCardClick(viewing.propertyId)}
              >
                {property && (
                  <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: 'cover' }}
                    image={property.images[0] || '/properties/property-placeholder.jpg'}
                    alt={property.address}
                  />
                )}
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="subtitle1" component="div" fontWeight="bold">
                    {viewing.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 0.5 }}>
                    <DateIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {formatDate(viewing.date)}
                    </Typography>
                    
                    <TimeIcon fontSize="small" sx={{ ml: 2, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {formatTime(viewing.date)}
                    </Typography>
                  </Box>
                  
                  {property && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <HomeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {property.address}, {property.city}
                      </Typography>
                    </Box>
                  )}
                  
                  <Typography variant="body2" color="text.secondary">
                    {viewing.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ClientViewings; 