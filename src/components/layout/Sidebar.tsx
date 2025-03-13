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
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const pathname = usePathname();

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
            sx={{ width: 40, height: 40, mr: 1, bgcolor: theme.palette.primary.main }}
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
      <List 
        sx={{ flexGrow: 1 }}
        aria-label="Main menu"
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link 
              href={item.path} 
              style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
              aria-current={pathname === item.path ? 'page' : undefined}
            >
              <ListItemButton 
                selected={pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '20',
                    borderRight: `3px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '30',
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: pathname === item.path ? theme.palette.primary.main : 'inherit'
                }}
                aria-hidden="true"
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List aria-label="Settings">
        <ListItem disablePadding>
          <Link 
            href="/dashboard/settings" 
            style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}
            aria-current={pathname === '/dashboard/settings' ? 'page' : undefined}
          >
            <ListItemButton selected={pathname === '/dashboard/settings'}>
              <ListItemIcon aria-hidden="true">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Box 
        sx={{ p: 2, display: 'flex', alignItems: 'center' }}
        aria-label="User information"
      >
        <Avatar sx={{ width: 32, height: 32, mr: 1 }} alt="Johan Andersson">JA</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Johan Andersson
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Admin
          </Typography>
        </Box>
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