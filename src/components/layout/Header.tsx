import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Badge, 
  Avatar,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { 
  Menu as MenuIcon, 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  Business as BusinessIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useState, forwardRef } from 'react';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';
import { mockUsers } from '@/lib/utils/mockData';
// Import both CSS files to ensure they're loaded
import '@/styles/components/Header.css';
import '@/styles/global-overrides.css';

// Find the current user (Johan Andersson with id '1')
const currentUser = mockUsers.find(user => user.id === '1');

// Transition for the search dialog
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  // Get accessible avatar styles
  const avatarStyles = getAccessibleAvatarStyle(theme.palette.primary.main);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="search" color="inherit">
          <SearchIcon />
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new messages" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
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
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        className="header-appbar"
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar expansion"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
            title="Toggle sidebar expansion"
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'white',
                color: theme.palette.primary.main,
                width: 40, 
                height: 40, 
                mr: 1.5,
                display: { xs: 'none', sm: 'flex' }
              }}
              aria-hidden="true"
            >
              <BusinessIcon />
            </Avatar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: 'white' }}
              id="app-title"
            >
              RealPro CRM
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box 
            className="header-search"
            role="search"
            sx={{ 
              mr: 2, 
              display: { xs: 'none', sm: 'flex' },
              width: { sm: '180px', md: '240px', lg: '300px' },
              transition: 'width 0.3s ease',
              '&:focus-within': {
                width: { sm: '220px', md: '280px', lg: '350px' }
              }
            }}
          >
            <Box 
              className="header-search-icon"
              aria-hidden="true"
            >
              <SearchIcon />
            </Box>
            <InputBase
              className="header-search-input"
              placeholder="Search for properties or clients..."
              inputProps={{ 'aria-label': 'search for properties or clients' }}
              fullWidth
            />
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Messages">
              <IconButton size="large" aria-label="show 4 new messages" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton
                className="header-profile-button"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  src={currentUser?.avatar}
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'white',
                    color: theme.palette.primary.main
                  }} 
                  alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
                >
                  {!currentUser?.avatar && `${currentUser?.firstName?.charAt(0)}${currentUser?.lastName?.charAt(0)}`}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              sx={{ mr: 1 }}
              onClick={handleMobileSearchToggle}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
      {/* Mobile search dialog */}
      <Dialog
        open={mobileSearchOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleMobileSearchToggle}
        fullWidth
        maxWidth="sm"
        aria-labelledby="mobile-search-dialog"
      >
        <DialogTitle sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Search</Typography>
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleMobileSearchToggle} 
              aria-label="close search"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 2, pt: 0 }}>
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              p: 1
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              fullWidth
              placeholder="Search for properties or clients..."
              inputProps={{ 'aria-label': 'search for properties or clients' }}
              autoFocus
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Header; 