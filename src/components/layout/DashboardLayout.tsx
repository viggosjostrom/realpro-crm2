import React, { useState, useEffect } from 'react';
import { Box, Toolbar, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

// Default drawer width when expanded
const drawerWidth = 240;
// Drawer width when minimized
const miniDrawerWidth = 72;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const [minimized, setMinimized] = useState(false);

  // Handle window resize to auto-minimize on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1100 && window.innerWidth >= theme.breakpoints.values.md) {
        setMinimized(true);
      } else if (window.innerWidth >= 1100) {
        setMinimized(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints.values.md]);

  const handleDrawerToggle = () => {
    // On mobile, the drawer toggle now toggles minimization instead of opening/closing
    if (window.innerWidth < theme.breakpoints.values.md) {
      setMinimized(!minimized);
    } else {
      // On desktop, still use mobile drawer for compatibility with original design
      setMobileOpen(!mobileOpen);
    }
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle} 
        minimized={minimized}
        toggleMinimized={toggleMinimized}
      />
      <Box
        component="main"
        id="main-content"
        aria-label="Main content"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            // Account for the sidebar width at all screen sizes
            xs: `calc(100% - ${miniDrawerWidth}px)`,
            sm: `calc(100% - ${miniDrawerWidth}px)`,
            md: `calc(100% - ${minimized ? miniDrawerWidth : drawerWidth}px)`
          },
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout; 