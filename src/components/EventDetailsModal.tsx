'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { Event } from 'react-big-calendar';
import { format } from 'date-fns';
import { mockProperties } from '@/lib/utils/mockData';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function EventDetailsModal({ open, onClose, event }: EventDetailsModalProps) {
  if (!event) return null;

  const resource = event.resource as any;
  
  // Get property details if propertyId exists
  const property = resource.propertyId 
    ? mockProperties.find(p => p.id === resource.propertyId)
    : null;

  // Get color based on activity type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'viewing':
        return '#4CAF50';
      case 'meeting':
        return '#FF9800';
      case 'call':
        return '#2196F3';
      case 'appointment':
        return '#9C27B0';
      case 'task':
        return '#607D8B';
      default:
        return '#2196F3';
    }
  };

  const formatDateTime = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'PPp'); // e.g., "Apr 29, 2021, 5:00 PM"
  };

  // Format price to SEK with thousands separator
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="span">
            {event.title}
          </Typography>
          <Chip
            label={resource.type}
            size="small"
            sx={{
              backgroundColor: getTypeColor(resource.type),
              color: 'white',
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Date & Time
          </Typography>
          <Typography>
            {formatDateTime(event.start)} - {formatDateTime(event.end)}
          </Typography>
        </Box>

        {property && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Property Details
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {property.address}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {property.postalCode} {property.city}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  {property.size} m² • {property.rooms} rooms
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                  {formatPrice(property.price)}
                </Typography>
              </Box>
              <Chip
                label={property.status}
                size="small"
                color={property.status === 'available' ? 'success' : property.status === 'pending' ? 'warning' : 'default'}
                sx={{ mt: 1 }}
              />
            </Box>
          </>
        )}

        {resource.client && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Client
              </Typography>
              <Typography>{resource.client}</Typography>
            </Box>
          </>
        )}

        {resource.notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Notes
              </Typography>
              <Typography>{resource.notes}</Typography>
            </Box>
          </>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
          <Chip
            label={resource.completed ? 'Completed' : 'Pending'}
            size="small"
            color={resource.completed ? 'success' : 'warning'}
            sx={{ mt: 0.5 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {property && (
          <Button variant="contained" color="primary">
            View Property
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
} 