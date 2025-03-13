'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Avatar, 
  Button, 
  TextField, 
  InputAdornment, 
  Tabs, 
  Tab, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  FilterList as FilterListIcon,
  FavoriteBorder as InterestIcon,
  LocationOn as LocationIcon,
  SquareFoot as SizeIcon,
  MeetingRoom as RoomsIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { mockProperties, mockUsers } from '@/lib/utils/mockData';
import { Property, User } from '@/lib/types';
import { useRouter } from 'next/navigation';

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

// Helper function to generate interest level (mock data)
const getInterestLevel = (): number => {
  // For demo purposes, generate a random number between 1-10
  return Math.floor(Math.random() * 10) + 1;
};

// Helper function to get last activity date (mock data)
const getLastActivity = (): string => {
  // For demo purposes, generate a random date within the last month
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const lastDate = new Date(today.setDate(today.getDate() - daysAgo));
  
  return `Last viewing: ${lastDate.toISOString().split('T')[0]}`;
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  const agent = getAgentById(property.agentId);
  const interestLevel = getInterestLevel();
  const lastActivity = getLastActivity();

  const handleCardClick = () => {
    router.push(`/dashboard/properties/${property.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={property.images[0] || '/properties/property-placeholder.jpg'}
          alt={property.address}
        />
        <Chip
          label={getStatusLabel(property.status)}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: getStatusColor(property.status),
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {formatPrice(property.price)}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {property.address}, {property.city}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SizeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.size} m²</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RoomsIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{property.rooms} rooms</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          {agent && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={agent.avatar} 
                alt={`${agent.firstName} ${agent.lastName}`}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                {agent.firstName} {agent.lastName}
              </Typography>
            </Box>
          )}
          
          <Tooltip title={`${interestLevel} interested buyers`}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InterestIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                {interestLevel}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
            {lastActivity}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function PropertiesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter properties based on search term and filters
  const filteredProperties = mockProperties.filter(property => {
    // Search term filter
    const matchesSearch = 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    // Tab filter (My Listings vs All Listings)
    const matchesTab = tabValue === 1 || (tabValue === 0 && property.agentId === '1'); // Assuming current user ID is '1'
    
    return matchesSearch && matchesStatus && matchesTab;
  });
  
  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Properties
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Add New Property
        </Button>
      </Box>
      
      <Paper elevation={0} sx={{ mb: 3, borderRadius: '12px', overflow: 'hidden' }}>
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
          <Tab label="My Listings" />
          <Tab label="All Listings" />
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>
            
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="available">For Sale</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Tooltip title="More filters">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {sortedProperties.length} properties
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {sortedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
        
        {sortedProperties.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your search or filters
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
} 