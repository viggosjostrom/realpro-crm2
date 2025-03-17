import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  Avatar,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Client, Property } from '@/lib/types';
import { getClientTypeColor, getClientTypeLabel } from './ClientCard';

interface ClientListViewProps {
  clients: Client[];
  getClientProperties: (clientId: string) => Property[];
  formatDate: (date: Date) => string;
  lastInteractionMap: Map<string, Date>;
}

const ClientListView: React.FC<ClientListViewProps> = ({ 
  clients, 
  getClientProperties, 
  formatDate,
  lastInteractionMap 
}) => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Properties</TableCell>
            <TableCell>Last Interaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => {
            const clientProperties = getClientProperties(client.id);
            const lastInteraction = lastInteractionMap.get(client.id) || new Date();
            
            return (
              <TableRow
                key={client.id}
                hover
                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                sx={{ 
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 } 
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: getClientTypeColor(client.type), 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        color: 'white'
                      }}
                    >
                      {client.firstName[0]}{client.lastName[0]}
                    </Avatar>
                    <Typography>
                      {client.firstName} {client.lastName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getClientTypeLabel(client.type)}
                    size="small"
                    sx={{
                      backgroundColor: getClientTypeColor(client.type),
                      color: 'white',
                      fontWeight: 'medium'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" display="flex" alignItems="center" sx={{ mb: 0.5 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                      {client.email}
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center">
                      <PhoneIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                      {client.phone}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{clientProperties.length > 0 ? `${clientProperties.length} Properties` : "None"}</TableCell>
                <TableCell>{formatDate(lastInteraction)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientListView; 