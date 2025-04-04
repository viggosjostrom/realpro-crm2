'use client';

import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { Calendar as BigCalendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { mockActivities } from '@/lib/utils/mockData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventDetailsModal from './EventDetailsModal';

// Mock reference date (2023-06-15)
const MOCK_REFERENCE_DATE = new Date('2023-06-15');

// Setup the localizer
const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Transform mock activities into calendar events
const calendarEvents: Event[] = mockActivities.map(activity => {
  const startDate = new Date(activity.date);
  const endDate = new Date(startDate);
  
  // Set default duration based on activity type
  switch (activity.type) {
    case 'viewing':
      endDate.setHours(endDate.getHours() + 1); // 1 hour for viewings
      break;
    case 'meeting':
      endDate.setHours(endDate.getHours() + 1.5); // 1.5 hours for meetings
      break;
    case 'call':
      endDate.setMinutes(endDate.getMinutes() + 30); // 30 minutes for calls
      break;
    case 'appointment':
      endDate.setHours(endDate.getHours() + 1); // 1 hour for appointments
      break;
    case 'task':
      endDate.setHours(endDate.getHours() + 2); // 2 hours for tasks
      break;
    default:
      endDate.setHours(endDate.getHours() + 1); // Default 1 hour
  }

  // Set color based on activity type
  let backgroundColor = '#2196F3'; // Default blue
  switch (activity.type) {
    case 'viewing':
      backgroundColor = '#4CAF50'; // Green
      break;
    case 'meeting':
      backgroundColor = '#FF9800'; // Orange
      break;
    case 'call':
      backgroundColor = '#2196F3'; // Blue
      break;
    case 'appointment':
      backgroundColor = '#9C27B0'; // Purple
      break;
    case 'task':
      backgroundColor = '#607D8B'; // Grey
      break;
  }

  return {
    id: activity.id,
    title: activity.title,
    start: startDate,
    end: endDate,
    allDay: false,
    resource: {
      type: activity.type,
      client: activity.contact,
      property: activity.propertyId,
      status: activity.status,
      notes: activity.description,
      completed: activity.completed
    },
    style: {
      backgroundColor,
      color: 'white',
      borderRadius: '4px',
      border: 'none'
    }
  };
});

export default function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ height: 'calc(100vh - 200px)' }}>
        <BigCalendar
          localizer={localizer}
          events={calendarEvents}
          defaultDate={MOCK_REFERENCE_DATE}
          defaultView="month"
          views={['month', 'week', 'day']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={(event: Event) => ({
            style: (event as any).style
          })}
          onSelectEvent={handleEventClick}
          toolbar={true}
          popup={true}
          selectable={false}
        />
      </Box>
      <EventDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </Paper>
  );
} 