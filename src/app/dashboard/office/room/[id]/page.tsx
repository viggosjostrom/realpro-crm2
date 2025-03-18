'use client';

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  CardMedia,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { mockMeetingRooms } from '@/lib/utils/mockData';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';

// Mock bookings
const mockBookings = [
  {
    id: '1',
    roomId: '1',
    title: 'Client Meeting - Anders Johansson',
    date: new Date('2025-03-20T10:00:00'),
    endTime: new Date('2025-03-20T11:00:00'),
    bookedBy: 'Johan Andersson'
  },
  {
    id: '2',
    roomId: '1',
    title: 'Team Standup',
    date: new Date('2025-03-21T09:00:00'),
    endTime: new Date('2025-03-21T09:30:00'),
    bookedBy: 'Emma Lindberg'
  },
  {
    id: '3',
    roomId: '2',
    title: 'Contract Signing - Maria Eriksson',
    date: new Date('2025-03-19T14:00:00'),
    endTime: new Date('2025-03-19T15:30:00'),
    bookedBy: 'Ali Ahmadi'
  },
  {
    id: '4',
    roomId: '3',
    title: 'Property Viewing Discussion',
    date: new Date('2025-03-22T13:00:00'),
    endTime: new Date('2025-03-22T14:00:00'),
    bookedBy: 'Johan Andersson'
  }
];

// Time slots for booking
const timeSlots: string[] = [];
for (let hour = 8; hour < 18; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    timeSlots.push(`${formattedHour}:${formattedMinute}`);
  }
}

export default function MeetingRoomDetailPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;

  // State for booking dialog
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [meetingTitle, setMeetingTitle] = useState('');
  
  // Find room data
  const room = useMemo(() => {
    return mockMeetingRooms.find(r => r.id === roomId);
  }, [roomId]);

  // Get bookings for this room
  const roomBookings = useMemo(() => {
    if (!roomId) return [];
    return mockBookings.filter(booking => booking.roomId === roomId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [roomId]);

  // Handler for back button
  const handleBack = () => {
    router.push('/dashboard/office');
  };

  // Booking dialog handlers
  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  const handleStartTimeChange = (event: SelectChangeEvent) => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
    
    // Automatically set end time to be 1 hour after start time if possible
    const startIndex = timeSlots.findIndex(slot => slot === newStartTime);
    if (startIndex !== -1 && startIndex + 2 < timeSlots.length) {
      setEndTime(timeSlots[startIndex + 2]); // 1 hour = 2 slots (30min each)
    }
  };

  const handleBookRoom = () => {
    // In a real app, this would save the booking to a database
    // For this mockup, we'll just close the dialog
    handleCloseBookingDialog();
    
    // Show a success message (in a real app, you would use a proper notification system)
    alert('Meeting room booked successfully!');
  };

  // If room not found
  if (!room) {
    return (
      <Box>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Office
        </Button>
        <Typography variant="h5">Meeting room not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Back button */}
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Office
      </Button>

      {/* Room Header */}
      <Paper elevation={1} sx={{ p: 0, mb: 4, bgcolor: 'grey.100', overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: 300 }}>
              <CardMedia
                component="img"
                sx={{ height: '100%', objectFit: 'cover' }}
                image={room.image}
                alt={room.name}
              />
              <Chip 
                label={room.isAvailable ? "Available" : "Occupied"}
                color={room.isAvailable ? "success" : "error"}
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16,
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {room.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {room.description}
              </Typography>
              
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationIcon color="primary" />
                  <Typography variant="body1">
                    Office: {room.office}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <GroupIcon color="primary" />
                  <Typography variant="body1">
                    Capacity: {room.capacity} people
                  </Typography>
                </Stack>
              </Stack>
              
              <Button 
                variant="contained" 
                size="large"
                startIcon={<EventIcon />}
                sx={{ mt: 3 }}
                onClick={handleOpenBookingDialog}
                disabled={!room.isAvailable}
              >
                Book This Room
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Upcoming Bookings Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Upcoming Bookings
        </Typography>
        
        {roomBookings.length === 0 ? (
          <Typography variant="body1">No upcoming bookings for this room.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Booked By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{format(booking.date, 'MMMM d, yyyy')}</TableCell>
                    <TableCell>
                      {format(booking.date, 'HH:mm')} - {format(booking.endTime, 'HH:mm')}
                    </TableCell>
                    <TableCell>{booking.title}</TableCell>
                    <TableCell>{booking.bookedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Booking Dialog */}
      <Dialog 
        open={openBookingDialog} 
        onClose={handleCloseBookingDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Book {room.name}
          <IconButton
            onClick={handleCloseBookingDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                label="Meeting Title"
                fullWidth
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                label="Date"
                fullWidth
                value={bookingDate.toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(new Date(e.target.value))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="start-time-label">Start Time</InputLabel>
                <Select
                  labelId="start-time-label"
                  value={startTime}
                  label="Start Time"
                  onChange={handleStartTimeChange}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="end-time-label">End Time</InputLabel>
                <Select
                  labelId="end-time-label"
                  value={endTime}
                  label="End Time"
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {timeSlots.map((time) => (
                    <MenuItem 
                      key={time} 
                      value={time} 
                      disabled={time <= startTime}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingDialog}>Cancel</Button>
          <Button 
            onClick={handleBookRoom} 
            variant="contained"
            disabled={!meetingTitle || !bookingDate || !startTime || !endTime}
          >
            Book Room
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 