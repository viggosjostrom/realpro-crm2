import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  Divider 
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Client, Property } from '@/lib/types';

// Helper functions
const getClientTypeLabel = (type: string): string => {
  switch (type) {
    case 'buyer':
      return 'Buyer';
    case 'seller':
      return 'Seller';
    case 'both':
      return 'Buyer & Seller';
    default:
      return type;
  }
};

const getClientTypeColor = (type: string): string => {
  switch (type) {
    case 'buyer':
      return '#2196F3'; // Blue
    case 'seller':
      return '#4CAF50'; // Green
    case 'both':
      return '#9C27B0'; // Purple
    default:
      return '#9E9E9E'; // Grey
  }
};

// Helper function to format date
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

interface ClientCardProps {
  client: Client;
  clientProperties: Property[];
  lastInteraction: Date;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, clientProperties, lastInteraction }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/clients/${client.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: getClientTypeColor(client.type), 
                width: 40, 
                height: 40, 
                mr: 1,
                color: 'white'
              }}
            >
              {client.firstName[0]}{client.lastName[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {client.firstName} {client.lastName}
              </Typography>
              <Chip
                label={getClientTypeLabel(client.type)}
                size="small"
                sx={{
                  backgroundColor: getClientTypeColor(client.type),
                  color: 'white',
                  fontWeight: 'medium',
                  fontSize: '0.7rem',
                  height: 20
                }}
              />
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {client.email}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PhoneIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {client.phone}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <HomeIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
            {clientProperties.length > 0 
              ? `${clientProperties.length} Properties` 
              : "No properties"
            }
          </Typography>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
            Last contact: {formatDate(lastInteraction)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
export { getClientTypeColor, getClientTypeLabel }; 