'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Button,
  Tooltip,
  ButtonProps,
  CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Home as HomeIcon,
  ContactPhone as ContactPhoneIcon,
  AttachMoney as MoneyIcon,
  Call as CallIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { mockDashboardStats, mockActivities, mockProperties, mockLeads } from '@/lib/utils/mockData';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils/formatters';
import { Activity, Property, Lead } from '@/lib/types';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';

// Client-only wrapper component
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return <>{children}</>;
};

// Enhanced Stat card component with more visual impact
const StatCard = ({ title, value, icon, color, trend }: { 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  color: string,
  trend?: number 
}) => (
  <Card 
    elevation={0} 
    sx={{ 
      height: '100%', 
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'visible',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {value}
          </Typography>
          
          {trend !== undefined && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                typography: 'body2',
                fontWeight: 'medium',
                bgcolor: trend >= 0 ? 'success.main' : 'error.main',
                color: '#fff',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                width: 'fit-content'
              }}
            >
              {trend >= 0 ? (
                <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
              ) : (
                <TrendingUpIcon fontSize="small" sx={{ mr: 0.5, transform: 'rotate(180deg)' }} />
              )}
              {Math.abs(trend)}% from last month
            </Box>
          )}
        </Box>
        
        <Avatar 
          sx={{ 
            ...getAccessibleAvatarStyle(color),
            width: 64, 
            height: 64,
            ml: 2,
            boxShadow: `0 8px 16px -4px ${color}90`
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

// Activity item component
const ActivityItem = ({ activity }: { activity: Activity }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const getIcon = () => {
    switch (activity.type) {
      case 'call':
        return <CallIcon />;
      case 'email':
        return <EmailIcon />;
      case 'meeting':
        return <EventIcon />;
      case 'viewing':
        return <VisibilityIcon />;
      case 'offer':
        return <DescriptionIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getStatusColor = () => {
    return activity.completed ? 'success.main' : 'warning.main';
  };

  return (
    <ListItem 
      alignItems="flex-start" 
      sx={{ 
        px: 2, 
        py: 1.5, 
        borderRadius: 2,
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
        }
      }}
    >
      <ListItemAvatar>
        <Avatar 
          sx={{ 
            ...getAccessibleAvatarStyle(getStatusColor()),
            boxShadow: `0 4px 8px -2px ${getStatusColor()}50`
          }}
        >
          {getIcon()}
        </Avatar>
      </ListItemAvatar>
      
      {/* Custom ListItemText implementation to avoid nesting issues */}
      <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
        {/* Primary text */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'medium', display: 'block' }}>
          {activity.title}
        </Typography>
        
        {/* Secondary text */}
        <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
          {activity.description}
        </Typography>
        
        {/* Activity details */}
        <Box 
          sx={{ 
            mt: 1, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Chip 
            label={activity.completed ? 'Completed' : 'Upcoming'} 
            size="small" 
            sx={{ 
              bgcolor: getStatusColor() + '20', 
              color: getStatusColor(),
              fontWeight: 'medium',
              borderRadius: 1
            }} 
          />
          <Typography variant="caption" color="text.secondary" component="span">
            {isClient ? formatDate(activity.date) : ''}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

// Property card component
const PropertyCard = ({ property }: { property: Property }) => {
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getStatusColor = () => {
    switch (property.status) {
      case 'available':
        return 'success.main';
      case 'pending':
        return 'warning.main';
      case 'sold':
        return 'primary.main';
      default:
        return 'text.secondary';
    }
  };

  // Simplified image handling
  const hasValidImage = property.images && property.images.length > 0 && !imageError;
  const imagePath = hasValidImage ? property.images[0] : '';

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          height: 140,
          bgcolor: getStatusColor() + '20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: hasValidImage ? `url(${imagePath})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {(!hasValidImage) && <HomeIcon sx={{ fontSize: 48, color: getStatusColor() }} />}
        {hasValidImage && isClient && (
          <Box 
            component="img"
            src={imagePath}
            alt={property.address}
            sx={{ 
              display: 'none', // Hidden image just for error handling
              width: 0,
              height: 0,
            }}
            onError={() => setImageError(true)}
          />
        )}
        <Chip 
          label={property.status.charAt(0).toUpperCase() + property.status.slice(1)} 
          size="small" 
          sx={{ 
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            color: getStatusColor(),
            fontWeight: 'medium',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {property.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {property.rooms} rum • {property.size} m²
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {isClient ? formatDate(property.updatedAt) : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Lead card component
const LeadCard = ({ lead }: { lead: Lead }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getStatusColor = () => {
    switch (lead.status) {
      case 'new':
        return 'info.main';
      case 'contacted':
        return 'primary.main';
      case 'qualified':
        return 'success.main';
      case 'proposal':
        return 'warning.main';
      case 'negotiation':
        return 'secondary.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              ...getAccessibleAvatarStyle(getStatusColor()),
              mr: 1.5,
              width: 48,
              height: 48,
              boxShadow: `0 4px 8px -2px ${getStatusColor()}50`
            }}
          >
            {`${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {`${lead.firstName} ${lead.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lead.email}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label={lead.status.charAt(0).toUpperCase() + lead.status.slice(1)} 
            size="small" 
            sx={{ 
              bgcolor: getStatusColor() + '20', 
              color: getStatusColor(),
              fontWeight: 'medium',
              borderRadius: 1
            }} 
          />
          <Typography variant="caption" color="text.secondary">
            {isClient && lead.lastContactedAt ? formatRelativeTime(lead.lastContactedAt) : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Enhanced Button with Icon
const ButtonWithIcon = ({ children, icon, ...props }: { 
  children: React.ReactNode, 
  icon?: React.ReactNode
} & ButtonProps) => (
  <Button 
    endIcon={icon || <ArrowForwardIcon />} 
    sx={{ 
      borderRadius: 8,
      textTransform: 'none',
      fontWeight: 500,
      px: 2
    }}
    {...props}
  >
    {children}
  </Button>
);

// Main Dashboard Content
const DashboardContent = () => {
  return (
    <>
      <Box 
        sx={{ 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, Johan! Here&apos;s what&apos;s happening with your properties today.
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Add new property">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                px: 3,
                py: 1
              }}
            >
              Add Property
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Clients" 
            value={mockDashboardStats.totalClients} 
            icon={<PeopleIcon fontSize="large" />} 
            color="#1a56db" 
            trend={12}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Listings" 
            value={mockDashboardStats.activeListings} 
            icon={<HomeIcon fontSize="large" />} 
            color="#047857" 
            trend={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="New Leads" 
            value={mockDashboardStats.newLeadsThisMonth} 
            icon={<ContactPhoneIcon fontSize="large" />} 
            color="#92400e" 
            trend={-2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Revenue" 
            value={formatCurrency(mockDashboardStats.revenueGenerated)} 
            icon={<MoneyIcon fontSize="large" />} 
            color="#b91c1c" 
            trend={8}
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper',
              transition: 'box-shadow 0.2s',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardHeader 
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Activities
                </Typography>
              }
              action={
                <ButtonWithIcon color="primary" size="small">
                  View All
                </ButtonWithIcon>
              }
              sx={{ 
                px: 3, 
                py: 2, 
                bgcolor: 'background.paper',
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              }}
            />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ py: 0 }}>
                {mockActivities.slice(0, 5).map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ActivityItem activity={activity} />
                    {index < mockActivities.slice(0, 5).length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Paper>
        </Grid>

        {/* Latest Properties */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper',
              transition: 'box-shadow 0.2s',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardHeader 
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Latest Properties
                </Typography>
              }
              action={
                <ButtonWithIcon color="primary" size="small">
                  View All
                </ButtonWithIcon>
              }
              sx={{ 
                px: 3, 
                py: 2, 
                bgcolor: 'background.paper',
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {mockProperties.slice(0, 6).map((property) => (
                  <Grid item xs={12} sm={6} md={4} key={property.id}>
                    <PropertyCard property={property} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Paper>
        </Grid>

        {/* Recent Leads */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper',
              transition: 'box-shadow 0.2s',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardHeader 
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recent Leads
                </Typography>
              }
              action={
                <ButtonWithIcon color="primary" size="small">
                  View All
                </ButtonWithIcon>
              }
              sx={{ 
                px: 3, 
                py: 2, 
                bgcolor: 'background.paper',
                borderBottom: '2px solid',
                borderColor: 'primary.main'
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {mockLeads.slice(0, 4).map((lead) => (
                  <Grid item xs={12} sm={6} md={3} key={lead.id}>
                    <LeadCard lead={lead} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

// Main Dashboard component with client-side only rendering
export default function Dashboard() {
  return (
    <ClientOnly>
      <DashboardContent />
    </ClientOnly>
  );
} 