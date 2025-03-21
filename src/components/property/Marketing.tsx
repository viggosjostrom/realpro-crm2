import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  alpha
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  TrendingUp as TrendingUpIcon,
  Launch as LaunchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Mouse as MouseIcon,
  PersonAdd as PersonAddIcon,
  Apps as AppsIcon
} from '@mui/icons-material';
import { Property } from '@/lib/types';

// Platform status types and color mappings
type PlatformStatus = 'active' | 'pending' | 'expired' | 'not_published';

const getStatusColor = (status: PlatformStatus): string => {
  switch (status) {
    case 'active':
      return '#4CAF50'; // Green
    case 'pending':
      return '#FF9800'; // Orange
    case 'expired':
      return '#F44336'; // Red
    case 'not_published':
      return '#9E9E9E'; // Grey
    default:
      return '#9E9E9E'; // Grey
  }
};

const getStatusLabel = (status: PlatformStatus): string => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'expired':
      return 'Expired';
    case 'not_published':
      return 'Not Published';
    default:
      return status;
  }
};

// Marketing platform type
interface MarketingPlatform {
  id: string;
  name: string;
  status: PlatformStatus;
  publishedDate: Date | null;
  expiryDate: Date | null;
  views: number;
  clicks: number;
  leads: number;
  url: string;
}

// Mock marketing platforms data
const mockMarketingPlatforms: MarketingPlatform[] = [
  {
    id: '1',
    name: 'Hemnet',
    status: 'active',
    publishedDate: new Date('2023-04-10'),
    expiryDate: new Date('2023-07-10'),
    views: 1245,
    clicks: 87,
    leads: 12,
    url: 'https://www.hemnet.se/property/123'
  },
  {
    id: '2',
    name: 'Blocket Bostad',
    status: 'active',
    publishedDate: new Date('2023-04-12'),
    expiryDate: new Date('2023-07-12'),
    views: 896,
    clicks: 63,
    leads: 8,
    url: 'https://www.blocket.se/bostad/123'
  },
  {
    id: '3',
    name: 'Facebook Ads',
    status: 'active',
    publishedDate: new Date('2023-04-15'),
    expiryDate: new Date('2023-05-15'),
    views: 3452,
    clicks: 128,
    leads: 5,
    url: 'https://www.facebook.com/ads/123'
  },
  {
    id: '4',
    name: 'Google Ads',
    status: 'pending',
    publishedDate: null,
    expiryDate: null,
    views: 0,
    clicks: 0,
    leads: 0,
    url: ''
  },
  {
    id: '5',
    name: 'Instagram',
    status: 'expired',
    publishedDate: new Date('2023-03-01'),
    expiryDate: new Date('2023-04-01'),
    views: 2245,
    clicks: 97,
    leads: 4,
    url: 'https://www.instagram.com/p/123'
  },
  {
    id: '6',
    name: 'Company Website',
    status: 'active',
    publishedDate: new Date('2023-04-10'),
    expiryDate: null, // No expiry
    views: 578,
    clicks: 42,
    leads: 7,
    url: 'https://www.realpro.se/properties/123'
  },
  {
    id: '7',
    name: 'Real Estate Magazine',
    status: 'not_published',
    publishedDate: null,
    expiryDate: null,
    views: 0,
    clicks: 0,
    leads: 0,
    url: ''
  }
];

// Component props interface
interface MarketingProps {
  property: Property;
}

// Format date helper
const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

