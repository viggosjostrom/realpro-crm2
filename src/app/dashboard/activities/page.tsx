'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Calendar from '@/components/Calendar';

export default function ActivitiesPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Activities
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track and manage all your client interactions and scheduled activities.
      </Typography>
      
      <Calendar />
    </Box>
  );
} 