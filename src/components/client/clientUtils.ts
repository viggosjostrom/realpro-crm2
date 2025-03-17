import { Property, Activity } from '@/lib/types';
import { mockProperties, mockActivities } from '@/lib/utils/mockData';

// Helper function to get associated properties for a client
export const getClientProperties = (clientId: string): Property[] => {
  return mockProperties.filter(property => 
    property.ownerId === clientId || property.buyerId === clientId
  );
};

// Helper function to get client's activities
export const getClientActivities = (clientId: string): Activity[] => {
  return mockActivities.filter(activity => activity.clientId === clientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Format date
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to get last interaction date (mock data)
export const getLastInteraction = (): Date => {
  // For demo purposes, generate a random date within the last month
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return new Date(today.setDate(today.getDate() - daysAgo));
}; 