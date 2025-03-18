'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function OfficePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        My Office
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your workspace settings, documents and personal tasks.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="body1">
          Office management functionality will be implemented here.
        </Typography>
      </Paper>
    </Box>
  );
} 