const Marketing: React.FC<MarketingProps> = ({ property }) => {
  const [platforms, setPlatforms] = useState<MarketingPlatform[]>(mockMarketingPlatforms);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewPlatformDialog, setOpenNewPlatformDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<MarketingPlatform | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Filter platforms based on status
  const filteredPlatforms = platforms.filter(platform => {
    if (filterStatus === 'all') return true;
    return platform.status === filterStatus;
  });

  // Performance metrics
  const totalViews = platforms.reduce((sum, platform) => sum + platform.views, 0);
  const totalClicks = platforms.reduce((sum, platform) => sum + platform.clicks, 0);
  const totalLeads = platforms.reduce((sum, platform) => sum + platform.leads, 0);
  const clickThroughRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
  const conversionRate = totalClicks > 0 ? (totalLeads / totalClicks) * 100 : 0;
  
  // Open edit dialog
  const handleEditPlatform = (platform: MarketingPlatform) => {
    setSelectedPlatform(platform);
    setOpenEditDialog(true);
  };
  
  // Close edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedPlatform(null);
  };
  
  // Open new platform dialog
  const handleAddPlatform = () => {
    setOpenNewPlatformDialog(true);
  };
  
  // Close new platform dialog
  const handleCloseNewPlatformDialog = () => {
    setOpenNewPlatformDialog(false);
  };
  
  // Refresh platform
  const handleRefreshPlatform = (platformId: string) => {
    // In a real app, this would make an API call to refresh the listing
    console.log(`Refreshing platform ${platformId}`);
    
    // For demonstration, we'll update the dates
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            publishedDate: new Date(),
            expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 3))
          } 
        : platform
    );
    setPlatforms(updatedPlatforms);
  };
  
  // Request a boost
  const handleRequestBoost = (platformId: string) => {
    // In a real app, this would make an API call to request a boost
    console.log(`Requesting boost for platform ${platformId}`);
    
    // For demonstration, we'll increase the views, clicks, and leads
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            views: platform.views + Math.floor(platform.views * 0.2), // 20% increase
            clicks: platform.clicks + Math.floor(platform.clicks * 0.25), // 25% increase
            leads: platform.leads + Math.floor(platform.leads * 0.15) // 15% increase
          } 
        : platform
    );
    setPlatforms(updatedPlatforms);
  };
  
  return (
    <Box>
      {/* Header Section */}
      <Card 
        sx={{ 
          bgcolor: '#f5f7fa',
          boxShadow: 3,
          borderRadius: 2,
          p: 3, 
          mb: 3 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CampaignIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Marketing Channels
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddPlatform}
          >
            Add Platform
          </Button>
        </Box>
        
        {/* Property Info Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Property:</strong> {property.address}, {property.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.size} m² • {property.rooms} rooms • {property.type}
          </Typography>
        </Box>
        
        {/* Performance Metrics Cards */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={6} sm={3} md={1.5} lg={1.25}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 4px 20px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
                  },
                }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  p: 0.5, 
                  bgcolor: 'primary.main', 
                  borderBottomLeftRadius: 8,
                  zIndex: 1
                }}>
                  <VisibilityIcon sx={{ color: 'white', fontSize: '0.9rem', display: 'block' }} />
                </Box>
                <CardContent sx={{ p: 1, pt: 1.5, pb: 1.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px', fontSize: '0.65rem' }}>
                    Views
                  </Typography>
                  <Typography variant="h6" component="div" color="primary.main" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {totalViews.toLocaleString()}
                  </Typography>
                  {/* Spacer to align with other cards */}
                  <Box sx={{ height: 22 }} /> {/* This height approximates the space taken by the progress bars and indicators in other cards */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5} lg={1.25}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.info.light, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.15)} 100%)`,
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 4px 20px 0 ${alpha(theme.palette.info.main, 0.25)}`,
                  },
                }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  p: 0.5, 
                  bgcolor: 'info.main', 
                  borderBottomLeftRadius: 8,
                  zIndex: 1
                }}>
                  <MouseIcon sx={{ color: 'white', fontSize: '0.9rem', display: 'block' }} />
                </Box>
                <CardContent sx={{ p: 1, pt: 1.5, pb: 1.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px', fontSize: '0.65rem' }}>
                    Clicks
                  </Typography>
                  <Typography variant="h6" component="div" color="info.main" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {totalClicks.toLocaleString()}
                  </Typography>
                  <Box sx={{ 
                    mt: 0.75, 
                    height: 3, 
                    borderRadius: 1.5, 
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      height: '100%', 
                      width: `${Math.min(clickThroughRate * 2, 100)}%`, 
                      bgcolor: 'info.main',
                      borderRadius: 1.5
                    }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, fontSize: '0.65rem', display: 'flex', alignItems: 'center' }}>
                    CTR {clickThroughRate.toFixed(1)}%
                    {clickThroughRate > 5 && (
                      <TrendingUpIcon sx={{ color: 'success.main', ml: 0.5, fontSize: '0.7rem' }} />
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5} lg={1.25}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.05)} 0%, ${alpha(theme.palette.success.main, 0.15)} 100%)`,
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 4px 20px 0 ${alpha(theme.palette.success.main, 0.25)}`,
                  },
                }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  p: 0.5, 
                  bgcolor: 'success.main', 
                  borderBottomLeftRadius: 8,
                  zIndex: 1
                }}>
                  <PersonAddIcon sx={{ color: 'white', fontSize: '0.9rem', display: 'block' }} />
                </Box>
                <CardContent sx={{ p: 1, pt: 1.5, pb: 1.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px', fontSize: '0.65rem' }}>
                    Potential Leads
                  </Typography>
                  <Typography variant="h6" component="div" color="success.main" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {totalLeads.toLocaleString()}
                  </Typography>
                  <Box sx={{ 
                    mt: 0.75, 
                    height: 3, 
                    borderRadius: 1.5, 
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      height: '100%', 
                      width: `${Math.min(conversionRate * 5, 100)}%`, 
                      bgcolor: 'success.main',
                      borderRadius: 1.5
                    }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, fontSize: '0.65rem', display: 'flex', alignItems: 'center' }}>
                    Conv {conversionRate.toFixed(1)}%
                    {conversionRate > 3 && (
                      <TrendingUpIcon sx={{ color: 'success.main', ml: 0.5, fontSize: '0.7rem' }} />
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={1.5} lg={1.25}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.15)} 100%)`,
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 4px 20px 0 ${alpha(theme.palette.warning.main, 0.25)}`,
                  },
                }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  p: 0.5, 
                  bgcolor: 'warning.main', 
                  borderBottomLeftRadius: 8,
                  zIndex: 1
                }}>
                  <AppsIcon sx={{ color: 'white', fontSize: '0.9rem', display: 'block' }} />
                </Box>
                <CardContent sx={{ p: 1, pt: 1.5, pb: 1.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.5px', fontSize: '0.65rem' }}>
                    Platforms
                  </Typography>
                  <Typography variant="h6" component="div" color="warning.main" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {platforms.filter(p => p.status === 'active').length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    {Array.from({ length: Math.min(platforms.length, 5) }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          mr: 0.5,
                          bgcolor: i < platforms.filter(p => p.status === 'active').length ? 'warning.main' : (theme) => alpha(theme.palette.warning.main, 0.2)
                        }}
                      />
                    ))}
                    <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.65rem', color: 'text.secondary' }}>
                      of {platforms.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        {/* Filter Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">
            Marketing Platforms
          </Typography>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filterStatus}
              label="Filter by Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Platforms</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
              <MenuItem value="not_published">Not Published</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {/* Marketing Platforms Table */}
        <Card 
          sx={{ 
            boxShadow: 2, 
            borderRadius: 2,
            overflow: 'hidden',
            background: (theme) => alpha(theme.palette.background.paper, 0.98),
          }}
        >
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Platform</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Published</strong></TableCell>
                  <TableCell><strong>Expires</strong></TableCell>
                  <TableCell><strong>Performance</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlatforms.map((platform) => (
                  <TableRow key={platform.id} hover>
                    <TableCell>
                      <Typography variant="body1">{platform.name}</Typography>
                      {platform.url && (
                        <Typography variant="caption" color="text.secondary">
                          ID: {platform.id}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(platform.status)} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStatusColor(platform.status), 
                          color: 'white',
                          fontWeight: 'medium'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{formatDate(platform.publishedDate)}</TableCell>
                    <TableCell>{platform.expiryDate ? formatDate(platform.expiryDate) : 'No Expiry'}</TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption">Views</Typography>
                          <Typography variant="caption">{platform.views.toLocaleString()}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption">Clicks</Typography>
                          <Typography variant="caption">{platform.clicks.toLocaleString()}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption">Leads</Typography>
                          <Typography variant="caption">{platform.leads.toLocaleString()}</Typography>
                        </Box>
                        {platform.views > 0 && (
                          <LinearProgress 
                            variant="determinate" 
                            value={(platform.clicks / platform.views) * 100}
                            sx={{ mt: 1, height: 4, borderRadius: 1 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        {platform.status === 'active' && platform.url && (
                          <Tooltip title="View Listing">
                            <IconButton size="small">
                              <LaunchIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit Platform">
                          <IconButton size="small" onClick={() => handleEditPlatform(platform)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Refresh Listing">
                          <IconButton 
                            size="small"
                            onClick={() => handleRefreshPlatform(platform.id)}
                            disabled={platform.status === 'not_published'}
                          >
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Request Boost">
                          <IconButton 
                            size="small"
                            onClick={() => handleRequestBoost(platform.id)}
                            disabled={platform.status !== 'active'}
                          >
                            <TrendingUpIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Card>
      
      {/* Performance by Platform */}
      <Card 
        sx={{ 
          bgcolor: '#f5f7fa',
          boxShadow: 3,
          borderRadius: 2,
          p: 3, 
          mb: 3 
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Performance by Platform
        </Typography>
        
        <Grid container spacing={3}>
          {platforms
            .filter(platform => platform.views > 0)
            .sort((a, b) => b.views - a.views)
            .map((platform) => (
              <Grid item xs={12} md={6} key={platform.id}>
                <Card 
                  sx={{ 
                    boxShadow: 2, 
                    borderRadius: 2,
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: 4,
                    },
                    background: (theme) => alpha(theme.palette.background.paper, 0.98),
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" component="h3">{platform.name}</Typography>
                      <Chip 
                        label={getStatusLabel(platform.status)} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStatusColor(platform.status), 
                          color: 'white',
                          fontWeight: 'medium'
                        }} 
                      />
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" component="p">{platform.views.toLocaleString()}</Typography>
                          <Typography variant="caption" color="text.secondary">Views</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" component="p">{platform.clicks.toLocaleString()}</Typography>
                          <Typography variant="caption" color="text.secondary">Clicks</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" component="p">{platform.leads.toLocaleString()}</Typography>
                          <Typography variant="caption" color="text.secondary">Leads</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption">Click-through Rate</Typography>
                        <Typography variant="caption">{((platform.clicks / platform.views) * 100).toFixed(2)}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(platform.clicks / platform.views) * 100}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption">Conversion Rate</Typography>
                        <Typography variant="caption">{platform.clicks > 0 ? ((platform.leads / platform.clicks) * 100).toFixed(2) : 0}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={platform.clicks > 0 ? (platform.leads / platform.clicks) * 100 : 0}
                        sx={{ height: 6, borderRadius: 1 }}
                        color="secondary"
                      />
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        Published: {formatDate(platform.publishedDate)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Expires: {platform.expiryDate ? formatDate(platform.expiryDate) : 'No Expiry'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        
        {platforms.filter(platform => platform.views > 0).length === 0 && (
          <Card
            sx={{ 
              boxShadow: 2, 
              borderRadius: 2,
              textAlign: 'center',
              py: 4,
              background: (theme) => alpha(theme.palette.background.paper, 0.98),
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No performance data available yet.
            </Typography>
          </Card>
        )}
      </Card>
      
      {/* Edit Platform Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseEditDialog} 
        maxWidth="sm"
        fullWidth
      >
        {selectedPlatform && (
          <>
            <DialogTitle>Edit Platform: {selectedPlatform.name}</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="platform-status-label">Status</InputLabel>
                    <Select
                      labelId="platform-status-label"
                      value={selectedPlatform.status}
                      label="Status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="expired">Expired</MenuItem>
                      <MenuItem value="not_published">Not Published</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Published Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={selectedPlatform.publishedDate ? new Date(selectedPlatform.publishedDate).toISOString().split('T')[0] : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expiry Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={selectedPlatform.expiryDate ? new Date(selectedPlatform.expiryDate).toISOString().split('T')[0] : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Listing URL"
                    fullWidth
                    margin="normal"
                    value={selectedPlatform.url}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Views"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={selectedPlatform.views}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Clicks"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={selectedPlatform.clicks}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Leads"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={selectedPlatform.leads}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                color="error" 
                startIcon={<DeleteIcon />}
              >
                Remove Platform
              </Button>
              <Box sx={{ flex: 1 }} />
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleCloseEditDialog}>
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Add New Platform Dialog */}
      <Dialog 
        open={openNewPlatformDialog} 
        onClose={handleCloseNewPlatformDialog} 
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Marketing Platform</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="new-platform-name-label">Platform</InputLabel>
                <Select
                  labelId="new-platform-name-label"
                  label="Platform"
                  defaultValue=""
                >
                  <MenuItem value="hemnet">Hemnet</MenuItem>
                  <MenuItem value="blocket">Blocket Bostad</MenuItem>
                  <MenuItem value="facebook">Facebook Ads</MenuItem>
                  <MenuItem value="google">Google Ads</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="website">Company Website</MenuItem>
                  <MenuItem value="magazine">Real Estate Magazine</MenuItem>
                  <MenuItem value="direct_mail">Direct Mail Campaign</MenuItem>
                  <MenuItem value="other">Other Platform</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="new-platform-status-label">Status</InputLabel>
                <Select
                  labelId="new-platform-status-label"
                  label="Status"
                  defaultValue="pending"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="not_published">Not Published</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Published Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Listing URL"
                fullWidth
                margin="normal"
                placeholder="https://"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewPlatformDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseNewPlatformDialog}>
            Add Platform
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Marketing; 