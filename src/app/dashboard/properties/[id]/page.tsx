'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button, 
  Chip, 
  Avatar, 
  Breadcrumbs,
  Link as MuiLink,
  Skeleton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { mockProperties, mockUsers } from '@/lib/utils/mockData';
import { Property, User } from '@/lib/types';
import Overview from '@/components/property/Overview';
import PropertyDetails from '@/components/property/PropertyDetails';
import SellersAndBuyers from '@/components/property/SellersAndBuyers';
import ViewingsAndFollowups from '@/components/property/ViewingsAndFollowups';
import OffersAndTransactions from '@/components/property/OffersAndTransactions';
import DocumentsAndContracts from '@/components/property/DocumentsAndContracts';
import Marketing from '@/components/property/Marketing';

// Helper function to format price in SEK
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price);
};

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'available':
      return '#4CAF50'; // Green
    case 'pending':
      return '#FF9800'; // Orange
    case 'sold':
      return '#F44336'; // Red
    default:
      return '#9E9E9E'; // Grey
  }
};

// Helper function to get status label
const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'available':
      return 'For Sale';
    case 'pending':
      return 'Pending';
    case 'sold':
      return 'Sold';
    default:
      return status;
  }
};

// Helper function to get agent by ID
const getAgentById = (agentId: string | undefined): User | undefined => {
  if (!agentId) return undefined;
  return mockUsers.find(user => user.id === agentId);
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    // Simulate API call to fetch property details
    const fetchProperty = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProperty = mockProperties.find(p => p.id === propertyId);
        setProperty(foundProperty || null);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    
    fetchProperty();
  }, [propertyId]);
  
  // Check for tab parameter in URL and set the tab value
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam) {
      const tabIndex = parseInt(tabParam, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 6) {
        setTabValue(tabIndex);
      }
    }
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const agent = property?.agentId ? getAgentById(property.agentId) : undefined;
  
  return (
    <Box>
      {/* Breadcrumbs navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink 
          underline="hover" 
          color="inherit" 
          component="button"
          onClick={() => router.push('/dashboard')}
          sx={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Dashboard
        </MuiLink>
        <MuiLink 
          underline="hover" 
          color="inherit" 
          component="button"
          onClick={() => router.push('/dashboard/properties')}
          sx={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          Properties
        </MuiLink>
        <Typography color="text.primary">
          {loading ? <Skeleton width={100} /> : property?.address || 'Property Details'}
        </Typography>
      </Breadcrumbs>
      
      {/* Back button */}
      <Box sx={{ mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          sx={{ textTransform: 'none' }}
          onClick={() => router.push('/dashboard/properties')}
        >
          Back to Properties
        </Button>
      </Box>
      
      {loading ? (
        <PropertyDetailsSkeleton />
      ) : property ? (
        <>
          {/* Header Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {property.address}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {property.city}, {property.postalCode}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<EditIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Edit Property
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Add Buyer
                </Button>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formatPrice(property.price)}
                </Typography>
                
                <Chip
                  label={getStatusLabel(property.status)}
                  size="medium"
                  sx={{
                    backgroundColor: getStatusColor(property.status),
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                
                {agent && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={agent.avatar} 
                      alt={`${agent.firstName} ${agent.lastName}`}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Typography variant="body2">
                      {agent.firstName} {agent.lastName}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          
          {/* Tabs Navigation */}
          <Paper sx={{ mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'medium',
                  fontSize: '0.95rem',
                  minWidth: 120
                }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Property Details" />
              <Tab label="Sellers & Buyers" />
              <Tab label="Viewings & Follow-ups" />
              <Tab label="Offers & Transactions" />
              <Tab label="Documents & Contracts" />
              <Tab label="Marketing" />
            </Tabs>
            
            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Overview property={property} />
              )}
              {tabValue === 1 && (
                <PropertyDetails property={property} />
              )}
              {tabValue === 2 && (
                <SellersAndBuyers property={property} />
              )}
              {tabValue === 3 && (
                <ViewingsAndFollowups property={property} />
              )}
              {tabValue === 4 && (
                <OffersAndTransactions property={property} />
              )}
              {tabValue === 5 && (
                <DocumentsAndContracts property={property} />
              )}
              {tabValue === 6 && (
                <Marketing property={property} />
              )}
            </Box>
          </Paper>
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Property not found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            The property you are looking for does not exist or has been removed.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained"
              onClick={() => router.push('/dashboard/properties')}
            >
              Return to Properties
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

// Skeleton loader for property details
const PropertyDetailsSkeleton = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" width="70%" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="40%" height={24} />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="rectangular" width="30%" height={32} />
        <Skeleton variant="rectangular" width="20%" height={40} />
      </Box>
      
      <Skeleton variant="rectangular" width="100%" height={400} />
    </Box>
  );
}; 