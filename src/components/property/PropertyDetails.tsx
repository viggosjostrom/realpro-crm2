import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  SquareFoot as SizeIcon,
  MeetingRoom as RoomsIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  Apartment as ApartmentIcon
} from '@mui/icons-material';
import { Property } from '@/lib/types';

// Helper function to format price in SEK
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(price);
};

// Helper function to format date
const formatDate = (date: Date | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('sv-SE');
};

// Helper function to get property type label
const getPropertyTypeLabel = (type: string): string => {
  switch (type) {
    case 'apartment':
      return 'Apartment';
    case 'house':
      return 'House';
    case 'villa':
      return 'Villa';
    case 'townhouse':
      return 'Townhouse';
    case 'cottage':
      return 'Cottage';
    default:
      return type;
  }
};

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  // Additional property details (mock data for now)
  const additionalDetails = {
    yearBuilt: 1985,
    renovationYear: 2018,
    floor: property.type === 'apartment' ? 3 : null,
    totalFloors: property.type === 'apartment' ? 5 : null,
    elevator: property.type === 'apartment' ? true : null,
    balcony: true,
    garage: property.type !== 'apartment',
    parking: true,
    monthlyFee: property.type === 'apartment' ? 3500 : null,
    propertyTax: property.type !== 'apartment' ? 8500 : null,
    energyRating: 'B',
    heatingSystem: 'District heating',
    constructionMaterial: 'Brick and concrete',
    roof: property.type !== 'apartment' ? 'Tile' : null,
    windows: 'Triple glazed',
    internetConnection: 'Fiber optic',
    tvConnection: 'Cable',
    garden: property.type !== 'apartment' ? 350 : null, // garden size in sqm
    plotSize: property.type !== 'apartment' ? 750 : null, // plot size in sqm
  };

  return (
    <Box>
      {/* Main Property Details Section */}
      <Grid container spacing={3}>
        {/* Left Column - Property Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HomeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                Property Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '40%', fontWeight: 'bold' }}>
                      Property Type
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ApartmentIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {getPropertyTypeLabel(property.type)}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Address
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {property.address}, {property.postalCode} {property.city}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Size
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SizeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {property.size} m²
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Rooms
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RoomsIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {property.rooms} rooms
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Price
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {formatPrice(property.price)}
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Listed Date
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {formatDate(property.listedAt)}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {property.status === 'sold' && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Sold Date
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          {formatDate(property.soldAt)}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {property.type === 'apartment' && additionalDetails.monthlyFee && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Monthly Fee
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(additionalDetails.monthlyFee)}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {property.type !== 'apartment' && additionalDetails.propertyTax && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Property Tax (Annual)
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MoneyIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(additionalDetails.propertyTax)}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Building Details */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ApartmentIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                Building Details
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '40%', fontWeight: 'bold' }}>
                      Year Built
                    </TableCell>
                    <TableCell>{additionalDetails.yearBuilt}</TableCell>
                  </TableRow>
                  {additionalDetails.renovationYear && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Last Renovation
                      </TableCell>
                      <TableCell>{additionalDetails.renovationYear}</TableCell>
                    </TableRow>
                  )}
                  {property.type === 'apartment' && (
                    <>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Floor
                        </TableCell>
                        <TableCell>{additionalDetails.floor} of {additionalDetails.totalFloors}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Elevator
                        </TableCell>
                        <TableCell>{additionalDetails.elevator ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Energy Rating
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={additionalDetails.energyRating} 
                        size="small" 
                        color={additionalDetails.energyRating === 'A' || additionalDetails.energyRating === 'B' ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Heating System
                    </TableCell>
                    <TableCell>{additionalDetails.heatingSystem}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Construction Material
                    </TableCell>
                    <TableCell>{additionalDetails.constructionMaterial}</TableCell>
                  </TableRow>
                  {property.type !== 'apartment' && additionalDetails.roof && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Roof
                      </TableCell>
                      <TableCell>{additionalDetails.roof}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Windows
                    </TableCell>
                    <TableCell>{additionalDetails.windows}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Features and Amenities */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h2">
                Features and Amenities
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold' }}>
                          Balcony
                        </TableCell>
                        <TableCell>{additionalDetails.balcony ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                      {property.type !== 'apartment' && (
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Garage
                          </TableCell>
                          <TableCell>{additionalDetails.garage ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Parking
                        </TableCell>
                        <TableCell>{additionalDetails.parking ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold' }}>
                          Internet Connection
                        </TableCell>
                        <TableCell>{additionalDetails.internetConnection}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          TV Connection
                        </TableCell>
                        <TableCell>{additionalDetails.tvConnection}</TableCell>
                      </TableRow>
                      {property.type !== 'apartment' && additionalDetails.garden && (
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Garden Size
                          </TableCell>
                          <TableCell>{additionalDetails.garden} m²</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Property Images and Description */}
        <Grid item xs={12} md={4}>
          {/* Property Images */}
          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              height="250"
              image={property.images[0] || '/properties/property-placeholder.jpg'}
              alt={property.address}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Main property image
              </Typography>
            </CardContent>
          </Card>

          {/* Property Description */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Property Description
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              {property.description || 'No description available.'}
            </Typography>
          </Paper>

          {/* Plot Information (for houses, villas, etc.) */}
          {property.type !== 'apartment' && additionalDetails.plotSize && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Plot Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold' }}>
                        Plot Size
                      </TableCell>
                      <TableCell>{additionalDetails.plotSize} m²</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Garden Size
                      </TableCell>
                      <TableCell>{additionalDetails.garden} m²</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetails; 