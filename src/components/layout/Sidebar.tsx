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
  Logout as LogoutIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const pathname = usePathname();

  // Get accessible avatar styles
  const avatarStyles = getAccessibleAvatarStyle(theme.palette.primary.main);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Clients', icon: <ClientsIcon />, path: '/dashboard/clients' },
    { text: 'Properties', icon: <PropertiesIcon />, path: '/dashboard/properties' },
    { text: 'Leads', icon: <LeadsIcon />, path: '/dashboard/leads' },
    { text: 'Activities', icon: <ActivitiesIcon />, path: '/dashboard/activities' },
  ];

  const drawer = (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src="/logo.png" 
            alt="RealPro CRM" 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 1, 
              bgcolor: avatarStyles.bgcolor,
              color: avatarStyles.color
            }}
          >
            R
          </Avatar>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            RealPro CRM
          </Typography>
        </Box>
        {!isDesktop && (
          <Tooltip title="Close menu">
            <IconButton 
              onClick={handleDrawerToggle}
              aria-label="Close navigation menu"
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
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderTop: 1,
          borderColor: 'divider'
        }}
        aria-label="User information"
      >
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
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar; 