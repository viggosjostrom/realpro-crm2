import React, { useState } from 'react';
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
  CardMedia,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import {
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  SquareFoot as SizeIcon,
  MeetingRoom as RoomsIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  Apartment as ApartmentIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
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

  // Track which sections are in edit mode
  const [editSections, setEditSections] = useState({
    propertyInfo: false,
    buildingDetails: false,
    featuresAmenities: false, 
    propertyDescription: false,
    plotInfo: false
  });

  // Create editable versions of the data
  const [editableProperty, setEditableProperty] = useState({ ...property });
  const [editableDetails, setEditableDetails] = useState({ ...additionalDetails });

  // Toggle edit mode for a section
  const toggleEditMode = (section: keyof typeof editSections) => {
    setEditSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    // If we're exiting edit mode, reset to original values
    // (since we're not saving in this demo)
    if (editSections[section]) {
      setEditableProperty({ ...property });
      setEditableDetails({ ...additionalDetails });
    }
  };

  // Handle input changes for editable property fields
  const handlePropertyChange = (field: keyof Property, value: any) => {
    setEditableProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle input changes for additional details
  const handleDetailsChange = (field: keyof typeof additionalDetails, value: any) => {
    setEditableDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box>
      {/* Main Property Details Section */}
      <Grid container spacing={3}>
        {/* Left Column - Property Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Property Information
                </Typography>
              </Box>
              <Button 
                startIcon={editSections.propertyInfo ? <CancelIcon /> : <EditIcon />}
                variant={editSections.propertyInfo ? "outlined" : "contained"}
                color={editSections.propertyInfo ? "error" : "primary"}
                size="small"
                onClick={() => toggleEditMode('propertyInfo')}
              >
                {editSections.propertyInfo ? 'Cancel' : 'Edit'}
              </Button>
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
                        {editSections.propertyInfo ? (
                          <TextField
                            size="small"
                            value={getPropertyTypeLabel(editableProperty.type)}
                            onChange={(e) => handlePropertyChange('type', e.target.value.toLowerCase())}
                            variant="outlined"
                            fullWidth
                          />
                        ) : (
                          getPropertyTypeLabel(property.type)
                        )}
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
                        {editSections.propertyInfo ? (
                          <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                            <TextField
                              size="small"
                              value={editableProperty.address}
                              onChange={(e) => handlePropertyChange('address', e.target.value)}
                              variant="outlined"
                              label="Address"
                              fullWidth
                            />
                            <TextField
                              size="small"
                              value={editableProperty.postalCode}
                              onChange={(e) => handlePropertyChange('postalCode', e.target.value)}
                              variant="outlined"
                              label="Postal Code"
                            />
                            <TextField
                              size="small"
                              value={editableProperty.city}
                              onChange={(e) => handlePropertyChange('city', e.target.value)}
                              variant="outlined"
                              label="City"
                            />
                          </Box>
                        ) : (
                          `${property.address}, ${property.postalCode} ${property.city}`
                        )}
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
                        {editSections.propertyInfo ? (
                          <TextField
                            size="small"
                            value={editableProperty.size}
                            onChange={(e) => handlePropertyChange('size', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                            InputProps={{ endAdornment: <Typography variant="body2">m²</Typography> }}
                          />
                        ) : (
                          `${property.size} m²`
                        )}
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
                        {editSections.propertyInfo ? (
                          <TextField
                            size="small"
                            value={editableProperty.rooms}
                            onChange={(e) => handlePropertyChange('rooms', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                            InputProps={{ endAdornment: <Typography variant="body2">rooms</Typography> }}
                          />
                        ) : (
                          `${property.rooms} rooms`
                        )}
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
                        {editSections.propertyInfo ? (
                          <TextField
                            size="small"
                            value={editableProperty.price}
                            onChange={(e) => handlePropertyChange('price', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                            InputProps={{ startAdornment: <Typography variant="body2">SEK </Typography> }}
                          />
                        ) : (
                          formatPrice(property.price)
                        )}
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
                        {editSections.propertyInfo ? (
                          <TextField
                            size="small"
                            value={property.listedAt ? new Date(property.listedAt).toISOString().split('T')[0] : ''}
                            onChange={(e) => handlePropertyChange('listedAt', new Date(e.target.value))}
                            variant="outlined"
                            type="date"
                          />
                        ) : (
                          formatDate(property.listedAt)
                        )}
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
                          {editSections.propertyInfo ? (
                            <TextField
                              size="small"
                              value={property.soldAt ? new Date(property.soldAt).toISOString().split('T')[0] : ''}
                              onChange={(e) => handlePropertyChange('soldAt', new Date(e.target.value))}
                              variant="outlined"
                              type="date"
                            />
                          ) : (
                            formatDate(property.soldAt)
                          )}
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
                          {editSections.propertyInfo ? (
                            <TextField
                              size="small"
                              value={editableDetails.monthlyFee}
                              onChange={(e) => handleDetailsChange('monthlyFee', Number(e.target.value))}
                              variant="outlined"
                              type="number"
                              InputProps={{ startAdornment: <Typography variant="body2">SEK </Typography> }}
                            />
                          ) : (
                            new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(additionalDetails.monthlyFee)
                          )}
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
                          {editSections.propertyInfo ? (
                            <TextField
                              size="small"
                              value={editableDetails.propertyTax}
                              onChange={(e) => handleDetailsChange('propertyTax', Number(e.target.value))}
                              variant="outlined"
                              type="number"
                              InputProps={{ startAdornment: <Typography variant="body2">SEK </Typography> }}
                            />
                          ) : (
                            new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(additionalDetails.propertyTax)
                          )}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ApartmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Building Details
                </Typography>
              </Box>
              <Button 
                startIcon={editSections.buildingDetails ? <CancelIcon /> : <EditIcon />}
                variant={editSections.buildingDetails ? "outlined" : "contained"}
                color={editSections.buildingDetails ? "error" : "primary"}
                size="small"
                onClick={() => toggleEditMode('buildingDetails')}
              >
                {editSections.buildingDetails ? 'Cancel' : 'Edit'}
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: '40%', fontWeight: 'bold' }}>
                      Year Built
                    </TableCell>
                    <TableCell>
                      {editSections.buildingDetails ? (
                        <TextField
                          size="small"
                          value={editableDetails.yearBuilt}
                          onChange={(e) => handleDetailsChange('yearBuilt', Number(e.target.value))}
                          variant="outlined"
                          type="number"
                        />
                      ) : (
                        additionalDetails.yearBuilt
                      )}
                    </TableCell>
                  </TableRow>
                  {additionalDetails.renovationYear && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Last Renovation
                      </TableCell>
                      <TableCell>
                        {editSections.buildingDetails ? (
                          <TextField
                            size="small"
                            value={editableDetails.renovationYear}
                            onChange={(e) => handleDetailsChange('renovationYear', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                          />
                        ) : (
                          additionalDetails.renovationYear
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                  {property.type === 'apartment' && (
                    <>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Floor
                        </TableCell>
                        <TableCell>
                          {editSections.buildingDetails ? (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <TextField
                                size="small"
                                value={editableDetails.floor}
                                onChange={(e) => handleDetailsChange('floor', Number(e.target.value))}
                                variant="outlined"
                                type="number"
                              />
                              <Typography variant="body2">of</Typography>
                              <TextField
                                size="small"
                                value={editableDetails.totalFloors}
                                onChange={(e) => handleDetailsChange('totalFloors', Number(e.target.value))}
                                variant="outlined"
                                type="number"
                              />
                            </Box>
                          ) : (
                            `${additionalDetails.floor} of ${additionalDetails.totalFloors}`
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Elevator
                        </TableCell>
                        <TableCell>
                          {editSections.buildingDetails ? (
                            <TextField
                              select
                              size="small"
                              value={editableDetails.elevator ? 'Yes' : 'No'}
                              onChange={(e) => handleDetailsChange('elevator', e.target.value === 'Yes')}
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </TextField>
                          ) : (
                            additionalDetails.elevator ? 'Yes' : 'No'
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Energy Rating
                    </TableCell>
                    <TableCell>
                      {editSections.buildingDetails ? (
                        <TextField
                          select
                          size="small"
                          value={editableDetails.energyRating}
                          onChange={(e) => handleDetailsChange('energyRating', e.target.value)}
                          variant="outlined"
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                        </TextField>
                      ) : (
                        <Chip 
                          label={additionalDetails.energyRating} 
                          size="small" 
                          color={additionalDetails.energyRating === 'A' || additionalDetails.energyRating === 'B' ? 'success' : 'default'}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Heating System
                    </TableCell>
                    <TableCell>
                      {editSections.buildingDetails ? (
                        <TextField
                          size="small"
                          value={editableDetails.heatingSystem}
                          onChange={(e) => handleDetailsChange('heatingSystem', e.target.value)}
                          variant="outlined"
                        />
                      ) : (
                        additionalDetails.heatingSystem
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Construction Material
                    </TableCell>
                    <TableCell>
                      {editSections.buildingDetails ? (
                        <TextField
                          size="small"
                          value={editableDetails.constructionMaterial}
                          onChange={(e) => handleDetailsChange('constructionMaterial', e.target.value)}
                          variant="outlined"
                        />
                      ) : (
                        additionalDetails.constructionMaterial
                      )}
                    </TableCell>
                  </TableRow>
                  {property.type !== 'apartment' && additionalDetails.roof && (
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Roof
                      </TableCell>
                      <TableCell>
                        {editSections.buildingDetails ? (
                          <TextField
                            size="small"
                            value={editableDetails.roof}
                            onChange={(e) => handleDetailsChange('roof', e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                        ) : (
                          additionalDetails.roof
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      Windows
                    </TableCell>
                    <TableCell>
                      {editSections.buildingDetails ? (
                        <TextField
                          size="small"
                          value={editableDetails.windows}
                          onChange={(e) => handleDetailsChange('windows', e.target.value)}
                          variant="outlined"
                          fullWidth
                        />
                      ) : (
                        additionalDetails.windows
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Features and Amenities */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Features and Amenities
                </Typography>
              </Box>
              <Button 
                startIcon={editSections.featuresAmenities ? <CancelIcon /> : <EditIcon />}
                variant={editSections.featuresAmenities ? "outlined" : "contained"}
                color={editSections.featuresAmenities ? "error" : "primary"}
                size="small"
                onClick={() => toggleEditMode('featuresAmenities')}
              >
                {editSections.featuresAmenities ? 'Cancel' : 'Edit'}
              </Button>
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
                        <TableCell>
                          {editSections.featuresAmenities ? (
                            <TextField
                              select
                              size="small"
                              value={editableDetails.balcony ? 'Yes' : 'No'}
                              onChange={(e) => handleDetailsChange('balcony', e.target.value === 'Yes')}
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </TextField>
                          ) : (
                            additionalDetails.balcony ? 'Yes' : 'No'
                          )}
                        </TableCell>
                      </TableRow>
                      {property.type !== 'apartment' && (
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Garage
                          </TableCell>
                          <TableCell>
                            {editSections.featuresAmenities ? (
                              <TextField
                                select
                                size="small"
                                value={editableDetails.garage ? 'Yes' : 'No'}
                                onChange={(e) => handleDetailsChange('garage', e.target.value === 'Yes')}
                                variant="outlined"
                                SelectProps={{
                                  native: true,
                                }}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </TextField>
                            ) : (
                              additionalDetails.garage ? 'Yes' : 'No'
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Parking
                        </TableCell>
                        <TableCell>
                          {editSections.featuresAmenities ? (
                            <TextField
                              select
                              size="small"
                              value={editableDetails.parking ? 'Yes' : 'No'}
                              onChange={(e) => handleDetailsChange('parking', e.target.value === 'Yes')}
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </TextField>
                          ) : (
                            additionalDetails.parking ? 'Yes' : 'No'
                          )}
                        </TableCell>
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
                        <TableCell>
                          {editSections.featuresAmenities ? (
                            <TextField
                              size="small"
                              value={editableDetails.internetConnection}
                              onChange={(e) => handleDetailsChange('internetConnection', e.target.value)}
                              variant="outlined"
                              fullWidth
                            />
                          ) : (
                            additionalDetails.internetConnection
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          TV Connection
                        </TableCell>
                        <TableCell>
                          {editSections.featuresAmenities ? (
                            <TextField
                              size="small"
                              value={editableDetails.tvConnection}
                              onChange={(e) => handleDetailsChange('tvConnection', e.target.value)}
                              variant="outlined"
                              fullWidth
                            />
                          ) : (
                            additionalDetails.tvConnection
                          )}
                        </TableCell>
                      </TableRow>
                      {property.type !== 'apartment' && additionalDetails.garden && (
                        <TableRow>
                          <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                            Garden Size
                          </TableCell>
                          <TableCell>
                            {editSections.featuresAmenities ? (
                              <TextField
                                size="small"
                                value={editableDetails.garden}
                                onChange={(e) => handleDetailsChange('garden', Number(e.target.value))}
                                variant="outlined"
                                type="number"
                                InputProps={{ endAdornment: <Typography variant="body2">m²</Typography> }}
                              />
                            ) : (
                              `${additionalDetails.garden} m²`
                            )}
                          </TableCell>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Property Description
              </Typography>
              <Button 
                startIcon={editSections.propertyDescription ? <CancelIcon /> : <EditIcon />}
                variant={editSections.propertyDescription ? "outlined" : "contained"}
                color={editSections.propertyDescription ? "error" : "primary"}
                size="small"
                onClick={() => toggleEditMode('propertyDescription')}
              >
                {editSections.propertyDescription ? 'Cancel' : 'Edit'}
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {editSections.propertyDescription ? (
              <TextField
                multiline
                fullWidth
                rows={4}
                value={editableProperty.description || ''}
                onChange={(e) => handlePropertyChange('description', e.target.value)}
                variant="outlined"
              />
            ) : (
              <Typography variant="body1" paragraph>
                {property.description || 'No description available.'}
              </Typography>
            )}
          </Paper>

          {/* Plot Information (for houses, villas, etc.) */}
          {property.type !== 'apartment' && additionalDetails.plotSize && (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Plot Information
                </Typography>
                <Button 
                  startIcon={editSections.plotInfo ? <CancelIcon /> : <EditIcon />}
                  variant={editSections.plotInfo ? "outlined" : "contained"}
                  color={editSections.plotInfo ? "error" : "primary"}
                  size="small"
                  onClick={() => toggleEditMode('plotInfo')}
                >
                  {editSections.plotInfo ? 'Cancel' : 'Edit'}
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold' }}>
                        Plot Size
                      </TableCell>
                      <TableCell>
                        {editSections.plotInfo ? (
                          <TextField
                            size="small"
                            value={editableDetails.plotSize}
                            onChange={(e) => handleDetailsChange('plotSize', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                            InputProps={{ endAdornment: <Typography variant="body2">m²</Typography> }}
                          />
                        ) : (
                          `${additionalDetails.plotSize} m²`
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                        Garden Size
                      </TableCell>
                      <TableCell>
                        {editSections.plotInfo ? (
                          <TextField
                            size="small"
                            value={editableDetails.garden}
                            onChange={(e) => handleDetailsChange('garden', Number(e.target.value))}
                            variant="outlined"
                            type="number"
                            InputProps={{ endAdornment: <Typography variant="body2">m²</Typography> }}
                          />
                        ) : (
                          `${additionalDetails.garden} m²`
                        )}
                      </TableCell>
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