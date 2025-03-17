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
  ListItemText,
  Avatar,
  Divider,
  Chip,
  Button,
  ButtonProps,
  LinearProgress,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  ButtonBase
} from '@mui/material';
import {
  Home as HomeIcon,
  ContactPhone as ContactPhoneIcon,
  AttachMoney as MoneyIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  Today as TodayIcon,
  Schedule as ScheduleIcon,
  DateRange as DateRangeIcon,
  ListAlt as ListAltIcon,
  EventAvailable as EventAvailableIcon,
  TaskAlt as TaskAltIcon,
  PhoneInTalk as PhoneInTalkIcon,
  Groups as GroupsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Info as InfoIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Replay as ReplayIcon,
  RateReview as RateReviewIcon,
  Apartment as ApartmentIcon,
  PriceChange as PriceChangeIcon,
  SquareFoot as SquareFootIcon,
  House as HouseIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { mockDashboardStats, mockActivities, mockProperties, mockLeads, mockMarketStats } from '@/lib/utils/mockData';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Activity, Property } from '@/lib/types';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';
import { format } from 'date-fns';
import { green, orange, red, blue, purple } from '@mui/material/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/components/ClientOnly';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Region selector type
type Region = 'Sweden' | 'Stockholm Urban Area' | 'Stockholm County';

// Update the Activity type definition with the new fields
type ActivityType = 'appointment' | 'task' | 'call' | 'email' | 'meeting' | 'viewing' | 'offer' | 'contract' | 'follow-up' | 'evaluation' | 'reminder' | 'other';
type ActivityStatus = 'completed' | 'pending' | 'cancelled' | 'scheduled';

// Function to get the appropriate activity icon based on type
const getActivityIcon = (type: ActivityType): React.ReactElement => {
  switch (type) {
    case 'appointment':
      return <EventAvailableIcon color="primary" />;
    case 'task':
      return <TaskAltIcon sx={{ color: green[600] }} />;
    case 'call':
      return <PhoneInTalkIcon sx={{ color: blue[600] }} />;
    case 'email':
      return <EmailIcon sx={{ color: purple[600] }} />;
    case 'meeting':
      return <GroupsIcon sx={{ color: orange[600] }} />;
    case 'viewing':
      return <VisibilityIcon sx={{ color: blue[400] }} />;
    case 'offer':
      return <DescriptionIcon sx={{ color: green[800] }} />;
    case 'contract':
      return <AssignmentIcon sx={{ color: purple[800] }} />;
    case 'follow-up':
      return <ReplayIcon sx={{ color: orange[800] }} />;
    case 'evaluation':
      return <RateReviewIcon sx={{ color: blue[800] }} />;
    case 'reminder':
      return <NotificationsActiveIcon sx={{ color: red[600] }} />;
    case 'other':
    default:
      return <InfoIcon color="action" />;
  }
};

// Function to get status color based on activity status
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStatusColor = (status: ActivityStatus): string => {
  switch (status) {
    case 'completed':
      return green[600];
    case 'pending':
      return orange[600];
    case 'cancelled':
      return red[600];
    case 'scheduled':
      return blue[600];
    default:
      return 'text.secondary';
  }
};

// Fixed reference date to use across the application
const REFERENCE_TODAY = new Date('2023-06-15');

// Function to format the date and time text
const getTimeText = (activity: Activity): string => {
  const date = new Date(activity.date);
  
  // Custom implementation of isToday using our fixed reference date
  const isReferenceToday = (date: Date): boolean => {
    const refDate = new Date(REFERENCE_TODAY);
    refDate.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === refDate.getTime();
  };
  
  // Custom implementation of isTomorrow using our fixed reference date
  const isReferenceTomorrow = (date: Date): boolean => {
    const refDate = new Date(REFERENCE_TODAY);
    refDate.setHours(0, 0, 0, 0);
    refDate.setDate(refDate.getDate() + 1);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === refDate.getTime();
  };
  
  // Custom implementation of isThisWeek using our fixed reference date
  const isReferenceThisWeek = (date: Date): boolean => {
    const refDate = new Date(REFERENCE_TODAY);
    refDate.setHours(0, 0, 0, 0);
    const nextWeek = new Date(refDate);
    nextWeek.setDate(refDate.getDate() + 7);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate >= refDate && compareDate < nextWeek;
  };
  
  // For today, show only time
  if (isReferenceToday(date)) {
    return format(date, 'h:mm a');
  }
  
  // For tomorrow, show "Tomorrow at [time]"
  if (isReferenceTomorrow(date)) {
    return `Tomorrow at ${format(date, 'h:mm a')}`;
  }
  
  // For this week, show day and time
  if (isReferenceThisWeek(date)) {
    return `${format(date, 'EEEE')} at ${format(date, 'h:mm a')}`;
  }
  
  // Default: full date with time
  return `${format(date, 'MMM d')} at ${format(date, 'h:mm a')}`;
};

