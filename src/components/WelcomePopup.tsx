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
    // Use sessionStorage instead of localStorage to prevent issues across browser sessions
    // This ensures the flag is cleared when the browser is closed
    try {
      const fromLandingPage = sessionStorage.getItem('fromLandingPage') === 'true';
      
      if (fromLandingPage) {
        setOpen(true);
        // Clear the flag immediately to prevent potential loops
        sessionStorage.removeItem('fromLandingPage');
      }
    } catch {
      // Handle any storage access errors silently
      console.error('Storage access error occurred');
    }

    // Cleanup function to ensure we remove the flag if component unmounts
    return () => {
      try {
        sessionStorage.removeItem('fromLandingPage');
      } catch {
        // Silent error handling
      }
    };
  }, []);

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
          Welcome to the RealPro showcase Demo!
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mt: 2, color: 'white' }}>
          You&apos;re now logged in as Johan, the demo user, and ready to explore RealPRO CRM! 
          This showcase is designed to give you a hands-on feel for how real estate professionals 
          can manage properties, clients, and transactions with ease.
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'white' }}>
            Feel free to navigate around, check out the property board, explore listings, and test different features.
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ color: 'white' }}>
          If you have any questions or feedback, we&apos;d love to hear from you. Enjoy the demo!
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