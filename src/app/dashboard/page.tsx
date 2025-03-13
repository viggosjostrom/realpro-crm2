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
  CircularProgress,
  LinearProgress
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
  Add as AddIcon,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { mockDashboardStats, mockActivities, mockProperties, mockLeads } from '@/lib/utils/mockData';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils/formatters';
import { Activity, Property } from '@/lib/types';
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
}) => {
  // Generate a lighter shade of the color for gradient
  const lighterColor = `${color}20`;
  
  // Determine trend direction for styling
  const isTrendPositive = trend === undefined ? undefined : trend >= 0;
  const trendColor = isTrendPositive ? 'success.main' : 'error.main';
  const trendIcon = isTrendPositive ? 
    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : 
    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5, transform: 'rotate(180deg)' }} />;

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        borderRadius: 3,
        background: `linear-gradient(135deg, ${lighterColor} 0%, #ffffff 100%)`,
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 30px -10px ${color}30`,
          '& .stat-icon': {
            transform: 'scale(1.1) translateY(-5px)',
            boxShadow: `0 15px 25px -5px ${color}50`,
          }
        }
      }}
    >
      <CardContent sx={{ p: 2, position: 'relative', zIndex: 1 }}>
        {/* Icon positioned for visual impact */}
        <Avatar 
          className="stat-icon"
          sx={{ 
            ...getAccessibleAvatarStyle(color),
            width: 50, 
            height: 50,
            position: 'absolute',
            top: -15,
            right: 15,
            transition: 'all 0.3s ease',
            boxShadow: `0 10px 20px -5px ${color}40`,
            border: '3px solid white',
          }}
        >
          {icon}
        </Avatar>
        
        {/* Card content with better spacing */}
        <Box sx={{ mt: 3, mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
            sx={{ 
              fontWeight: 500,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              color: color,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {value}
          </Typography>
          
          {trend !== undefined && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                typography: 'caption',
                fontWeight: 'medium',
                bgcolor: `${trendColor}15`,
                color: trendColor,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                width: 'fit-content',
                border: '1px solid',
                borderColor: `${trendColor}30`,
              }}
            >
              {trendIcon}
              {Math.abs(trend)}% from last month
            </Box>
          )}
        </Box>
        
        {/* Decorative element */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: '4px', 
            background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
            borderBottomLeftRadius: 3,
          }} 
        />
      </CardContent>
    </Card>
  );
};

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
            color={activity.completed ? 'success' : 'warning'}
            sx={{ 
              fontWeight: 'bold',
              borderRadius: 1,
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
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

  const getStatusVariant = () => {
    switch (property.status) {
      case 'available':
        return 'success';
      case 'pending':
        return 'warning';
      case 'sold':
        return 'primary';
      default:
        return 'default';
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
          color={getStatusVariant()}
          sx={{ 
            position: 'absolute',
            top: 8,
            right: 8,
            fontWeight: 'bold',
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

// Commission Goal Tracker component
const CommissionGoalTracker = () => {
  const progress = (mockDashboardStats.currentCommission / mockDashboardStats.commissionGoal) * 100;
  const isOnTrack = progress >= ((30 - mockDashboardStats.daysLeftInMonth) / 30) * 100;
  
  // Calculate the color based on progress
  const getProgressColor = () => {
    if (progress >= 90) return '#10b981'; // Green - excellent progress
    if (progress >= 75) return '#0ea5e9'; // Blue - good progress
    if (progress >= 50) return '#f59e0b'; // Amber - moderate progress
    return '#ef4444'; // Red - needs attention
  };
  
  // Calculate projected commission by end of month based on current rate
  const daysInMonth = 30; // Simplified
  const daysElapsed = daysInMonth - mockDashboardStats.daysLeftInMonth;
  const dailyRate = mockDashboardStats.currentCommission / daysElapsed;
  const projectedCommission = dailyRate * daysInMonth;
  const willReachGoal = projectedCommission >= mockDashboardStats.commissionGoal;
  const progressColor = getProgressColor();
  
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        height: '100%',
        position: 'relative',
        '&:hover': {
          boxShadow: `0 16px 32px rgba(0,0,0,0.1), 0 0 0 2px ${progressColor}40`,
          transform: 'translateY(-4px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${progressColor} ${progress}%, #e5e7eb ${progress}%)`,
          zIndex: 2,
        }
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEventsIcon sx={{ color: progressColor, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Monthly Commission Goal
            </Typography>
          </Box>
        }
        action={
          <ButtonWithIcon 
            color="primary" 
            size="small"
            variant="outlined"
            sx={{ 
              borderRadius: 8, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }
            }}
          >
            Set Goals
          </ButtonWithIcon>
        }
        sx={{
          px: 3,
          py: 2,
          bgcolor: 'background.paper',
          borderBottom: '2px solid',
          borderColor: progressColor,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Progress visualization */}
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 1,
                alignItems: 'flex-end'
              }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Current
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: progressColor }}>
                    {formatCurrency(mockDashboardStats.currentCommission)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Goal
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(mockDashboardStats.commissionGoal)}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ position: 'relative', height: 24, mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 24,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: progressColor,
                      borderRadius: 3,
                      backgroundImage: `linear-gradient(45deg, 
                        rgba(255, 255, 255, 0.15) 25%, 
                        transparent 25%, 
                        transparent 50%, 
                        rgba(255, 255, 255, 0.15) 50%, 
                        rgba(255, 255, 255, 0.15) 75%, 
                        transparent 75%, 
                        transparent)`,
                      backgroundSize: '40px 40px',
                      animation: 'progress-animation 2s linear infinite',
                      '@keyframes progress-animation': {
                        '0%': {
                          backgroundPosition: '0 0',
                        },
                        '100%': {
                          backgroundPosition: '40px 0',
                        },
                      },
                    }
                  }}
                />
                
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Typography variant="body2" fontWeight="bold" color="white" sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {Math.round(progress)}% Complete
                  </Typography>
                </Box>
              </Box>
              
              {/* Milestone markers */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Box sx={{ 
                  width: 2, 
                  height: 8, 
                  bgcolor: progress >= 25 ? progressColor : 'divider',
                  position: 'relative',
                  left: '25%',
                  '&::after': {
                    content: '"25%"',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    mt: 0.5,
                  }
                }} />
                <Box sx={{ 
                  width: 2, 
                  height: 8, 
                  bgcolor: progress >= 50 ? progressColor : 'divider',
                  position: 'relative',
                  left: '0%',
                  '&::after': {
                    content: '"50%"',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    mt: 0.5,
                  }
                }} />
                <Box sx={{ 
                  width: 2, 
                  height: 8, 
                  bgcolor: progress >= 75 ? progressColor : 'divider',
                  position: 'relative',
                  right: '0%',
                  '&::after': {
                    content: '"75%"',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    mt: 0.5,
                  }
                }} />
                <Box sx={{ 
                  width: 2, 
                  height: 8, 
                  bgcolor: progress >= 100 ? progressColor : 'divider',
                  position: 'relative',
                  right: '25%',
                  '&::after': {
                    content: '"100%"',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    mt: 0.5,
                  }
                }} />
              </Box>
            </Box>
          </Grid>
          
          {/* Stats and insights */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              '& > div': {
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                }
              }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                pb: 2,
                borderBottom: '1px dashed',
                borderColor: 'divider'
              }}>
                <Avatar sx={{ 
                  bgcolor: 'primary.main', 
                  mr: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  <EmojiEventsIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Goal
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(mockDashboardStats.commissionGoal)}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                pb: 2,
                borderBottom: '1px dashed',
                borderColor: 'divider'
              }}>
                <Avatar sx={{ 
                  bgcolor: progressColor, 
                  mr: 2,
                  boxShadow: `0 4px 8px ${progressColor}40`
                }}>
                  <MoneyIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Current Commission
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(mockDashboardStats.currentCommission)}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: 'info.main', 
                  mr: 2,
                  boxShadow: '0 4px 8px rgba(0,120,220,0.2)'
                }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Month
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(mockDashboardStats.commissionLastMonth)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          {/* Projections and time left */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              p: 2.5, 
              borderRadius: 3, 
              bgcolor: 'background.default',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '120px',
                height: '120px',
                backgroundImage: `radial-gradient(circle, ${progressColor}20 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'translate(30%, 30%)',
                zIndex: 0,
              }
            }}>
              <Box sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Projected by Month End
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography variant="h4" fontWeight="bold" color={willReachGoal ? 'success.main' : 'error.main'}>
                    {formatCurrency(projectedCommission)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({willReachGoal ? '+' : ''}{formatCurrency(projectedCommission - mockDashboardStats.commissionGoal)})
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2.5,
                position: 'relative',
                zIndex: 1
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  mr: 2
                }}>
                  <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Time Remaining
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {mockDashboardStats.daysLeftInMonth} days
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Chip 
                  label={isOnTrack ? "On Track" : "Needs Attention"} 
                  color={isOnTrack ? "success" : "warning"}
                  sx={{ 
                    fontWeight: 'bold',
                    px: 2,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                  icon={isOnTrack ? <TrendingUpIcon /> : <TrendingUpIcon sx={{ transform: 'rotate(180deg)' }} />}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
};

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
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Total Clients" 
            value={mockDashboardStats.totalClients} 
            icon={<PeopleIcon fontSize="large" />} 
            color="#1a56db" 
            trend={12}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Active Listings" 
            value={mockDashboardStats.activeListings} 
            icon={<HomeIcon fontSize="large" />} 
            color="#047857" 
            trend={5}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="New Leads" 
            value={mockDashboardStats.newLeadsThisMonth} 
            icon={<ContactPhoneIcon fontSize="large" />} 
            color="#9333ea" 
            trend={-2}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Revenue" 
            value={formatCurrency(mockDashboardStats.revenueGenerated)} 
            icon={<MoneyIcon fontSize="large" />} 
            color="#b91c1c" 
            trend={8}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Properties Sold" 
            value={mockDashboardStats.propertiesSold} 
            icon={<DescriptionIcon fontSize="large" />} 
            color="#0891b2" 
            trend={15}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Pending Deals" 
            value={mockDashboardStats.pendingDeals} 
            icon={<EventIcon fontSize="large" />} 
            color="#d97706" 
            trend={3}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Total Leads" 
            value={mockDashboardStats.totalLeads} 
            icon={<VisibilityIcon fontSize="large" />} 
            color="#7c3aed" 
            trend={7}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={1.5}>
          <StatCard 
            title="Avg. Sale Price" 
            value={formatCurrency(mockDashboardStats.revenueGenerated / mockDashboardStats.propertiesSold)} 
            icon={<TrendingUpIcon fontSize="large" />} 
            color="#059669" 
            trend={4}
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

        {/* Commission Goal Tracker - New Section */}
        <Grid item xs={12} md={6}>
          <CommissionGoalTracker />
        </Grid>

        {/* Recent Leads - Resized */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper',
              transition: 'all 0.3s ease',
              height: '100%',
              '&:hover': {
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                transform: 'translateY(-4px)',
              }
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ContactPhoneIcon sx={{ color: '#9333ea', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Recent Leads
                  </Typography>
                </Box>
              }
              action={
                <ButtonWithIcon 
                  color="primary" 
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderRadius: 8, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  View All
                </ButtonWithIcon>
              }
              sx={{ 
                px: 3, 
                py: 2, 
                bgcolor: 'background.paper',
                borderBottom: '2px solid',
                borderColor: '#9333ea',
              }}
            />
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {mockLeads.slice(0, 4).map((lead) => (
                  <Grid item xs={12} sm={6} key={lead.id}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                          borderColor: '#9333ea40',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar 
                            sx={{ 
                              ...getAccessibleAvatarStyle(lead.status === 'new' ? '#3b82f6' : 
                                lead.status === 'contacted' ? '#8b5cf6' : 
                                lead.status === 'qualified' ? '#10b981' : 
                                lead.status === 'proposal' ? '#f59e0b' : 
                                lead.status === 'negotiation' ? '#ef4444' : '#6b7280'),
                              mr: 1.5,
                              width: 48,
                              height: 48,
                              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                              border: '2px solid white'
                            }}
                          >
                            {`${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {`${lead.firstName} ${lead.lastName}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150 }}>
                              {lead.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label={lead.status.charAt(0).toUpperCase() + lead.status.slice(1)} 
                            size="small"
                            color={
                              lead.status === 'new' ? 'info' : 
                              lead.status === 'contacted' ? 'primary' : 
                              lead.status === 'qualified' ? 'success' : 
                              lead.status === 'proposal' ? 'warning' : 
                              lead.status === 'negotiation' ? 'error' : 
                              'default'
                            }
                            sx={{ 
                              fontWeight: 'bold',
                              borderRadius: 1,
                              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            {lead.lastContactedAt ? formatRelativeTime(lead.lastContactedAt) : 'New'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
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