'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Paper } from '@mui/material';
import { EventInput } from '@fullcalendar/core';

// Mock data for activities
const mockActivities: EventInput[] = [
  {
    id: '1',
    title: 'Property Viewing - 123 Main St',
    start: '2024-04-05T10:00:00',
    end: '2024-04-05T11:00:00',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    extendedProps: {
      type: 'viewing',
      client: 'John Smith',
      property: '123 Main St',
      status: 'planned'
    }
  },
  {
    id: '2',
    title: 'Client Call - Sarah Johnson',
    start: '2024-04-05T14:00:00',
    end: '2024-04-05T14:30:00',
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    extendedProps: {
      type: 'call',
      client: 'Sarah Johnson',
      status: 'planned'
    }
  }
];

export default function Calendar() {
  const handleDateClick = (arg: any) => {
    console.log('Date clicked:', arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    console.log('Event clicked:', arg.event);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ height: 'calc(100vh - 200px)' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={mockActivities}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="100%"
        />
      </Box>
    </Paper>
  );
} 