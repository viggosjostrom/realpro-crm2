export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
  type: 'buyer' | 'seller' | 'both';
  createdAt: Date;
  updatedAt: Date;
};

export type Property = {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  price: number;
  size: number; // in square meters
  rooms: number;
  description?: string;
  status: 'available' | 'pending' | 'sold';
  type: 'apartment' | 'house' | 'villa' | 'townhouse' | 'cottage';
  images: string[];
  ownerId?: string; // Reference to client (seller)
  buyerId?: string; // Reference to client who bought the property
  agentId?: string; // Reference to agent
  createdAt: Date;
  updatedAt: Date;
  listedAt?: Date;
  soldAt?: Date;
};

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: 'website' | 'referral' | 'social' | 'event' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  notes?: string;
  assignedTo?: string; // Reference to agent
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
};

export type Activity = {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'viewing' | 'offer' | 'other';
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  clientId?: string; // Reference to client
  propertyId?: string; // Reference to property
  leadId?: string; // Reference to lead
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'agent';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DashboardStats = {
  totalClients: number;
  totalProperties: number;
  totalLeads: number;
  propertiesSold: number;
  revenueGenerated: number;
  activeListings: number;
  pendingDeals: number;
  newLeadsThisMonth: number;
  commissionGoal: number;
  currentCommission: number;
  commissionLastMonth: number;
  daysLeftInMonth: number;
}; 