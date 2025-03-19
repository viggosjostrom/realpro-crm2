'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box
} from '@mui/material';

const WelcomePopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wrap in try-catch and only run once on mount
    let isMounted = true;
    
    try {
      const fromLandingPage = sessionStorage.getItem('fromLandingPage') === 'true';
      
      if (fromLandingPage && isMounted) {
        setOpen(true);
        // Clear the flag immediately to prevent potential loops
        sessionStorage.removeItem('fromLandingPage');
      }
    } catch (error) {
      // Handle any storage access errors silently
      console.error('Storage access error occurred:', error);
    }

    // Cleanup function
    return () => {
      isMounted = false;
      try {
        sessionStorage.removeItem('fromLandingPage');
      } catch {
        // Silent error handling
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
          px: 1,
          bgcolor: 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 250,
            height: 250,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }
        }
      }}
    >
      <DialogContent sx={{ pt: 4, position: 'relative', zIndex: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
          RealPro CRM - Showcase Demo v.0.3.3
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mt: 2, color: 'white' }}>
          Welcome! You are logged in as Johan, the demo user.
        </Typography>
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white', mb: 1.5 }} align="center">
            Important info for this version:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
              • This version is best viewed on desktop for the optimal experience.
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              • Leads and Activities pages are coming soon!
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2, justifyContent: 'center' }}>
          <Typography variant="body1" align="center" sx={{ fontWeight: 'medium', color: 'white' }}>
            Navigate around, check out the dashboard, explore properties, and test different features.
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph align="center" sx={{ color: 'white' }}>
          If you have any questions or feedback, I would love to hear from you. Enjoy the demo!
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
        <Button 
          onClick={handleClose} 
          variant="contained" 
          size="large"
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          Let&apos;s go!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomePopup; 