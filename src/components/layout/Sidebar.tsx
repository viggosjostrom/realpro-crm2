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
import { mockUsers } from '@/lib/utils/mockData';
// Import both CSS files to ensure they're loaded
import '@/styles/components/Sidebar.css';
import '@/styles/global-overrides.css';

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

// Find the current user (Johan Andersson with id '1')
const currentUser = mockUsers.find(user => user.id === '1');

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
    { text: 'Properties', icon: <PropertiesIcon />, path: '/dashboard/properties' },
    { text: 'Clients', icon: <ClientsIcon />, path: '/dashboard/clients' },
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
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {/* Toggle button for desktop */}
        {isDesktop && !isMobile && (
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              className="sidebar-menu-item"
              onClick={handleToggleMinimized}
              sx={{ 
                py: 1.2,
                pl: minimized ? 2 : 3,
              }}
            >
              <Tooltip title={minimized ? "Expand menu" : "Collapse menu"} placement="right">
                <ListItemIcon sx={{ mr: minimized ? 0 : 2 }}>
                  {minimized ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </ListItemIcon>
              </Tooltip>
              {!minimized && <ListItemText primary={minimized ? "" : "Collapse Menu"} />}
            </ListItemButton>
          </ListItem>
        )}
        
        {/* Close button for mobile - now minimizes instead of closing */}
        {!isDesktop && (
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              className="sidebar-menu-item"
              onClick={handleToggleMinimized}
              sx={{ 
                py: 1.2,
                pl: 3,
              }}
            >
              <ListItemIcon sx={{ mr: 2 }}>
                <ChevronLeftIcon />
              </ListItemIcon>
              <ListItemText primary="Minimize Menu" />
            </ListItemButton>
          </ListItem>
        )}
        
        {menuItems.map((item) => (
          <Link href={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton 
                className="sidebar-menu-item"
                selected={pathname === item.path}
                sx={{ 
                  py: 1.2,
                  pl: minimized ? 2 : 3,
                }}
              >
                <Tooltip title={minimized ? item.text : ""} placement="right">
                  <ListItemIcon sx={{ mr: minimized ? 0 : 2 }}>
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
          <ListItemButton 
            className="sidebar-menu-item"
            sx={{ pl: minimized ? 2 : 3, py: 1.2 }}
          >
            <Tooltip title={minimized ? "Settings" : ""} placement="right">
              <ListItemIcon sx={{ mr: minimized ? 0 : 2 }}>
                <SettingsIcon />
              </ListItemIcon>
            </Tooltip>
            {!minimized && <ListItemText primary="Settings" />}
          </ListItemButton>
        </ListItem>
      </List>
      <Box 
        className={`sidebar-user-info ${minimized ? 'sidebar-user-info-minimized' : ''}`}
        sx={{ 
          p: minimized ? 1 : 2, 
        }}
        aria-label="User information"
      >
        {!minimized && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={currentUser?.avatar}
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 1,
                bgcolor: avatarStyles.bgcolor,
                color: avatarStyles.color
              }} 
              alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
            >
              {!currentUser?.avatar && `${currentUser?.firstName?.charAt(0)}${currentUser?.lastName?.charAt(0)}`}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {`${currentUser?.firstName} ${currentUser?.lastName}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser?.role === 'admin' ? 'Admin' : 'Agent'}
              </Typography>
            </Box>
          </Box>
        )}
        
        {minimized && (
          <Tooltip title={`${currentUser?.firstName} ${currentUser?.lastName}`} placement="right">
            <Avatar 
              src={currentUser?.avatar}
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: avatarStyles.bgcolor,
                color: avatarStyles.color
              }} 
              alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
            >
              {!currentUser?.avatar && `${currentUser?.firstName?.charAt(0)}${currentUser?.lastName?.charAt(0)}`}
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
      {/* Mobile drawer - Only shown when mobileOpen is true */}
      <Drawer
        className="sidebar-drawer"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'linear-gradient(180deg, rgba(26,86,219,0.15) 0%, rgba(30,66,159,0.08) 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRight: '2px solid rgba(26,86,219,0.2)'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Persistent drawer - Always visible */}
      <Drawer
        className="sidebar-drawer"
        variant="permanent"
        sx={{
          display: 'block', // Always visible
          zIndex: 1200, // Ensure it's visible above other content
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: { 
              xs: miniDrawerWidth, // Always minimized on extra small screens
              sm: miniDrawerWidth,
              md: minimized ? miniDrawerWidth : drawerWidth 
            },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            background: 'linear-gradient(180deg, rgba(26,86,219,0.15) 0%, rgba(30,66,159,0.08) 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRight: '2px solid rgba(26,86,219,0.2)'
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