import React, { useState } from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Home as HomeIcon,
  EventAvailable as EventAvailableIcon,
  Today as TodayIcon,
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Task as TaskIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Property, Activity } from '@/lib/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`client-tabpanel-${index}`}
      aria-labelledby={`client-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface ClientTabsProps {
  clientProperties: Property[];
  clientActivities: Activity[];
  formatDate: (date: Date) => string;
}

const ClientTabs: React.FC<ClientTabsProps> = ({ clientProperties, clientActivities, formatDate }) => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Properties" icon={<HomeIcon />} iconPosition="start" />
        <Tab label="Activities" icon={<EventAvailableIcon />} iconPosition="start" />
        <Tab label="Viewings" icon={<TodayIcon />} iconPosition="start" />
        <Tab label="Documents" icon={<AssignmentIcon />} iconPosition="start" />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>
        {clientProperties.length > 0 ? (
          <Grid container spacing={3}>
            {clientProperties.map(property => (
              <Grid item xs={12} md={6} lg={4} key={property.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}
                  onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                >
                  <Box sx={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                    <img 
                      src={property.images[0] || '/properties/property-placeholder.jpg'} 
                      alt={property.address}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Chip
                      label={property.status}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 
                          property.status === 'available' ? 'success.main' :
                          property.status === 'pending' ? 'warning.main' : 'error.main',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6">
                      {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(property.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.address}, {property.city}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography variant="body2">{property.size} m²</Typography>
                      <Typography variant="body2">{property.rooms} rooms</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1">No properties associated with this client yet.</Typography>
          </Box>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {clientActivities.length > 0 ? (
          <List>
            {clientActivities.map(activity => (
              <React.Fragment key={activity.id}>
                <ListItem>
                  <ListItemIcon>
                    {activity.type === 'appointment' || activity.type === 'meeting' ? <EventAvailableIcon color="primary" /> :
                     activity.type === 'call' ? <PhoneIcon color="success" /> :
                     activity.type === 'email' ? <EmailIcon color="info" /> :
                     activity.type === 'viewing' ? <HomeIcon color="secondary" /> :
                     <TaskIcon color="warning" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" component="span" color="text.primary">
                          {formatDate(activity.date)}
                        </Typography>
                        {' — '}{activity.description}
                      </React.Fragment>
                    }
                  />
                  <Chip 
                    label={activity.status} 
                    size="small"
                    color={
                      activity.status === 'completed' ? 'success' :
                      activity.status === 'scheduled' ? 'primary' :
                      activity.status === 'cancelled' ? 'error' : 'default'
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1">No activities recorded for this client yet.</Typography>
          </Box>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1">
            Viewing history will be displayed here.
          </Typography>
        </Box>
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="body1">
            Client documents will be displayed here.
          </Typography>
        </Box>
      </TabPanel>
    </Paper>
  );
};

export default ClientTabs; 