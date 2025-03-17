'use client';

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select,
  MenuItem, 
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  FilterList as FilterListIcon,
  GridView as GridViewIcon,
  List as ListViewIcon
} from '@mui/icons-material';
import { mockClients } from '@/lib/utils/mockData';
import { 
  ClientGridView, 
  ClientListView, 
  AddClientDialog, 
  getClientProperties, 
  formatDate, 
  getLastInteraction 
} from '@/components/client';

export default function ClientsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  // Create a map of client IDs to last interaction dates for efficient lookup
  const lastInteractionMap = useMemo(() => {
    const map = new Map<string, Date>();
    mockClients.forEach(client => {
      map.set(client.id, getLastInteraction());
    });
    return map;
  }, []);
  
  // Filter clients based on search term and filters
  const filteredClients = useMemo(() => {
    return mockClients.filter(client => {
      // Search term filter
      const matchesSearch = 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter === 'all' || client.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'grid' | 'list' | null,
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Clients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your clients and their information.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ height: 40 }}
        >
          Add Client
        </Button>
      </Box>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search clients"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Filter by Type"
                endAdornment={
                  <InputAdornment position="end">
                    <FilterListIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="buyer">Buyers</MenuItem>
                <MenuItem value="seller">Sellers</MenuItem>
                <MenuItem value="both">Buyers & Sellers</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
              size="small"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListViewIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Paper>
      
      {viewMode === 'grid' ? (
        <ClientGridView 
          clients={filteredClients} 
          getClientProperties={getClientProperties}
          lastInteractionMap={lastInteractionMap}
        />
      ) : (
        <ClientListView 
          clients={filteredClients}
          getClientProperties={getClientProperties}
          formatDate={formatDate}
          lastInteractionMap={lastInteractionMap}
        />
      )}
      
      <AddClientDialog 
        open={openAddDialog} 
        onClose={handleCloseAddDialog} 
      />
    </Box>
  );
} 