import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  IconButton,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as ClientsIcon,
  Home as PropertiesIcon,
  ContactPhone as LeadsIcon,
  EventNote as ActivitiesIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';

// Default drawer width when expanded
const drawerWidth = 240;
// Drawer width when minimized
const miniDrawerWidth = 72;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  minimized?: boolean;
  toggleMinimized?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  mobileOpen, 
  handleDrawerToggle,
  minimized = false,
  toggleMinimized
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  // Get accessible avatar styles
  const avatarStyles = getAccessibleAvatarStyle(theme.palette.primary.main);

  const handleToggleMinimized = () => {
    if (toggleMinimized) {
      toggleMinimized();
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Clients', icon: <ClientsIcon />, path: '/dashboard/clients' },
    { text: 'Properties', icon: <PropertiesIcon />, path: '/dashboard/properties' },
    { text: 'Leads', icon: <LeadsIcon />, path: '/dashboard/leads' },
    { text: 'Activities', icon: <ActivitiesIcon />, path: '/dashboard/activities' },
  ];

  const drawer = (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <Box 
        sx={{ 
          p: minimized ? 1 : 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: minimized ? 'center' : 'space-between',
          background: 'linear-gradient(135deg, #1a56db 0%, #1e429f 100%)',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {!minimized && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src="/logo.png" 
              alt="RealPro CRM" 
              sx={{ 
                width: 40, 
                height: 40, 
                mr: 1, 
                bgcolor: 'white',
                color: theme.palette.primary.main
              }}
            >
              R
            </Avatar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              RealPro CRM
            </Typography>
          </Box>
        )}
        
        {minimized && (
          <Avatar 
            src="/logo.png" 
            alt="RealPro CRM" 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: 'white',
              color: theme.palette.primary.main
            }}
          >
            R
          </Avatar>
        )}

        {isDesktop && !isMobile && (
          <Tooltip title={minimized ? "Expand menu" : "Collapse menu"}>
            <IconButton 
              onClick={handleToggleMinimized}
              aria-label={minimized ? "Expand navigation menu" : "Collapse navigation menu"}
              sx={{ color: 'white' }}
            >
              {minimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>
        )}
        
        {!isDesktop && (
          <Tooltip title="Close menu">
            <IconButton 
              onClick={handleDrawerToggle}
              aria-label="Close navigation menu"
              sx={{ color: 'white' }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item) => (
          <Link href={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton 
                selected={pathname === item.path}
                sx={{ 
                  borderRadius: '0 24px 24px 0', 
                  mr: 1,
                  py: 1.2,
                  pl: minimized ? 2 : 3,
                  '&.Mui-selected': {
                    bgcolor: theme => `${theme.palette.primary.main}15`,
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: theme => `${theme.palette.primary.main}25`,
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    }
                  }
                }}
              >
                <Tooltip title={minimized ? item.text : ""} placement="right">
                  <ListItemIcon sx={{ minWidth: minimized ? 0 : 40, mr: minimized ? 0 : 2 }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!minimized && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: minimized ? 2 : 3, py: 1.2 }}>
            <Tooltip title={minimized ? "Settings" : ""} placement="right">
              <ListItemIcon sx={{ minWidth: minimized ? 0 : 40, mr: minimized ? 0 : 2 }}>
                <SettingsIcon />
              </ListItemIcon>
            </Tooltip>
            {!minimized && <ListItemText primary="Settings" />}
          </ListItemButton>
        </ListItem>
      </List>
      <Box 
        sx={{ 
          p: minimized ? 1 : 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: minimized ? 'center' : 'space-between',
          borderTop: 1,
          borderColor: 'divider'
        }}
        aria-label="User information"
      >
        {!minimized && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 1,
                bgcolor: avatarStyles.bgcolor,
                color: avatarStyles.color
              }} 
              alt="Johan Andersson"
            >
              JA
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Johan Andersson
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>
        )}
        
        {minimized && (
          <Tooltip title="Johan Andersson" placement="right">
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: avatarStyles.bgcolor,
                color: avatarStyles.color
              }} 
              alt="Johan Andersson"
            >
              JA
            </Avatar>
          </Tooltip>
        )}
        
        {!minimized && (
          <Tooltip title="Logout">
            <IconButton 
              component="a" 
              href="/" 
              size="small" 
              color="primary"
              aria-label="Logout"
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  // Common drawer paper styles
  const drawerPaperStyles = {
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, rgba(26,86,219,0.05) 0%, rgba(26,86,219,0.02) 100%)',
    overflowX: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  };

  return (
    <Box
      component="nav"
      sx={{ 
        width: { 
          xs: drawerWidth, 
          md: minimized ? miniDrawerWidth : drawerWidth 
        }, 
        flexShrink: { md: 0 } 
      }}
      aria-label="Navigation sidebar"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            ...drawerPaperStyles,
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            ...drawerPaperStyles,
            width: minimized ? miniDrawerWidth : drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar; 