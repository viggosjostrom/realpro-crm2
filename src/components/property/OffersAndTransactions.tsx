import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Tab,
  Tabs,
  Avatar,
  alpha
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Check as CheckIcon,
  Download as DownloadIcon,
  ShowChart as ShowChartIcon
} from '@mui/icons-material';
import { Property, Client, OfferStatus } from '@/lib/types';
import { mockClients, mockOffers, mockTransactions } from '@/lib/utils/mockData';

// Helper function to format price in SEK
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price);
};

// Helper function to format date
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

// Component props
interface OffersAndTransactionsProps {
  property: Property;
}

// Get offer status color
const getOfferStatusColor = (status: OfferStatus): string => {
  switch (status) {
    case 'submitted':
      return '#3f51b5'; // Indigo
    case 'negotiating':
      return '#ff9800'; // Orange
    case 'accepted':
      return '#4caf50'; // Green
    case 'rejected':
      return '#f44336'; // Red
    case 'withdrawn':
      return '#9e9e9e'; // Grey
    default:
      return '#757575'; // Default grey
  }
};

// Get offer status label
const getOfferStatusLabel = (status: OfferStatus): string => {
  switch (status) {
    case 'submitted':
      return 'Submitted';
    case 'negotiating':
      return 'Negotiating';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    case 'withdrawn':
      return 'Withdrawn';
    default:
      return status;
  }
};

