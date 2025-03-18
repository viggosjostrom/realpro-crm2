'use client';

import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Chip, 
  Card, 
  CardContent, 
  CardMedia, 
  Stack, 
  Button 
} from '@mui/material';
import { mockUsers, mockProperties } from '@/lib/utils/mockData';
import { useRouter, useParams } from 'next/navigation';
import { 
  EmailOutlined as EmailIcon, 
  BusinessOutlined as BusinessIcon, 
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { formatCurrency } from '@/lib/utils/formatters';

export default function ColleagueProfilePage() {
  const router = useRouter();
  const params = useParams();
  const colleagueId = params.id as string;

  // Find colleague data
  const colleague = useMemo(() => {
    return mockUsers.find(user => user.id === colleagueId);
  }, [colleagueId]);

  // Find colleague's properties
  const colleagueProperties = useMemo(() => {
    return mockProperties.filter(property => property.agentId === colleagueId);
  }, [colleagueId]);

  // Stats
  const stats = useMemo(() => {
    return {
      totalProperties: colleagueProperties.length,
      availableProperties: colleagueProperties.filter(p => p.status === 'available').length,
      pendingProperties: colleagueProperties.filter(p => p.status === 'pending').length,
      soldProperties: colleagueProperties.filter(p => p.status === 'sold').length,
    };
  }, [colleagueProperties]);

  // Handler for back button
  const handleBack = () => {
    router.push('/dashboard/office');
  };

  // If colleague not found
  if (!colleague) {
    return (
      <Box>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Office
        </Button>
        <Typography variant="h5">Colleague not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back button */}
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Office
      </Button>

      {/* Colleague Profile Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'grey.100' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar 
              src={colleague.avatar} 
              alt={`${colleague.firstName} ${colleague.lastName}`}
              sx={{ 
                width: 200, 
                height: 200, 
                boxShadow: 3,
                mx: 'auto',
                border: '4px solid white'
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {colleague.firstName} {colleague.lastName}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {colleague.workrole}
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BusinessIcon color="primary" />
                  <Typography variant="body1">
                    Office: {colleague.office}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon color="primary" />
                  <Typography variant="body1">
                    {colleague.email}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            {/* Stats section */}
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                      {stats.totalProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Properties
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
                    <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {stats.availableProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
                    <Typography variant="h5" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      {stats.pendingProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
                    <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold' }}>
                      {stats.soldProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sold
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Colleague's Properties Section */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Properties Handled by {colleague.firstName}
        </Typography>

        {colleagueProperties.length === 0 ? (
          <Typography variant="body1">No properties currently assigned.</Typography>
        ) : (
          <Grid container spacing={3}>
            {colleagueProperties.map(property => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                >
                  <CardMedia
                    component="img"
                    height={160}
                    image={property.images[0]}
                    alt={property.address}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {formatCurrency(property.price)}
                      </Typography>
                      <Chip 
                        label={property.status.charAt(0).toUpperCase() + property.status.slice(1)} 
                        color={
                          property.status === 'available' ? 'success' : 
                          property.status === 'pending' ? 'warning' : 'error'
                        }
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {property.address}, {property.city}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {property.size} m²
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {property.rooms} rooms
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
} 