'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Avatar, 
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { 
  Save as SaveIcon, 
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  ColorLens as ColorLensIcon
} from '@mui/icons-material';
import { mockUsers } from '@/lib/utils/mockData';

// Find the current user (Johan Andersson with id '1')
const currentUser = mockUsers.find(user => user.id === '1');

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);

  // User profile state
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: '070-123-4567', // Mocked phone number
    workrole: currentUser?.workrole || '',
    office: currentUser?.office || '',
    avatar: currentUser?.avatar || '',
    bio: 'Real estate professional with 10+ years of experience in the Stockholm market. Specializing in high-end properties and commercial real estate.',
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
  });

  // Notification preferences state
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    smsNotifications: true,
    leadAssignmentNotifications: true,
    propertyUpdateNotifications: true,
    activityReminders: true,
    marketingEmails: false,
  });

  // Appearance settings
  const [appearanceData, setAppearanceData] = useState({
    language: 'english',
    theme: 'light',
    compactMode: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('notification-')) {
      const notificationName = name.replace('notification-', '');
      setNotificationData(prev => ({ ...prev, [notificationName]: checked }));
    } else if (name.startsWith('security-')) {
      const securityName = name.replace('security-', '');
      setSecurityData(prev => ({ ...prev, [securityName]: checked }));
    } else if (name.startsWith('appearance-')) {
      const appearanceName = name.replace('appearance-', '');
      setAppearanceData(prev => ({ ...prev, [appearanceName]: checked }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (name?.startsWith('appearance-')) {
      const appearanceName = name.replace('appearance-', '');
      setAppearanceData(prev => ({ ...prev, [appearanceName]: value }));
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    setSuccessMessage('Profile updated successfully!');
    setSnackbarOpen(true);
  };

  const handleSavePassword = () => {
    // In a real app, this would validate and save to an API
    if (securityData.newPassword !== securityData.confirmPassword) {
      setSuccessMessage('Passwords do not match!');
      setSnackbarOpen(true);
      return;
    }
    
    setSuccessMessage('Password updated successfully!');
    setSnackbarOpen(true);
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleSaveNotifications = () => {
    // In a real app, this would save to an API
    setSuccessMessage('Notification preferences updated!');
    setSnackbarOpen(true);
  };

  const handleSaveAppearance = () => {
    // In a real app, this would save to an API
    setSuccessMessage('Appearance settings updated!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    setPhotoUploading(true);
    setTimeout(() => {
      setPhotoUploading(false);
      setSuccessMessage('Profile photo updated!');
      setSnackbarOpen(true);
    }, 1500);
  };

  return (
    <Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Settings
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        mb: 4
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                minWidth: { xs: 'auto', sm: 160 },
              }
            }}
          >
            <Tab 
              label="Profile" 
              icon={<PersonIcon />} 
              iconPosition="start" 
              {...a11yProps(0)} 
            />
            <Tab 
              label="Security" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              {...a11yProps(1)} 
            />
            <Tab 
              label="Notifications" 
              icon={<NotificationsIcon />} 
              iconPosition="start" 
              {...a11yProps(2)} 
            />
            <Tab 
              label="Appearance" 
              icon={<ColorLensIcon />} 
              iconPosition="start" 
              {...a11yProps(3)} 
            />
          </Tabs>
        </Box>

        {/* Profile Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <Avatar
                  src={profileData.avatar}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  sx={{ 
                    width: 150, 
                    height: 150, 
                    mx: 'auto',
                    boxShadow: 3
                  }}
                />
                <Box sx={{ mt: 2, position: 'relative' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-profile-photo"
                    type="file"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="upload-profile-photo">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCameraIcon />}
                      sx={{ mt: 2 }}
                      disabled={photoUploading}
                    >
                      {photoUploading ? 'Uploading...' : 'Change Photo'}
                    </Button>
                  </label>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                For best results, use an image at least 400px by 400px in .jpg or .png format
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 3 }}>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 3 }}>Professional Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="workrole"
                    value={profileData.workrole}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Office"
                    name="office"
                    value={profileData.office}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Settings */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 3 }}>Change Password</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge="end"
                          >
                            {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={handleSavePassword}
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 3 }}>Security Options</Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Two-Factor Authentication</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add an extra layer of security to your account
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={securityData.twoFactorEnabled} 
                          onChange={handleToggleChange}
                          name="security-twoFactorEnabled"
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">Active Sessions</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Currently logged in only from this device
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 1.5,
                      bgcolor: 'action.hover',
                      borderRadius: 1
                    }}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">Current Session</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Windows · Chrome · Stockholm, Sweden
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="primary">Active Now</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" color="error">Danger Zone</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Permanently delete your account and all your data
                      </Typography>
                    </Box>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                    >
                      Delete Account
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 3 }}>Notification Preferences</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Email Notifications</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Receive notifications via email
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notificationData.emailNotifications} 
                          onChange={handleToggleChange}
                          name="notification-emailNotifications"
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">SMS Notifications</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Receive notifications via text message
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notificationData.smsNotifications} 
                          onChange={handleToggleChange}
                          name="notification-smsNotifications"
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>Notification Types</Typography>
              
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationData.leadAssignmentNotifications} 
                            onChange={handleToggleChange}
                            name="notification-leadAssignmentNotifications"
                            color="primary"
                          />
                        }
                        label="Lead assignments"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationData.propertyUpdateNotifications} 
                            onChange={handleToggleChange}
                            name="notification-propertyUpdateNotifications"
                            color="primary"
                          />
                        }
                        label="Property updates"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationData.activityReminders} 
                            onChange={handleToggleChange}
                            name="notification-activityReminders"
                            color="primary"
                          />
                        }
                        label="Activity reminders"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationData.marketingEmails} 
                            onChange={handleToggleChange}
                            name="notification-marketingEmails"
                            color="primary"
                          />
                        }
                        label="Marketing and newsletters"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSaveNotifications}
              >
                Save Preferences
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Appearance Settings */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 3 }}>Appearance Settings</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  value={appearanceData.language}
                  label="Language"
                  name="appearance-language"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="swedish">Swedish</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="norwegian">Norwegian</MenuItem>
                  <MenuItem value="danish">Danish</MenuItem>
                  <MenuItem value="finnish">Finnish</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel id="theme-select-label">Theme</InputLabel>
                <Select
                  labelId="theme-select-label"
                  id="theme-select"
                  value={appearanceData.theme}
                  label="Theme"
                  name="appearance-theme"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System Default</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">Compact Mode</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Display more content with reduced padding and spacing
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={appearanceData.compactMode} 
                          onChange={handleToggleChange}
                          name="appearance-compactMode"
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSaveAppearance}
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 