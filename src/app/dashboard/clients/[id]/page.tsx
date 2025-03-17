'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { mockClients } from '@/lib/utils/mockData';
import { 
  ClientHeader, 
  ClientInfo, 
  ClientTabs, 
  getClientProperties, 
  getClientActivities, 
  formatDate 
} from '@/components/client';

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;
  
  // Find client from mock data
  const client = mockClients.find(c => c.id === clientId);
  
  // Get client properties and activities
  const clientProperties = client ? getClientProperties(client.id) : [];
  const clientActivities = client ? getClientActivities(client.id) : [];
  
  // Handle back button
  const handleBack = () => {
    router.push('/dashboard/clients');
  };
  
  if (!client) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h5">Client not found</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={handleBack}
        >
          Back to Clients
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <ClientHeader client={client} onBack={handleBack} />
      <ClientInfo 
        client={client}
        clientProperties={clientProperties}
        clientActivities={clientActivities}
        formatDate={formatDate}
      />
      <ClientTabs 
        clientProperties={clientProperties}
        clientActivities={clientActivities}
        clientId={client.id}
        formatDate={formatDate}
      />
    </Box>
  );
} 