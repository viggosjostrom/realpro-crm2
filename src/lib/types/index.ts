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
  type: 'appointment' | 'task' | 'call' | 'email' | 'meeting' | 'viewing' | 'offer' | 'contract' | 'follow-up' | 'evaluation' | 'reminder' | 'other';
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  status: 'completed' | 'pending' | 'cancelled' | 'scheduled';
  contact?: string; // Contact person name
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
  phone: string;
  role: 'admin' | 'agent';
  workrole: 'Real Estate Agent' | 'Partner' | 'Other' | 'Real Estate Agent / Partner';
  office: 'Vasastaden' | 'Norrmalm';
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

// Offer status types
export type OfferStatus = 'submitted' | 'negotiating' | 'accepted' | 'rejected' | 'withdrawn';

// Offer type
export type Offer = {
  id: string;
  propertyId: string;
  buyerId: string;
  amount: number;
  status: OfferStatus;
  date: Date;
  expiryDate?: Date;
  notes?: string;
};

// Transaction type
export type Transaction = {
  id: string;
  propertyId: string;
  offerId: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  contractUrl?: string;
  completionDate?: Date;
  notes?: string;
};

// Document type categories
export type DocumentType = 'contract' | 'offer_letter' | 'agreement' | 'loan_approval' | 'inspection' | 'insurance' | 'tax' | 'other';

// Document object type
export type Document = {
  id: string;
  propertyId: string;
  title: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: number; // in KB
  uploadedBy: string; // User ID
  uploadedAt: Date;
  relatedToId?: string; // Can be related to offer, transaction, client, etc.
  relatedToType?: 'offer' | 'transaction' | 'client';
  description?: string;
  tags?: string[];
  isPublic?: boolean; // Whether the document can be shared with clients
};

// Colleague type (extends User with additional properties)
export type Colleague = User & {
  position: string;
  office: string;
  propertyCount: number;
};

// Meeting room type
export type MeetingRoom = {
  id: string;
  name: string;
  image: string;
  capacity: number;
  isAvailable: boolean;
  office: string;
  description?: string;
}; 