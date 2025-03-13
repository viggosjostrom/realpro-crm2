'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function ActivitiesPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Activities
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track and manage all your client interactions and scheduled activities.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="body1">
          Activity management functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
} 