// Filter activities by tab
const filterActivitiesByTab = (activities: Activity[], tab: number): Activity[] => {
  // Use our fixed reference date
  const referenceDate = new Date(REFERENCE_TODAY);
  referenceDate.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(referenceDate);
  tomorrow.setDate(referenceDate.getDate() + 1);
  
  const nextWeek = new Date(referenceDate);
  nextWeek.setDate(referenceDate.getDate() + 7);
  
  switch (tab) {
    case 0: // All
      return activities;
    case 1: // Today
      return activities.filter(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === referenceDate.getTime();
      });
    case 2: // Tomorrow
      return activities.filter(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === tomorrow.getTime();
      });
    case 3: // This Week
      return activities.filter(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate >= referenceDate && activityDate < nextWeek;
      });
    default:
      return activities;
  }
};

// Sort activities by date (closest upcoming first, then completed)
const sortActivitiesByDate = (activities: Activity[]): Activity[] => {
  return [...activities].sort((a, b) => {
    // Upcoming activities (not completed) come first
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    
    // For upcoming activities, sort by closest date
    if (!a.completed && !b.completed) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    
    // For completed activities, sort by most recent
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

// Special ActivityItem component specifically for the dashboard
// This version adds Today/Tomorrow indicators and removes the status chip
const DashboardActivityItem = ({ activity }: { activity: Activity }): React.ReactElement => {
  const timeText = getTimeText(activity);
  
  // Check if activity is today or tomorrow based on our reference date
  const isReferenceToday = (date: Date): boolean => {
    const refDate = new Date(REFERENCE_TODAY);
    refDate.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === refDate.getTime();
  };
  
  const isReferenceTomorrow = (date: Date): boolean => {
    const refDate = new Date(REFERENCE_TODAY);
    refDate.setHours(0, 0, 0, 0);
    refDate.setDate(refDate.getDate() + 1);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === refDate.getTime();
  };
  
  const activityDate = new Date(activity.date);
  const isToday = isReferenceToday(activityDate);
  const isTomorrow = isReferenceTomorrow(activityDate);
  
  return (
    <ListItem 
      alignItems="flex-start"
      component={ButtonBase}
      onClick={() => {/* No navigation, just clickable for show */}}
      sx={{ 
        py: 2, 
        px: 3,
        transition: 'all 0.2s ease',
        position: 'relative',
        textAlign: 'left',
        display: 'flex',
        width: '100%',
        ...(isToday && {
          bgcolor: alpha('#1a56db', 0.04),
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          pl: 2.7, // Adjusted to account for border
        }),
        '&:hover': {
          bgcolor: isToday ? alpha('#1a56db', 0.08) : 'action.hover',
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ 
          bgcolor: 'background.paper', 
          border: '1px solid', 
          borderColor: 'divider',
          ...(isToday && { boxShadow: '0 0 0 2px rgba(26, 86, 219, 0.3)' })
        }}>
          {getActivityIcon(activity.type as ActivityType)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {activity.title}
            </Typography>
            
            {/* Replace status chip with Today/Tomorrow indicators */}
            {isToday ? (
              <Chip 
                label="Today"
                size="small"
                color="primary"
                sx={{ 
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: '0 0 0 0 rgba(26, 86, 219, 0.4)'
                    },
                    '70%': {
                      boxShadow: '0 0 0 6px rgba(26, 86, 219, 0)'
                    },
                    '100%': {
                      boxShadow: '0 0 0 0 rgba(26, 86, 219, 0)'
                    }
                  }
                }}
              />
            ) : isTomorrow ? (
              <Chip 
                label="Tomorrow"
                size="small"
                color="info"
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24
                }}
              />
            ) : null}
          </Box>
        }
        secondary={
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1
              }}
            >
              {activity.description}
            </Typography>
            <Box 
              component="span" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1 
              }}
            >
              <AccessTimeIcon sx={{ fontSize: '0.875rem', color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary" component="span">
                {timeText}
              </Typography>
              {activity.contact && (
                <>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block', 
                      mx: 1, 
                      width: 4, 
                      height: 4, 
                      borderRadius: '50%', 
                      bgcolor: 'text.disabled' 
                    }} 
                  />
                  <PersonIcon sx={{ fontSize: '0.875rem', color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary" component="span">
                    {activity.contact}
                  </Typography>
                </>
              )}
            </Box>
          </>
        }
      />
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

// Property card component
const PropertyCard = ({ property }: { property: Property }) => {
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = () => {
    router.push(`/dashboard/properties/${property.id}`);
  };

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
          cursor: 'pointer'
        }
      }}
      onClick={handleCardClick}
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
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        bgcolor: 'background.paper',
        height: '100%',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${progressColor} ${progress}%, #e5e7eb ${progress}%)`,
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

