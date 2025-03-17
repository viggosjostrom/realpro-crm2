import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { Client } from '@/lib/types';
import { getClientTypeColor, getClientTypeLabel } from './ClientCard';

interface ClientHeaderProps {
  client: Client;
  onBack: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ client, onBack }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mr: 2 }}
        onClick={onBack}
      >
        Back
      </Button>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
        {client.firstName} {client.lastName}
      </Typography>
      <Chip
        label={getClientTypeLabel(client.type)}
        sx={{
          backgroundColor: getClientTypeColor(client.type),
          color: 'white',
          fontWeight: 'bold',
          mr: 2
        }}
      />
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
      >
        Edit Client
      </Button>
    </Box>
  );
};

export default ClientHeader; 