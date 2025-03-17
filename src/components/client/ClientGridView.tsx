import React from 'react';
import { Grid } from '@mui/material';
import { Client, Property } from '@/lib/types';
import ClientCard from './ClientCard';

interface ClientGridViewProps {
  clients: Client[];
  getClientProperties: (clientId: string) => Property[];
  lastInteractionMap: Map<string, Date>;
}

const ClientGridView: React.FC<ClientGridViewProps> = ({ 
  clients, 
  getClientProperties, 
  lastInteractionMap 
}) => {
  return (
    <Grid container spacing={3}>
      {clients.map((client) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
          <ClientCard 
            client={client} 
            clientProperties={getClientProperties(client.id)}
            lastInteraction={lastInteractionMap.get(client.id) || new Date()}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ClientGridView; 