// Price Development Card - remove hover effects and use standard shadow
const PriceDevelopmentCard = () => {
  const theme = useTheme();
  const [region, setRegion] = useState<Region>('Sweden');
  const timeSeriesData = mockMarketStats.percentageChangeTimeSeries[region];
  
  // Get the most recent values from the time series
  const mostRecentHouseValue = timeSeriesData.houses[timeSeriesData.houses.length - 1].value;
  const mostRecentApartmentValue = timeSeriesData.apartments[timeSeriesData.apartments.length - 1].value;
  
  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as Region);
  };

  // Prepare data for charts
  const formatDataForPercentageChart = () => {
    const labels = timeSeriesData.houses.map((item) => 
      format(item.date, 'MMM d')
    ); // Remove the slice to show all 30 days
    
    return {
      labels,
      datasets: [
        {
          label: 'Houses',
          data: timeSeriesData.houses.map(item => item.value), // Remove the slice
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: 'origin',
        },
        {
          label: 'Apartments',
          data: timeSeriesData.apartments.map(item => item.value), // Remove the slice
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: 'origin',
        },
      ],
    } as ChartData<'line'>;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend to save space
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 8,
        boxPadding: 4,
        callbacks: {
          label: function(context: {
            dataset: { label: string };
            parsed: { y: number };
          }) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('sv-SE', { 
                style: 'percent', 
                minimumFractionDigits: 1,
                maximumFractionDigits: 1 
              }).format(context.parsed.y / 100);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 10
          }
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: function(value: number) {
            return value.toFixed(1) + '%';
          },
          font: {
            size: 10
          }
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  } as ChartOptions<'line'>;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${blue[50]} 0%, #ffffff 100%)`,
        position: 'relative',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PriceChangeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
                Price Development
              </Typography>
              <Typography variant="caption" fontWeight="medium" color="text.secondary">
                - Price Change (%) - Last Month
              </Typography>
            </Box>
          </Box>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Houses indicator - ultra compact */}
            <Box sx={{ 
              p: 0.5, 
              mr: 1,
              width: 82,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 1,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                <HouseIcon sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, mr: 0.25 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Houses
                </Typography>
              </Box>
              <Typography 
                color={mostRecentHouseValue >= 0 ? "success.main" : "error.main"}
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  mt: 0.25
                }}
              >
                {mostRecentHouseValue > 0 && "+"}
                {mostRecentHouseValue.toFixed(1)}%
                <TrendingUpIcon sx={{ 
                  ml: 0.25, 
                  fontSize: '0.7rem',
                  transform: mostRecentHouseValue < 0 ? 'rotate(180deg)' : 'none'
                }} />
              </Typography>
            </Box>
            
            {/* Apartments indicator - ultra compact */}
            <Box sx={{ 
              p: 0.5, 
              mr: 2,
              width: 82,
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
              borderRadius: 1,
              border: '1px solid',
              borderColor: alpha(theme.palette.secondary.main, 0.1)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                <ApartmentIcon sx={{ fontSize: '0.6rem', color: theme.palette.secondary.main, mr: 0.25 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Apartment
                </Typography>
              </Box>
              <Typography 
                color={mostRecentApartmentValue >= 0 ? "success.main" : "error.main"}
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  mt: 0.25
                }}
              >
                {mostRecentApartmentValue > 0 && "+"}
                {mostRecentApartmentValue.toFixed(1)}%
                <TrendingUpIcon sx={{ 
                  ml: 0.25, 
                  fontSize: '0.7rem',
                  transform: mostRecentApartmentValue < 0 ? 'rotate(180deg)' : 'none'
                }} />
              </Typography>
            </Box>
            
            <FormControl size="small" sx={{ m: 0, minWidth: 140 }}>
              <Select
                value={region}
                onChange={handleRegionChange}
                displayEmpty
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="Sweden">Sweden</MenuItem>
                <MenuItem value="Stockholm Urban Area">Stockholm Urban</MenuItem>
                <MenuItem value="Stockholm County">Stockholm County</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1, pb: 2, px: { xs: 2, md: 3 } }}>
        {/* Full width chart */}
        <Box sx={{ height: 155 }}>
          <Line options={chartOptions} data={formatDataForPercentageChart()} />
        </Box>
      </CardContent>
    </Card>
  );
};

