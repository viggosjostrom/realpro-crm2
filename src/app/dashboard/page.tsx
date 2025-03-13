'use client';

import React from 'react';
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
  LinearProgress,
  Tooltip,
  ButtonProps
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
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 20px -10px rgba(0,0,0,0.1)'
      }
    }}
  >
    {/* Decorative top border */}
    <Box 
      sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 6, 
        bgcolor: color 
      }} 
    />
    
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {title}
            </Typography>
            {trend !== undefined && (
              <Chip 
                size="small" 
                icon={<TrendingUpIcon fontSize="small" />} 
                label={`${trend > 0 ? '+' : ''}${trend}%`} 
                color={trend >= 0 ? "success" : "error"}
                sx={{ 
                  ml: 1, 
                  height: 24, 
                  fontWeight: 'bold',
                  '& .MuiChip-label': { px: 1, py: 0.5 } 
                }}
              />
            )}
          </Box>
          
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
            {value}
          </Typography>
          
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">Progress</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight="medium">75%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={75} 
              sx={{ 
                height: 6, 
                borderRadius: 3, 
                bgcolor: color + '20',
                '& .MuiLinearProgress-bar': {
                  bgcolor: color
                }
              }} 
            />
          </Box>
        </Box>
        
        <Avatar 
          sx={{ 
            bgcolor: color + '15', 
            color: color, 
            width: 64, 
            height: 64,
            ml: 2,
            boxShadow: `0 4px 14px -4px ${color}90`
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
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getStatusColor() + '20', color: getStatusColor() }}>
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
              bgcolor: getStatusColor() + '10', 
              color: getStatusColor(),
              fontWeight: 'medium'
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

// Enhanced Property card component
const PropertyCard = ({ property }: { property: Property }) => {
  const getStatusColor = () => {
    switch (property.status) {
      case 'available':
        return 'success.main';
      case 'pending':
        return 'warning.main';
      case 'sold':
        return 'error.main';
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
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 20px -10px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative', height: 140, overflow: 'hidden' }}>
        <Box
          component="img"
          src={property.images[0] || '/properties/placeholder.jpg'}
          alt={property.address}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <Chip
          label={property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: getStatusColor() + '90',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {formatCurrency(property.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {property.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.rooms} rum • {property.size} m²
        </Typography>
      </CardContent>
    </Card>
  );
};

// Lead card component
const LeadCard = ({ lead }: { lead: Lead }) => {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
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
    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar>{`${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`}</Avatar>
      </ListItemAvatar>
      
      {/* Custom ListItemText implementation to avoid nesting issues */}
      <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
        {/* Primary text */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'medium', display: 'block' }}>
          {`${lead.firstName} ${lead.lastName}`}
        </Typography>
        
        {/* Secondary text */}
        <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block' }}>
          {lead.email}
        </Typography>
        
        {/* Lead details */}
        <Box 
          sx={{ 
            mt: 1, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Chip 
            label={lead.status.charAt(0).toUpperCase() + lead.status.slice(1)} 
            size="small" 
            sx={{ 
              bgcolor: getStatusColor() + '10', 
              color: getStatusColor(),
              fontWeight: 'medium'
            }} 
          />
          <Typography variant="caption" color="text.secondary" component="span">
            {lead.lastContactedAt && isClient 
              ? `Last contact: ${formatRelativeTime(lead.lastContactedAt)}` 
              : lead.lastContactedAt ? 'Last contact: Recently' : 'New lead'}
          </Typography>
        </Box>
      </Box>
    </ListItem>
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

export default function Dashboard() {
  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper'
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
              sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ py: 0 }}>
                {mockActivities.slice(0, 5).map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <Box sx={{ px: 3 }}>
                      <ActivityItem activity={activity} />
                    </Box>
                    {index < mockActivities.slice(0, 5).length - 1 && <Divider variant="inset" component="li" />}
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper'
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
              sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}
            />
            <Divider />
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {mockProperties.slice(0, 3).map((property) => (
                  <Grid item xs={12} sm={4} key={property.id}>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper'
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
              sx={{ px: 3, py: 2, bgcolor: 'background.paper' }}
            />
            <Divider />
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
} 