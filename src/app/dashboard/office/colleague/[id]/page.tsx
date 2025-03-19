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
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { mockUsers, mockProperties } from '@/lib/utils/mockData';
import { useRouter, useParams } from 'next/navigation';
import { 
  EmailOutlined as EmailIcon, 
  BusinessOutlined as BusinessIcon, 
  ArrowBack as ArrowBackIcon,
  PhoneOutlined as PhoneIcon
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
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #f7f9fc 0%, #ffffff 100%)',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: theme => `0 0 20px ${theme.palette.grey[200]}`
        }}
      >
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                src={colleague.avatar} 
                alt={`${colleague.firstName} ${colleague.lastName}`}
                sx={{ 
                  width: 220, 
                  height: 220, 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  mx: 'auto',
                  border: '6px solid rgba(255, 255, 255, 0.9)',
                  bgcolor: 'grey.100'
                }}
              />
              <Box sx={{ 
                mt: 2, 
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {colleague.firstName} {colleague.lastName}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 500,
                    mb: 2
                  }}
                >
                  {colleague.workrole}
                </Typography>
                <Stack 
                  direction="row" 
                  spacing={1} 
                  alignItems="center" 
                  justifyContent="center"
                  sx={{
                    background: theme => `linear-gradient(45deg, ${theme.palette.primary.light}15, ${theme.palette.primary.main}10)`,
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'primary.light',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <BusinessIcon color="primary" sx={{ fontSize: '1.1rem' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                    {colleague.office} Office
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  letterSpacing: 0.5
                }}
              >
                Contact Information
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3}
                sx={{
                  background: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: '1px solid',
                  borderColor: 'grey.100'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <IconButton
                    sx={{ 
                      background: theme => `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}15)`,
                      '&:hover': { 
                        background: theme => `linear-gradient(45deg, ${theme.palette.primary.light}30, ${theme.palette.primary.main}25)`,
                      }
                    }}
                    onClick={() => {}}
                  >
                    <Tooltip title={`Call ${colleague.phone}`} arrow>
                      <PhoneIcon sx={{ color: 'primary.main' }} />
                    </Tooltip>
                  </IconButton>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{colleague.phone}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                  <IconButton
                    sx={{ 
                      background: theme => `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}15)`,
                      '&:hover': { 
                        background: theme => `linear-gradient(45deg, ${theme.palette.primary.light}30, ${theme.palette.primary.main}25)`,
                      }
                    }}
                    onClick={() => {}}
                  >
                    <Tooltip title={`Email ${colleague.email}`} arrow>
                      <EmailIcon sx={{ color: 'primary.main' }} />
                    </Tooltip>
                  </IconButton>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{colleague.email}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  letterSpacing: 0.5
                }}
              >
                Portfolio Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      background: 'white',
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border: '1px solid',
                      borderColor: 'grey.100'
                    }}
                  >
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {stats.totalProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Total Properties
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      background: 'white',
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border: '1px solid',
                      borderColor: 'grey.100'
                    }}
                  >
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {stats.availableProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Available
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      background: 'white',
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border: '1px solid',
                      borderColor: 'grey.100'
                    }}
                  >
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {stats.pendingProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Pending
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      background: 'white',
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      border: '1px solid',
                      borderColor: 'grey.100'
                    }}
                  >
                    <Typography variant="h4" color="error.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {stats.soldProperties}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
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
          <Grid container spacing={2}>
            {colleagueProperties.map(property => (
              <Grid item xs={12} sm={6} md={2.4} key={property.id}>
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
                  <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                    <CardMedia
                      component="img"
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      image={property.images[0]}
                      alt={property.address}
                    />
                  </Box>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography variant="h6" component="div" sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}>
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
                    <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
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