// Average Price Card - remove hover effects and use standard shadow
const AveragePriceCard = () => {
  const theme = useTheme();
  const [region, setRegion] = useState<Region>('Sweden');
  const timeSeriesData = mockMarketStats.priceDevelopmentTimeSeries[region];
  
  // Get the most recent values from the time series
  const mostRecentHouseValue = timeSeriesData.houses[timeSeriesData.houses.length - 1].value;
  const mostRecentApartmentValue = timeSeriesData.apartments[timeSeriesData.apartments.length - 1].value;
  
  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as Region);
  };

  // Prepare data for charts
  const formatDataForPriceChart = () => {
    const labels = timeSeriesData.houses.map((item) => 
      format(item.date, 'MMM d')
    ); // Remove the slice to show all 30 days
    
    return {
      labels,
      datasets: [
        {
          label: 'Houses (SEK/m²)',
          data: timeSeriesData.houses.map(item => item.value), // Remove the slice
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: 'origin',
        },
        {
          label: 'Apartments (SEK/m²)',
          data: timeSeriesData.apartments.map(item => item.value), // Remove the slice
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: 'origin',
        },
      ],
    } as ChartData<'line'>;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend to save space
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 8,
        boxPadding: 4,
        callbacks: {
          label: function(context: {
            dataset: { label: string };
            parsed: { y: number };
          }) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('sv-SE', { 
                style: 'currency', 
                currency: 'SEK',
                maximumFractionDigits: 0
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 10
          }
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: function(value: number) {
            return new Intl.NumberFormat('sv-SE', { 
              style: 'currency', 
              currency: 'SEK',
              notation: 'compact',
              maximumFractionDigits: 0
            }).format(value);
          },
          font: {
            size: 10
          }
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  } as ChartOptions<'line'>;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${purple[50]} 0%, #ffffff 100%)`,
        position: 'relative',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SquareFootIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
                Average Price (SEK/m²)
              </Typography>
              <Typography variant="caption" fontWeight="medium" color="text.secondary">
                - Average Price Trend - Last Month
              </Typography>
            </Box>
          </Box>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Houses indicator - ultra compact */}
            <Box sx={{ 
              p: 0.5, 
              mr: 1,
              width: 82,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 1,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                <HouseIcon sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, mr: 0.25 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Houses
                </Typography>
              </Box>
              <Typography 
                color="text.primary"
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  mt: 0.25
                }}
              >
                {formatCurrency(mostRecentHouseValue)}
              </Typography>
            </Box>
            
            {/* Apartments indicator - ultra compact */}
            <Box sx={{ 
              p: 0.5, 
              mr: 2,
              width: 82,
              bgcolor: alpha(theme.palette.secondary.main, 0.05),
              borderRadius: 1,
              border: '1px solid',
              borderColor: alpha(theme.palette.secondary.main, 0.1)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
                <ApartmentIcon sx={{ fontSize: '0.6rem', color: theme.palette.secondary.main, mr: 0.25 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Apartment
                </Typography>
              </Box>
              <Typography 
                color="text.primary"
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  mt: 0.25
                }}
              >
                {formatCurrency(mostRecentApartmentValue)}
              </Typography>
            </Box>
            
            <FormControl size="small" sx={{ m: 0, minWidth: 140 }}>
              <Select
                value={region}
                onChange={handleRegionChange}
                displayEmpty
                variant="outlined"
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value="Sweden">Sweden</MenuItem>
                <MenuItem value="Stockholm Urban Area">Stockholm Urban</MenuItem>
                <MenuItem value="Stockholm County">Stockholm County</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1, pb: 2, px: { xs: 2, md: 3 } }}>
        {/* Full width chart */}
        <Box sx={{ height: 155 }}>
          <Line options={chartOptions} data={formatDataForPriceChart()} />
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Content
const DashboardContent = () => {
  const theme = useTheme();
  const [activitiesTab, setActivitiesTab] = React.useState(0);
  const router = useRouter();
  
  const handleActivitiesTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActivitiesTab(newValue);
  };
  
  // Get filtered and sorted activities
  const filteredActivities = filterActivitiesByTab(mockActivities, activitiesTab);
  // Filter out completed activities to only show upcoming ones
  const upcomingActivities = filteredActivities.filter(activity => !activity.completed);
  const sortedActivities = sortActivitiesByDate(upcomingActivities);
  
  return (
    <>
      {/* New Stats Grid with just two cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <PriceDevelopmentCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <AveragePriceCard />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Activities (formerly Recent Activities) */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              bgcolor: 'background.paper',
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Activities
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
                  onClick={() => router.push('/dashboard/activities')}
                >
                  View All
                </ButtonWithIcon>
              }
              sx={{ 
                px: 3, 
                py: 2, 
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            />
            
            {/* Activity filter tabs */}
            <Tabs
              value={activitiesTab}
              onChange={handleActivitiesTabChange}
              variant="fullWidth"
              aria-label="Activity filter tabs"
              sx={{ 
                borderBottom: '1px solid',
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  minHeight: 48
                },
                px: 2
              }}
            >
              <Tab 
                icon={<ListAltIcon fontSize="small" />} 
                iconPosition="start" 
                label="All" 
                sx={{ py: 1 }}
              />
              <Tab 
                icon={<TodayIcon fontSize="small" />} 
                iconPosition="start" 
                label="Today" 
                sx={{ py: 1 }}
              />
              <Tab 
                icon={<ScheduleIcon fontSize="small" />} 
                iconPosition="start" 
                label="Tomorrow" 
                sx={{ py: 1 }}
              />
              <Tab 
                icon={<DateRangeIcon fontSize="small" />} 
                iconPosition="start" 
                label="This Week" 
                sx={{ py: 1 }}
              />
            </Tabs>
            
            {/* Scrollable container with fixed height */}
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: 0, // Critical for proper flex behavior
              maxHeight: { xs: '400px', md: '450px' } // Fixed height to match Latest Properties
            }}>
              <Box 
                sx={{ 
                  flexGrow: 1,
                  overflowY: 'auto',
                  height: '100%',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.15)',
                    borderRadius: '4px',
                  }
                }}
              >
                {sortedActivities.length > 0 ? (
                  <List sx={{ py: 0 }}>
                    {sortedActivities.map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <DashboardActivityItem activity={activity} />
                        {index < sortedActivities.length - 1 && <Divider component="li" variant="inset" />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No activities scheduled for this period.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
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
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              bgcolor: 'background.paper',
            }}
          >
            <CardHeader 
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Latest Properties
                </Typography>
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
                  onClick={() => router.push('/dashboard/properties')}
                >
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
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              bgcolor: 'background.paper',
              height: '100%',
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
                  onClick={() => {/* No navigation */}}
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
                      component={ButtonBase}
                      sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        display: 'block', // Make ButtonBase behave like a block element
                        textAlign: 'left', // Keep text left-aligned inside card
                        width: '100%', // Ensure card takes full width
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                          borderColor: '#9333ea40',
                          cursor: 'pointer'
                        }
                      }}
                      onClick={() => {/* No navigation */}}
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
                        
                        {lead.phone && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneInTalkIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {lead.phone}
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <InfoIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            Source: {lead.source}
                          </Typography>
                        </Box>
                        
                        {/* Notes section with status chip */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1, pr: 2 }}>
                            {lead.notes ? lead.notes : 'No additional information available'}
                          </Typography>
                          
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
                              flexShrink: 0
                            }} 
                          />
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

// Import WelcomePopup
import WelcomePopup from '../../components/WelcomePopup';

// Main Dashboard component with client-side only rendering
export default function Dashboard() {
  return (
    <ClientOnly>
      <WelcomePopup />
      <DashboardContent />
    </ClientOnly>
  );
} 