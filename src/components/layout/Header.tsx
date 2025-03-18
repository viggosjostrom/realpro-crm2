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
  useTheme,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ClickAwayListener
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { 
  Menu as MenuIcon, 
  Search as SearchIcon, 
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  Business as BusinessIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useState, forwardRef, useRef } from 'react';
import { getAccessibleAvatarStyle } from '@/lib/utils/colorUtils';
import { mockUsers, mockClients, mockProperties } from '@/lib/utils/mockData';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/formatters';
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

// Search result types
type SearchResultType = 'property' | 'client';

interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  image?: string;
}

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const router = useRouter();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();

    // Search in properties
    const propertyResults = mockProperties
      .filter(property => 
        property.address.toLowerCase().includes(normalizedQuery) ||
        property.city.toLowerCase().includes(normalizedQuery) ||
        property.type.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 5) // Limit to 5 property results
      .map(property => ({
        id: property.id,
        type: 'property' as SearchResultType,
        title: property.address,
        subtitle: `${property.city} - ${formatCurrency(property.price)}`,
        image: property.images[0]
      }));
    
    // Search in clients
    const clientResults = mockClients
      .filter(client => 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(normalizedQuery) ||
        client.email.toLowerCase().includes(normalizedQuery) ||
        client.phone.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 5) // Limit to 5 client results
      .map(client => ({
        id: client.id,
        type: 'client' as SearchResultType,
        title: `${client.firstName} ${client.lastName}`,
        subtitle: client.type.charAt(0).toUpperCase() + client.type.slice(1),
        // No image for clients, use avatar initials
      }));
    
    // Combine results
    const combinedResults = [...propertyResults, ...clientResults].slice(0, 8);
    setSearchResults(combinedResults);
    setShowSearchResults(combinedResults.length > 0);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setShowSearchResults(false);
    setSearchTerm('');
    
    // Navigate to the appropriate page
    if (result.type === 'property') {
      router.push(`/dashboard/properties/${result.id}`);
    } else if (result.type === 'client') {
      router.push(`/dashboard/clients/${result.id}`);
    }
  };

  const handleClickAway = () => {
    setShowSearchResults(false);
  };

  const handleSearchInputFocus = () => {
    if (searchTerm.trim().length >= 2 && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    // Focus the search input when opening the dialog
    if (!mobileSearchOpen) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 300);
    }
  };

  // Get accessible avatar styles
  const avatarStyles = getAccessibleAvatarStyle(theme.palette.primary.main);

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
        <IconButton size="large" aria-label="search" color="inherit" onClick={handleMobileSearchToggle}>
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
        <IconButton 
          size="large" 
          aria-label="show 7 new notifications" 
          color="inherit"
          onClick={() => router.push('/dashboard/leads')}
        >
          <Badge badgeContent={7} color="error">
            <NotificationsIcon className="bell-icon" />
          </Badge>
        </IconButton>
        <p>Leads</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => {
            router.push('/dashboard/settings');
            handleMobileMenuClose();
          }}
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
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Tooltip title="You have 4 unread emails (Outlook)">
              <IconButton size="large" aria-label="show 4 new messages" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="You have 7 new unopened leads!">
              <IconButton 
                size="large" 
                aria-label="show 7 new notifications" 
                color="inherit"
                onClick={() => router.push('/dashboard/leads')}
              >
                <Badge badgeContent={7} color="error">
                  <NotificationsIcon className="bell-icon" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          <ClickAwayListener onClickAway={handleClickAway}>
            <Box 
              className="header-search"
              role="search"
              sx={{ 
                position: 'relative',
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
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={handleSearchInputFocus}
                inputRef={searchInputRef}
              />
              
              {/* Search results dropdown */}
              {showSearchResults && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    zIndex: 1000,
                    maxHeight: 400,
                    overflow: 'auto',
                    boxShadow: 3
                  }}
                >
                  <List sx={{ p: 0 }}>
                    {searchResults.length === 0 ? (
                      <ListItem>
                        <ListItemText primary="No results found" />
                      </ListItem>
                    ) : (
                      <>
                        {searchResults.map((result) => (
                          <ListItem 
                            key={`${result.type}-${result.id}`}
                            onClick={() => handleSearchResultClick(result)}
                            sx={{
                              '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                              },
                              cursor: 'pointer'
                            }}
                          >
                            <ListItemAvatar>
                              {result.type === 'property' ? (
                                <Avatar src={result.image} variant="rounded">
                                  <HomeIcon />
                                </Avatar>
                              ) : (
                                <Avatar>
                                  <PersonIcon />
                                </Avatar>
                              )}
                            </ListItemAvatar>
                            <ListItemText 
                              primary={result.title} 
                              secondary={result.subtitle} 
                            />
                          </ListItem>
                        ))}
                      </>
                    )}
                  </List>
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
          
          <Tooltip title="Profile">
            <IconButton
              className="header-profile-button"
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => router.push('/dashboard/settings')}
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
              p: 1,
              mb: 2
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              fullWidth
              placeholder="Search for properties or clients..."
              inputProps={{ 'aria-label': 'search for properties or clients' }}
              autoFocus
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              inputRef={mobileSearchInputRef}
            />
          </Box>
          
          {/* Mobile search results */}
          {searchResults.length > 0 && (
            <List sx={{ p: 0 }}>
              {searchResults.map((result) => (
                <ListItem 
                  key={`mobile-${result.type}-${result.id}`}
                  onClick={() => {
                    handleSearchResultClick(result);
                    handleMobileSearchToggle();
                  }}
                  sx={{
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    },
                    cursor: 'pointer'
                  }}
                >
                  <ListItemAvatar>
                    {result.type === 'property' ? (
                      <Avatar src={result.image} variant="rounded">
                        <HomeIcon />
                      </Avatar>
                    ) : (
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText 
                    primary={result.title} 
                    secondary={result.subtitle} 
                  />
                </ListItem>
              ))}
            </List>
          )}
          
          {searchTerm.trim().length >= 2 && searchResults.length === 0 && (
            <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
              No results found for &quot;{searchTerm}&quot;
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Header; 