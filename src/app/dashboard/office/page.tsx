'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Stack
} from '@mui/material';
import { mockUsers, mockProperties, mockMeetingRooms } from '@/lib/utils/mockData';
import { User, MeetingRoom } from '@/lib/types';
import BusinessIcon from '@mui/icons-material/Business';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

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
      id={`office-tabpanel-${index}`}
      aria-labelledby={`office-tab-${index}`}
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

// Colleague Card Component
const ColleagueCard = ({ user }: { user: User }) => {
  // Calculate properties being handled by this agent
  const propertyCount = mockProperties.filter(property => property.agentId === user.id).length;
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia 
        component="img" 
        sx={{ 
          height: 220,
          objectFit: 'cover'
        }}
        image={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, alignItems: 'center' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {user.workrole}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BusinessIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {user.office}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <HomeWorkIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {propertyCount} properties
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

// Meeting Room Card Component
const MeetingRoomCard = ({ room }: { room: MeetingRoom }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia 
        component="img" 
        sx={{ height: 200 }}
        image={room.image}
        alt={room.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {room.name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BusinessIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {room.office}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <GroupIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              Capacity: {room.capacity} people
            </Typography>
          </Stack>
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={room.isAvailable ? "Available" : "Occupied"} 
              color={room.isAvailable ? "success" : "error"}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function OfficePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        My Office
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Connect with colleagues and manage office resources.
      </Typography>
      
      <Paper elevation={1} sx={{ mb: 4, bgcolor: 'grey.100' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<PersonIcon />} label="My Colleagues" sx={{ py: 2 }} />
          <Tab icon={<MeetingRoomIcon />} label="Meeting Rooms" sx={{ py: 2 }} />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {mockUsers.map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                <ColleagueCard user={user} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockMeetingRooms.map((room) => (
              <Grid item key={room.id} xs={12} sm={6} md={4}>
                <MeetingRoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
} 