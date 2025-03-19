'use client';

import React, { useState, useMemo } from 'react';
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
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  // Calculate properties being handled by this agent
  const propertyCount = useMemo(() => {
    return mockProperties.filter(property => property.agentId === user.id).length;
  }, [user.id]);
  
  const handleClick = () => {
    router.push(`/dashboard/office/colleague/${user.id}`);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        maxWidth: 280,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia 
          component="img" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          image={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/dashboard/office/room/${room.id}`);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        maxWidth: 280,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia 
          component="img" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          image={room.image}
          alt={room.name}
        />
      </Box>
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              minHeight: 48,
              '& .MuiTab-root': {
                minHeight: 48,
                py: 1,
                px: 3
              }
            }}
          >
            <Tab 
              icon={<PersonIcon sx={{ fontSize: '1.2rem', mr: 1 }} />} 
              label="My Colleagues" 
              iconPosition="start"
            />
            <Tab 
              icon={<MeetingRoomIcon sx={{ fontSize: '1.2rem', mr: 1 }} />} 
              label="Meeting Rooms" 
              iconPosition="start"
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              maxWidth: 1200,
              width: '100%'
            }}
          >
            {mockUsers.map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                <ColleagueCard user={user} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid 
            container 
            spacing={2}
            sx={{ 
              maxWidth: 1200,
              width: '100%'
            }}
          >
            {mockMeetingRooms.map((room) => (
              <Grid item key={room.id} xs={12} sm={6} md={4} lg={3}>
                <MeetingRoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
} 