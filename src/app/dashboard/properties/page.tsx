'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function PropertiesPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Properties
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your property listings and track their status.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="body1">
          Property management functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
} 