// Main component
const OffersAndTransactions: React.FC<OffersAndTransactionsProps> = ({ property }) => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<Client | null>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerNotes, setOfferNotes] = useState('');

  // Filter offers for this property
  const propertyOffers = mockOffers.filter(offer => offer.propertyId === property.id);
  
  // Get the transaction for this property (if exists)
  const propertyTransaction = mockTransactions.find(transaction => transaction.propertyId === property.id);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Open add offer dialog
  const handleOpenAddOfferDialog = () => {
    setOpenAddOfferDialog(true);
  };

  // Close add offer dialog
  const handleCloseAddOfferDialog = () => {
    setOpenAddOfferDialog(false);
    setSelectedBuyer(null);
    setOfferAmount('');
    setOfferNotes('');
  };

  // Get client name by ID
  const getClientName = (clientId: string): string => {
    const client = mockClients.find(client => client.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
  };

  // Get client by ID
  const getClient = (clientId: string): Client | undefined => {
    return mockClients.find(client => client.id === clientId);
  };

  // Calculate sale statistics
  const calculateSaleStats = () => {
    if (property.status !== 'sold' || !property.soldAt || !property.listedAt || !propertyTransaction) {
      return null;
    }

    const listedDate = new Date(property.listedAt);
    const soldDate = new Date(property.soldAt);
    const daysOnMarket = Math.floor((soldDate.getTime() - listedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const initialPrice = property.price;
    const finalPrice = propertyTransaction.amount;
    const priceDifference = finalPrice - initialPrice;
    const percentageDifference = (priceDifference / initialPrice) * 100;

    return {
      daysOnMarket,
      initialPrice,
      finalPrice,
      priceDifference,
      percentageDifference
    };
  };

  // Render the offers table
  const renderOffersTable = () => {
    if (propertyOffers.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No offers have been received for this property yet.
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell><strong>Buyer</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Expiry</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertyOffers.map((offer) => {
              const buyer = getClient(offer.buyerId);
              
              return (
                <TableRow key={offer.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                        {buyer?.firstName.charAt(0)}
                      </Avatar>
                      {getClientName(offer.buyerId)}
                    </Box>
                  </TableCell>
                  <TableCell>{formatPrice(offer.amount)}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getOfferStatusLabel(offer.status)} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getOfferStatusColor(offer.status),
                        color: 'white',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>{formatDate(offer.date)}</TableCell>
                  <TableCell>{formatDate(offer.expiryDate)}</TableCell>
                  <TableCell>{offer.notes || 'No notes'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="Edit Offer">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Offer">
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {offer.status === 'submitted' && (
                        <Tooltip title="Accept Offer">
                          <IconButton size="small" color="success">
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render the price negotiations card
  const renderPriceNegotiations = () => {
    // Only show for properties with offers in negotiation
    const negotiatingOffers = propertyOffers.filter(offer => offer.status === 'negotiating');
    
    if (negotiatingOffers.length === 0) {
      return (
        <Card sx={{ 
          boxShadow: 2, 
          borderRadius: 2,
          mb: 3 
        }}>
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MoneyIcon color="primary" sx={{ mr: 1 }} />
              Price Negotiations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No active price negotiations at the moment.
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card sx={{ 
        boxShadow: 2, 
        borderRadius: 2,
        mb: 3 
      }}>
        <CardContent>
          <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MoneyIcon color="primary" sx={{ mr: 1 }} />
            Price Negotiations
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Buyer</strong></TableCell>
                  <TableCell><strong>Current Offer</strong></TableCell>
                  <TableCell><strong>vs. Asking</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {negotiatingOffers.map((offer) => {
                  const difference = offer.amount - property.price;
                  const percentDiff = (difference / property.price) * 100;
                  const diffDisplay = `${formatPrice(difference)} (${percentDiff.toFixed(1)}%)`;
                  
                  return (
                    <TableRow key={offer.id}>
                      <TableCell>{getClientName(offer.buyerId)}</TableCell>
                      <TableCell>{formatPrice(offer.amount)}</TableCell>
                      <TableCell sx={{ color: difference >= 0 ? 'success.main' : 'error.main' }}>
                        {diffDisplay}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getOfferStatusLabel(offer.status)} 
                          size="small" 
                          sx={{ 
                            backgroundColor: getOfferStatusColor(offer.status),
                            color: 'white',
                            fontWeight: 'medium'
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          sx={{ textTransform: 'none', mr: 1 }}
                        >
                          Counter
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="success" 
                          sx={{ textTransform: 'none' }}
                        >
                          Accept
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

  // Render accepted offer and contract details
  const renderAcceptedOffer = () => {
    const acceptedOffer = propertyOffers.find(offer => offer.status === 'accepted');
    
    if (!acceptedOffer && property.status !== 'sold') {
      return (
        <Card sx={{ 
          boxShadow: 2, 
          borderRadius: 2,
          mb: 3 
        }}>
          <CardContent>
            <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckIcon color="primary" sx={{ mr: 1 }} />
              Accepted Offer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No accepted offer yet.
            </Typography>
          </CardContent>
        </Card>
      );
    }

    // Use either the accepted offer or the transaction's details
    const offerToShow = acceptedOffer || (propertyTransaction ? 
      { 
        buyerId: propertyTransaction.buyerId, 
        amount: propertyTransaction.amount, 
        date: propertyTransaction.completionDate || new Date(),
        notes: propertyTransaction.notes
      } : null);
    
    if (!offerToShow) return null;

    return (
      <Card sx={{ 
        boxShadow: 2, 
        borderRadius: 2,
        mb: 3 
      }}>
        <CardContent>
          <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckIcon color="primary" sx={{ mr: 1 }} />
            {property.status === 'sold' ? 'Final Sale Details' : 'Accepted Offer'}
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Buyer</Typography>
                <Typography variant="body1">{getClientName(offerToShow.buyerId)}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Amount</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {formatPrice(offerToShow.amount)}
                </Typography>
              </Box>
              
              {property.status === 'sold' && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Completion Date</Typography>
                  <Typography variant="body1">{formatDate(offerToShow.date)}</Typography>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              {propertyTransaction && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Transaction Status</Typography>
                  <Chip 
                    label={propertyTransaction.status.charAt(0).toUpperCase() + propertyTransaction.status.slice(1)} 
                    size="small" 
                    color={propertyTransaction.status === 'completed' ? 'success' : 'warning'} 
                    sx={{ fontWeight: 'medium' }} 
                  />
                </Box>
              )}
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Notes</Typography>
                <Typography variant="body2">{offerToShow.notes || 'No notes'}</Typography>
              </Box>
              
              {propertyTransaction?.contractUrl && (
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      // In a real app, this would trigger the file download
                      console.log('Downloading contract:', propertyTransaction.contractUrl);
                    }}
                    sx={{ textTransform: 'none' }}
                  >
                    Download Sale Contract
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Render sale statistics
  const renderSaleStatistics = () => {
    const stats = calculateSaleStats();
    
    if (!stats) {
      return null; // Only show for sold properties
    }

    return (
      <Card sx={{ 
        boxShadow: 2, 
        borderRadius: 2
      }}>
        <CardContent>
          <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ShowChartIcon color="primary" sx={{ mr: 1 }} />
            Sale Statistics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">Time on Market</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stats.daysOnMarket} days
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">Initial Price</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {formatPrice(stats.initialPrice)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">Final Price</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {formatPrice(stats.finalPrice)}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: stats.percentageDifference >= 0 ? 'success.main' : 'error.main',
                  fontWeight: 'medium'
                }}>
                  {stats.percentageDifference >= 0 ? '+' : ''}{stats.percentageDifference.toFixed(1)}% 
                  ({formatPrice(stats.priceDifference)})
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card 
      sx={{ 
        bgcolor: '#f5f7fa',
        boxShadow: 1,
        borderRadius: 2,
        p: 3,
        mb: 3 
      }}
    >
      <Box sx={{ 
        '& .detail-card': {
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 5,
          },
          mb: 3,
          background: (theme) => alpha(theme.palette.background.paper, 0.98),
        },
        '& .card-header': {
          p: 2,
          pb: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '& .content-area': {
          p: 2,
        },
      }}>
        <Card className="detail-card">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'medium',
                fontSize: '0.95rem'
              },
              px: 2,
              pt: 1
            }}
          >
            <Tab label="Offers" />
            <Tab label="Transaction Details" />
          </Tabs>
          
          <Box className="content-area">
            {/* Offers Tab */}
            {tabValue === 0 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Offers Received
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddOfferDialog}
                    sx={{ textTransform: 'none' }}
                  >
                    Add New Offer
                  </Button>
                </Box>
                
                {/* Offers Table */}
                <Card sx={{ 
                  boxShadow: 2, 
                  borderRadius: 2, 
                  mb: 3,
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        All Offers
                      </Typography>
                    </Box>
                    {renderOffersTable()}
                  </CardContent>
                </Card>
                
                {/* Price Negotiations Card */}
                {renderPriceNegotiations()}
              </>
            )}
            
            {/* Transaction Details Tab */}
            {tabValue === 1 && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    Transaction Details
                  </Typography>
                </Box>
                
                {/* Accepted Offer & Contract Details Card */}
                {renderAcceptedOffer()}
                
                {/* Sale Statistics Card */}
                {renderSaleStatistics()}
              </>
            )}
          </Box>
        </Card>
      </Box>
      
      {/* Add Offer Dialog */}
      <Dialog open={openAddOfferDialog} onClose={handleCloseAddOfferDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Offer</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Property: {property.address}, {property.city}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Buyer</Typography>
            <TextField
              select
              fullWidth
              label="Select Buyer"
              value={selectedBuyer ? selectedBuyer.id : ''}
              onChange={(e) => {
                const buyer = mockClients.find(client => client.id === e.target.value);
                setSelectedBuyer(buyer || null);
              }}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              size="small"
            >
              <option value="" disabled>
                Select a buyer
              </option>
              {mockClients
                .filter(client => client.type === 'buyer' || client.type === 'both')
                .map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
            </TextField>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Offer Amount</Typography>
            <TextField
              fullWidth
              label="Amount (SEK)"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              variant="outlined"
              size="small"
              type="number"
              InputProps={{
                startAdornment: <Typography variant="body2" sx={{ mr: 1 }}>SEK</Typography>,
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Notes</Typography>
            <TextField
              fullWidth
              label="Notes"
              value={offerNotes}
              onChange={(e) => setOfferNotes(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddOfferDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseAddOfferDialog}>Add Offer</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OffersAndTransactions; 