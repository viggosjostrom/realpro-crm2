'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function LeadsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Leads
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your leads and track their progress through the sales pipeline.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="body1">
          Lead management functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
} 