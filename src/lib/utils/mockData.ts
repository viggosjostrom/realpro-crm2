import { Client, Property, Lead, Activity, User, DashboardStats, Offer, Transaction, Document } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Johan',
    lastName: 'Andersson',
    email: 'johan.andersson@realpro.se',
    phone: '+46 70 123 45 67',
    role: 'admin',
    workrole: 'Real Estate Agent / Partner',
    office: 'Vasastaden',
    avatar: '/avatars/johan.jpg',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Lindberg',
    email: 'emma.lindberg@realpro.se',
    phone: '+46 70 234 56 78',
    role: 'agent',
    workrole: 'Real Estate Agent',
    office: 'Vasastaden',
    avatar: '/avatars/emma.jpg',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '3',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    email: 'ali.ahmadi@realpro.se',
    phone: '+46 70 345 67 89',
    role: 'agent',
    workrole: 'Real Estate Agent',
    office: 'Norrmalm',
    avatar: '/avatars/ali.jpg',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Anders',
    lastName: 'Johansson',
    email: 'anders.johansson@gmail.com',
    phone: '070-123-4567',
    address: 'Sveavägen 45',
    city: 'Stockholm',
    postalCode: '11334',
    notes: 'Looking for a 3-bedroom apartment in Södermalm',
    type: 'buyer',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Eriksson',
    email: 'maria.eriksson@outlook.com',
    phone: '073-987-6543',
    address: 'Kungsgatan 12',
    city: 'Stockholm',
    postalCode: '11122',
    notes: 'Selling her apartment to move to a larger house',
    type: 'seller',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '3',
    firstName: 'Erik',
    lastName: 'Lindgren',
    email: 'erik.lindgren@hotmail.com',
    phone: '076-555-4321',
    address: 'Odengatan 78',
    city: 'Stockholm',
    postalCode: '11322',
    notes: 'Looking to both sell current apartment and buy a house',
    type: 'both',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-01'),
  },
  {
    id: '4',
    firstName: 'Lena',
    lastName: 'Karlsson',
    email: 'lena.karlsson@gmail.com',
    phone: '070-222-3333',
    address: 'Götgatan 34',
    city: 'Stockholm',
    postalCode: '11826',
    type: 'buyer',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10'),
  },
  {
    id: '5',
    firstName: 'Karl',
    lastName: 'Nilsson',
    email: 'karl.nilsson@gmail.com',
    phone: '073-444-5555',
    address: 'Birger Jarlsgatan 22',
    city: 'Stockholm',
    postalCode: '11434',
    type: 'seller',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15'),
  },
  {
    id: '6',
    firstName: 'Sara',
    lastName: 'Björk',
    email: 'sara.bjork@gmail.com',
    phone: '070-666-7777',
    address: 'Norrtullsgatan 14',
    city: 'Stockholm',
    postalCode: '11327',
    notes: 'Looking to invest in real estate',
    type: 'buyer',
    createdAt: new Date('2023-01-05'),
    updatedAt: new Date('2023-01-05'),
  },
  {
    id: '7',
    firstName: 'Gustav',
    lastName: 'Holm',
    email: 'gustav.holm@outlook.com',
    phone: '073-888-9999',
    address: 'Karlavägen 63',
    city: 'Stockholm',
    postalCode: '11449',
    notes: 'Selling family property after inheritance',
    type: 'seller',
    createdAt: new Date('2022-12-10'),
    updatedAt: new Date('2022-12-10'),
  },
  {
    id: '8',
    firstName: 'Astrid',
    lastName: 'Lundqvist',
    email: 'astrid.lundqvist@gmail.com',
    phone: '076-333-2222',
    address: 'Högbergsgatan 41',
    city: 'Stockholm',
    postalCode: '11826',
    notes: 'Looking for a vacation property in the archipelago',
    type: 'buyer',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-02-01'),
  },
  {
    id: '9',
    firstName: 'Henrik',
    lastName: 'Bergman',
    email: 'henrik.bergman@gmail.com',
    phone: '070-777-8888',
    address: 'Nybrogatan 28',
    city: 'Stockholm',
    postalCode: '11439',
    notes: 'High net worth client looking for premium properties',
    type: 'buyer',
    createdAt: new Date('2023-01-18'),
    updatedAt: new Date('2023-01-18'),
  },
  {
    id: '10',
    firstName: 'Johanna',
    lastName: 'Sjöberg',
    email: 'johanna.sjoberg@outlook.com',
    phone: '073-222-1111',
    address: 'Vasagatan 15',
    city: 'Stockholm',
    postalCode: '11120',
    notes: 'Selling apartment to relocate abroad',
    type: 'seller',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-05'),
  },
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    address: 'Hornsgatan 45',
    city: 'Stockholm',
    postalCode: '11728',
    price: 4950000,
    size: 72,
    rooms: 3,
    description: 'Beautiful 3-room apartment in the heart of Södermalm with a balcony and view of Riddarfjärden. This bright and spacious apartment features a newly renovated kitchen with high-end appliances, a modern bathroom with heated floors, and a generous living room with large windows providing plenty of natural light. The apartment has preserved original details such as high ceilings and decorative moldings, combined with modern amenities. The location offers easy access to restaurants, cafes, shopping, and public transportation.',
    status: 'available',
    type: 'apartment',
    images: ['/properties/dashboard-property-1.jpg'],
    ownerId: '2',
    agentId: '1',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-20'),
    listedAt: new Date('2023-02-25'),
  },
  {
    id: '2',
    address: 'Valhallavägen 128',
    city: 'Stockholm',
    postalCode: '11522',
    price: 7100000,
    size: 110,
    rooms: 4,
    description: 'Spacious 4-room apartment near KTH with newly renovated kitchen and bathroom. This elegant apartment is located in a well-maintained building from the 1930s and offers a perfect blend of classic charm and modern comfort. The apartment features a large living room with a beautiful bay window, a separate dining area, and three bedrooms. The kitchen has been completely renovated with high-quality appliances and custom cabinetry. The bathroom features marble tiles, a walk-in shower, and a separate bathtub. The location is ideal, with easy access to universities, parks, and public transportation.',
    status: 'pending',
    type: 'apartment',
    images: ['/properties/dashboard-property-2.jpg'],
    ownerId: '5',
    buyerId: '4',
    agentId: '1',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-04-05'),
    listedAt: new Date('2023-03-10'),
  },
  {
    id: '3',
    address: 'Norr Mälarstrand 84',
    city: 'Stockholm',
    postalCode: '11220',
    price: 12500000,
    size: 155,
    rooms: 5,
    description: 'Luxurious 5-room apartment with panoramic views of Lake Mälaren and the City Hall. This exceptional apartment is located in one of Stockholm\'s most prestigious addresses and offers unparalleled views of the water and city skyline. The apartment has been meticulously renovated with the highest quality materials and attention to detail. Features include a gourmet kitchen with custom cabinetry and top-of-the-line appliances, a spacious living room with a fireplace, a formal dining room, and a master suite with a luxurious bathroom and walk-in closet. Additional features include smart home technology, custom lighting, and a wine cellar.',
    status: 'available',
    type: 'apartment',
    images: ['/properties/dashboard-property-3.jpg'],
    ownerId: '3',
    agentId: '1',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15'),
    listedAt: new Date('2023-03-20'),
  },
  {
    id: '4',
    address: 'Djursholmsvägen 22',
    city: 'Djursholm',
    postalCode: '18257',
    price: 18500000,
    size: 230,
    rooms: 7,
    description: 'Elegant villa from the early 1900s with a large garden and garage for two cars. This magnificent property combines classic architecture with modern amenities and offers generous living spaces both indoors and outdoors. The main floor features a grand entrance hall, a formal living room, a library, a dining room, and a modern kitchen with a breakfast area. The upper floor houses four spacious bedrooms, including a master suite with a private bathroom and dressing room. The basement has been converted into a recreation area with a home theater, a gym, and a wine cellar. The beautifully landscaped garden includes mature trees, a terrace for outdoor dining, and a heated pool.',
    status: 'available',
    type: 'villa',
    images: ['/properties/dashboard-property-4.jpg'],
    ownerId: '7',
    agentId: '1',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-25'),
    listedAt: new Date('2023-03-30'),
  },
  {
    id: '5',
    address: 'Strandvägen 7',
    city: 'Stockholm',
    postalCode: '11456',
    price: 24500000,
    size: 210,
    rooms: 6,
    description: 'Prestigious apartment on Strandvägen with high ceilings, stucco, and a fireplace. This extraordinary apartment is located in one of Stockholm\'s most iconic buildings and offers a rare opportunity to own a piece of history. The apartment features grand proportions with ceiling heights of over 3.5 meters, original parquet floors, and intricate stucco work. The living spaces include a formal reception room, a library, a dining room that can accommodate 12 guests, and a modern kitchen that respects the historical context. The apartment has four bedrooms, including a master suite with a dressing room and a marble bathroom. Additional features include three fireplaces, custom built-ins, and a separate staff quarters.',
    status: 'sold',
    type: 'apartment',
    images: ['/properties/dashboard-property-5.jpg'],
    ownerId: '10',
    buyerId: '6',
    agentId: '2',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-02-28'),
    listedAt: new Date('2023-01-15'),
    soldAt: new Date('2023-02-28'),
  },
  {
    id: '6',
    address: 'Götgatan 118',
    city: 'Stockholm',
    postalCode: '11862',
    price: 5850000,
    size: 85,
    rooms: 3,
    description: 'Modern 3-room apartment in SoFo with open floor plan and newly renovated kitchen. South-facing balcony. This stylish apartment is located in one of Stockholm\'s trendiest neighborhoods and offers a contemporary living experience. The open floor plan creates a seamless flow between the living room, dining area, and kitchen, making it perfect for entertaining. The kitchen features sleek cabinetry, stone countertops, and high-end appliances. The apartment has two bedrooms, including a master bedroom with an en-suite bathroom. The south-facing balcony is perfect for enjoying morning coffee or evening drinks. The location offers easy access to boutiques, restaurants, cafes, and parks.',
    status: 'available',
    type: 'apartment',
    images: ['/properties/dashboard-property-6.jpg'],
    ownerId: '10',
    agentId: '2',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05'),
    listedAt: new Date('2023-04-10'),
  },
  {
    id: '7',
    address: 'Karlaplan 10',
    city: 'Stockholm',
    postalCode: '11527',
    price: 8650000,
    size: 105,
    rooms: 4,
    description: 'Elegant pre-war apartment with original details and a modern renovation. Located in the prestigious Östermalm district, this apartment offers a perfect combination of historical charm and contemporary comfort. Features include high ceilings, herringbone parquet floors, decorative moldings, and three large windows facing a quiet courtyard. The kitchen has been completely updated with high-end appliances and custom cabinetry. The property includes three spacious bedrooms, a formal dining room, and a renovated bathroom with heated marble floors.',
    status: 'sold',
    type: 'apartment',
    images: ['/properties/dashboard-property-7.jpg'],
    ownerId: '5',
    buyerId: '8',
    agentId: '1',
    createdAt: new Date('2022-12-05'),
    updatedAt: new Date('2023-01-20'),
    listedAt: new Date('2022-12-10'),
    soldAt: new Date('2023-01-15'),
  },
];

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Gustav',
    lastName: 'Svensson',
    email: 'gustav.svensson@gmail.com',
    phone: '070-111-2222',
    source: 'website',
    status: 'new',
    leadType: 'valuation_request',
    priority: 'high',
    score: 85,
    budget: 6500000,
    tags: ['Luxury', 'Immediate', 'First-time seller'],
    followUpDate: new Date('2023-07-02T10:00:00'),
    notes: 'Interested in properties in Vasastan. Requested a valuation for their apartment.',
    assignedTo: '2',
    createdAt: new Date('2023-06-30T09:15:00'),
    updatedAt: new Date('2023-06-30T09:15:00'),
    activities: [
      {
        id: '1-1',
        leadId: '1',
        type: 'note',
        description: 'Lead created from website valuation request form',
        createdAt: new Date('2023-06-30T09:15:00'),
        createdBy: '1'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Sofia',
    lastName: 'Bergström',
    email: 'sofia.bergstrom@hotmail.com',
    phone: '073-333-4444',
    source: 'referral',
    status: 'contacted',
    leadType: 'referral_lead',
    priority: 'medium',
    score: 67,
    budget: 5200000,
    tags: ['Summer house', 'Archipelago', 'Investment'],
    followUpDate: new Date('2023-07-01T14:30:00'),
    notes: 'Looking for a summer house in the archipelago. Referred by client Maria Eriksson.',
    assignedTo: '1',
    createdAt: new Date('2023-06-25T14:30:00'),
    updatedAt: new Date('2023-06-28T10:45:00'),
    lastContactedAt: new Date('2023-06-28T10:45:00'),
    activities: [
      {
        id: '2-1',
        leadId: '2',
        type: 'note',
        description: 'Lead created from referral by Maria Eriksson',
        createdAt: new Date('2023-06-25T14:30:00'),
        createdBy: '1'
      },
      {
        id: '2-2',
        leadId: '2',
        type: 'call',
        description: 'Initial phone call made, discussed property preferences and budget',
        createdAt: new Date('2023-06-28T10:45:00'),
        createdBy: '1'
      },
      {
        id: '2-3',
        leadId: '2',
        type: 'status_change',
        description: 'Status changed from New to Contacted',
        createdAt: new Date('2023-06-28T10:46:00'),
        createdBy: '1'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Mikael',
    lastName: 'Öberg',
    email: 'mikael.oberg@gmail.com',
    phone: '076-777-8888',
    source: 'social',
    status: 'qualified',
    leadType: 'website_inquiry',
    priority: 'high',
    score: 92,
    budget: 7000000,
    tags: ['Investment', 'Multiple properties', 'Premium'],
    followUpDate: new Date('2023-07-03T13:00:00'),
    notes: 'Interested in investment properties. Has a budget of 5-7 million SEK.',
    assignedTo: '2',
    createdAt: new Date('2023-06-20T11:20:00'),
    updatedAt: new Date('2023-06-22T16:15:00'),
    lastContactedAt: new Date('2023-06-22T16:15:00'),
    activities: [
      {
        id: '3-1',
        leadId: '3',
        type: 'note',
        description: 'Lead created from Facebook ad campaign',
        createdAt: new Date('2023-06-20T11:20:00'),
        createdBy: '2'
      },
      {
        id: '3-2',
        leadId: '3',
        type: 'call',
        description: 'Initial phone call, very interested in investment properties',
        createdAt: new Date('2023-06-21T09:30:00'),
        createdBy: '2'
      },
      {
        id: '3-3',
        leadId: '3',
        type: 'meeting',
        description: 'Met at office, discussed investment strategy and property portfolio',
        createdAt: new Date('2023-06-22T16:15:00'),
        createdBy: '2'
      },
      {
        id: '3-4',
        leadId: '3',
        type: 'status_change',
        description: 'Status changed from Contacted to Qualified',
        createdAt: new Date('2023-06-22T16:20:00'),
        createdBy: '2'
      }
    ]
  },
  {
    id: '4',
    firstName: 'Anna',
    lastName: 'Holm',
    email: 'anna.holm@outlook.com',
    phone: '070-555-6666',
    source: 'event',
    status: 'proposal',
    leadType: 'viewing_attendee',
    propertyId: '1',
    priority: 'high',
    score: 88,
    budget: 5500000,
    tags: ['Ready to buy', 'Financing approved', 'City center'],
    followUpDate: new Date('2023-07-01T09:00:00'),
    notes: 'Met at the viewing of Hornsgatan 45. Very interested and might make an offer.',
    assignedTo: '1',
    createdAt: new Date('2023-06-18T15:00:00'),
    updatedAt: new Date('2023-06-29T09:30:00'),
    lastContactedAt: new Date('2023-06-29T09:30:00'),
    activities: [
      {
        id: '4-1',
        leadId: '4',
        type: 'viewing',
        description: 'Attended viewing of Hornsgatan 45, spent extra time in the kitchen and living room',
        createdAt: new Date('2023-06-18T15:00:00'),
        createdBy: '1'
      },
      {
        id: '4-2',
        leadId: '4',
        type: 'call',
        description: 'Follow-up call after viewing, confirmed high interest',
        createdAt: new Date('2023-06-19T11:30:00'),
        createdBy: '1'
      },
      {
        id: '4-3',
        leadId: '4',
        type: 'email',
        description: 'Sent floor plan and additional information about the property',
        createdAt: new Date('2023-06-20T10:15:00'),
        createdBy: '1'
      },
      {
        id: '4-4',
        leadId: '4',
        type: 'meeting',
        description: 'Met to discuss potential offer and pricing strategy',
        createdAt: new Date('2023-06-29T09:30:00'),
        createdBy: '1'
      },
      {
        id: '4-5',
        leadId: '4',
        type: 'status_change',
        description: 'Status changed from Qualified to Proposal',
        createdAt: new Date('2023-06-29T09:45:00'),
        createdBy: '1'
      }
    ]
  },
  {
    id: '5',
    firstName: 'Erik',
    lastName: 'Wallin',
    email: 'erik.wallin@gmail.com',
    phone: '073-999-0000',
    source: 'website',
    status: 'new',
    leadType: 'valuation_request',
    priority: 'medium',
    score: 72,
    budget: 7800000,
    tags: ['Apartment', 'Kungsholmen', 'Family'],
    followUpDate: new Date('2023-07-02T15:30:00'),
    notes: 'Requested a valuation for their 3-bedroom apartment in Kungsholmen.',
    assignedTo: '1',
    createdAt: new Date('2023-06-30T16:45:00'),
    updatedAt: new Date('2023-06-30T16:45:00'),
    activities: [
      {
        id: '5-1',
        leadId: '5',
        type: 'note',
        description: 'Lead created from website valuation request form',
        createdAt: new Date('2023-06-30T16:45:00'),
        createdBy: '1'
      }
    ]
  },
  {
    id: '6',
    firstName: 'Linnea',
    lastName: 'Sandberg',
    email: 'linnea.sandberg@hotmail.com',
    phone: '076-222-3333',
    source: 'website',
    status: 'new',
    leadType: 'website_inquiry',
    priority: 'medium',
    notes: 'Looking for a 2-bedroom apartment in Södermalm, budget around 4.5 million SEK.',
    assignedTo: '2',
    createdAt: new Date('2023-06-29T13:20:00'),
    updatedAt: new Date('2023-06-29T13:20:00'),
  },
  {
    id: '7',
    firstName: 'Olof',
    lastName: 'Nyström',
    email: 'olof.nystrom@gmail.com',
    phone: '070-444-5555',
    source: 'event',
    status: 'new',
    leadType: 'viewing_attendee',
    propertyId: '3',
    priority: 'low',
    notes: 'Attended the viewing of Norr Mälarstrand 84. Has several questions about the building.',
    assignedTo: '1',
    createdAt: new Date('2023-06-28T14:00:00'),
    updatedAt: new Date('2023-06-28T14:00:00'),
  },
  {
    id: '8',
    firstName: 'Johanna',
    lastName: 'Lindholm',
    email: 'johanna.lindholm@outlook.com',
    phone: '073-666-7777',
    source: 'referral',
    status: 'closed',
    leadType: 'referral_lead',
    priority: 'low',
    notes: 'Successfully referred to a colleague specializing in commercial properties.',
    assignedTo: '2',
    createdAt: new Date('2023-06-15T09:30:00'),
    updatedAt: new Date('2023-06-25T11:15:00'),
    lastContactedAt: new Date('2023-06-25T11:15:00'),
  },
  {
    id: '9',
    firstName: 'Mattias',
    lastName: 'Ekström',
    email: 'mattias.ekstrom@gmail.com',
    phone: '070-888-9999',
    source: 'website',
    status: 'new',
    leadType: 'valuation_request',
    priority: 'high',
    notes: 'Requested a valuation for their villa in Täby.',
    assignedTo: '1',
    createdAt: new Date('2023-06-30T10:10:00'),
    updatedAt: new Date('2023-06-30T10:10:00'),
  },
  {
    id: '10',
    firstName: 'Caroline',
    lastName: 'Söderberg',
    email: 'caroline.soderberg@hotmail.com',
    phone: '076-111-2222',
    source: 'social',
    status: 'new',
    leadType: 'website_inquiry',
    priority: 'medium',
    notes: 'Interested in newly built apartments in Hammarby Sjöstad.',
    assignedTo: '2',
    createdAt: new Date('2023-06-29T08:45:00'),
    updatedAt: new Date('2023-06-29T08:45:00'),
  },
  {
    id: '11',
    firstName: 'Daniel',
    lastName: 'Forsberg',
    email: 'daniel.forsberg@gmail.com',
    phone: '070-333-4444',
    source: 'website',
    status: 'contacted',
    leadType: 'valuation_request',
    priority: 'high',
    notes: 'Requested a valuation for their apartment. Initial call made, scheduling a visit.',
    assignedTo: '1',
    createdAt: new Date('2023-06-23T15:30:00'),
    updatedAt: new Date('2023-06-24T13:20:00'),
    lastContactedAt: new Date('2023-06-24T13:20:00'),
  },
  {
    id: '12',
    firstName: 'Helena',
    lastName: 'Björkman',
    email: 'helena.bjorkman@outlook.com',
    phone: '073-555-6666',
    source: 'event',
    status: 'negotiation',
    leadType: 'viewing_attendee',
    propertyId: '2',
    priority: 'high',
    notes: 'Attended viewing of Valhallavägen 128. Very interested, discussing potential offer.',
    assignedTo: '2',
    createdAt: new Date('2023-06-14T16:00:00'),
    updatedAt: new Date('2023-06-27T11:30:00'),
    lastContactedAt: new Date('2023-06-27T11:30:00'),
  },
  {
    id: '13',
    firstName: 'Simon',
    lastName: 'Wahlgren',
    email: 'simon.wahlgren@gmail.com',
    phone: '070-777-8888',
    source: 'other',
    status: 'lost',
    leadType: 'manual_entry',
    priority: 'low',
    notes: 'Met at networking event. Initially interested but decided not to proceed.',
    assignedTo: '1',
    createdAt: new Date('2023-06-05T09:15:00'),
    updatedAt: new Date('2023-06-18T10:45:00'),
    lastContactedAt: new Date('2023-06-18T10:45:00'),
  },
  {
    id: '14',
    firstName: 'Klara',
    lastName: 'Jonsson',
    email: 'klara.jonsson@hotmail.com',
    phone: '073-999-0000',
    source: 'website',
    status: 'new',
    leadType: 'website_inquiry',
    priority: 'medium',
    notes: 'Looking for properties with garden in the suburbs, budget around 6 million SEK.',
    assignedTo: '2',
    createdAt: new Date('2023-06-27T11:50:00'),
    updatedAt: new Date('2023-06-27T11:50:00'),
  },
  {
    id: '15',
    firstName: 'Patrik',
    lastName: 'Engström',
    email: 'patrik.engstrom@gmail.com',
    phone: '070-222-3333',
    source: 'website',
    status: 'new',
    leadType: 'valuation_request',
    priority: 'medium',
    notes: 'Requested a valuation for their townhouse in Bromma.',
    assignedTo: '1',
    createdAt: new Date('2023-06-28T09:30:00'),
    updatedAt: new Date('2023-06-28T09:30:00'),
  },
  {
    id: '16',
    firstName: 'Erika',
    lastName: 'Norén',
    email: 'erika.noren@outlook.com',
    phone: '076-444-5555',
    source: 'referral',
    status: 'contacted',
    leadType: 'referral_lead',
    priority: 'medium',
    notes: 'Referred by Erik Lindgren. Looking for a 3-bedroom apartment in Östermalm.',
    assignedTo: '2',
    createdAt: new Date('2023-06-22T14:15:00'),
    updatedAt: new Date('2023-06-23T10:30:00'),
    lastContactedAt: new Date('2023-06-23T10:30:00'),
  },
  {
    id: '17',
    firstName: 'Oscar',
    lastName: 'Lundberg',
    email: 'oscar.lundberg@gmail.com',
    phone: '070-666-7777',
    source: 'event',
    status: 'qualified',
    leadType: 'viewing_attendee',
    propertyId: '1',
    priority: 'high',
    notes: 'Met at open house for Hornsgatan 45. Pre-approved for mortgage, ready to make offer.',
    assignedTo: '1',
    createdAt: new Date('2023-06-19T15:30:00'),
    updatedAt: new Date('2023-06-26T13:45:00'),
    lastContactedAt: new Date('2023-06-26T13:45:00'),
  },
  {
    id: '18',
    firstName: 'Jenny',
    lastName: 'Holmberg',
    email: 'jenny.holmberg@hotmail.com',
    phone: '073-888-9999',
    source: 'website',
    status: 'proposal',
    leadType: 'website_inquiry',
    propertyId: '3',
    priority: 'high',
    notes: 'Sent detailed information about Norr Mälarstrand 84. Scheduling a private viewing.',
    assignedTo: '2',
    createdAt: new Date('2023-06-17T11:20:00'),
    updatedAt: new Date('2023-06-25T09:45:00'),
    lastContactedAt: new Date('2023-06-25T09:45:00'),
  },
  {
    id: '19',
    firstName: 'Anders',
    lastName: 'Karlsson',
    email: 'anders.karlsson@gmail.com',
    phone: '070-123-4567',
    source: 'other',
    status: 'closed',
    leadType: 'manual_entry',
    propertyId: '2',
    priority: 'medium',
    notes: 'Successfully connected with agent Emma. Made an offer on Valhallavägen 128.',
    assignedTo: '1',
    createdAt: new Date('2023-06-10T10:30:00'),
    updatedAt: new Date('2023-06-23T15:20:00'),
    lastContactedAt: new Date('2023-06-23T15:20:00'),
  },
  {
    id: '20',
    firstName: 'Maria',
    lastName: 'Lind',
    email: 'maria.lind@outlook.com',
    phone: '076-987-6543',
    source: 'website',
    status: 'lost',
    leadType: 'valuation_request',
    priority: 'low',
    notes: 'Requested valuation but decided to go with another agency.',
    assignedTo: '2',
    createdAt: new Date('2023-06-08T13:45:00'),
    updatedAt: new Date('2023-06-16T11:15:00'),
    lastContactedAt: new Date('2023-06-16T11:15:00'),
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  // Activities for our reference "today" (2023-06-15)
  {
    id: '101',
    type: 'meeting',
    title: 'Initial client consultation',
    description: 'Meet with new client to discuss their property needs and preferences',
    date: new Date('2023-06-15T10:00:00'), // Reference today at 10:00 AM
    completed: false,
    status: 'scheduled',
    contact: 'Sofia Bergström',
    leadId: '2',
    createdAt: new Date('2023-06-13'), // 2 days before reference today
    updatedAt: new Date('2023-06-14'), // 1 day before reference today
  },
  {
    id: '102',
    type: 'viewing',
    title: 'Property viewing at Götgatan 118',
    description: 'Showing the apartment to potential buyers interested in SoFo area',
    date: new Date('2023-06-15T15:00:00'), // Reference today at 3:00 PM
    completed: false,
    status: 'scheduled',
    contact: 'Gustav Svensson',
    propertyId: '6',
    leadId: '1',
    createdAt: new Date('2023-06-12'), // 3 days before reference today
    updatedAt: new Date('2023-06-14'), // 1 day before reference today
  },
  {
    id: '103',
    type: 'call',
    title: 'Follow-up with property owner',
    description: 'Discuss recent offers and market feedback for Hornsgatan property',
    date: new Date('2023-06-15T13:00:00'), // Reference today at 1:00 PM
    completed: false,
    status: 'scheduled',
    contact: 'Maria Eriksson',
    propertyId: '1',
    clientId: '2',
    createdAt: new Date('2023-06-14'), // 1 day before reference today
    updatedAt: new Date('2023-06-14'), // 1 day before reference today
  },

  // Activities for our reference "tomorrow" (2023-06-16)
  {
    id: '104',
    type: 'appointment',
    title: 'Property evaluation meeting',
    description: 'Meet with client to evaluate their property before listing',
    date: new Date('2023-06-16T11:30:00'), // Reference tomorrow at 11:30 AM
    completed: false,
    status: 'scheduled',
    contact: 'Lars Johansson',
    clientId: '5',
    createdAt: new Date('2023-06-14'),
    updatedAt: new Date('2023-06-14'),
  },
  {
    id: '105',
    type: 'viewing',
    title: 'Open house at Storgatan 45',
    description: 'Hosting an open house for the newly listed penthouse apartment',
    date: new Date('2023-06-16T14:00:00'), // Reference tomorrow at 2:00 PM
    completed: false,
    status: 'scheduled',
    contact: 'Property viewing',
    propertyId: '3',
    createdAt: new Date('2023-06-13'),
    updatedAt: new Date('2023-06-14'),
  },
  
  // Activities for "this week" (rest of the week after our reference today)
  {
    id: '106',
    type: 'task',
    title: 'Prepare marketing materials',
    description: 'Create brochures and online listings for new property',
    date: new Date('2023-06-17T09:00:00'), // 2 days after reference today
    completed: false,
    status: 'pending',
    propertyId: '9',
    createdAt: new Date('2023-06-14'),
    updatedAt: new Date('2023-06-14'),
  },
  {
    id: '107',
    type: 'meeting',
    title: 'Team strategy meeting',
    description: 'Weekly team meeting to discuss ongoing deals and market trends',
    date: new Date('2023-06-19T13:00:00'), // 4 days after reference today (Monday)
    completed: false,
    status: 'scheduled',
    createdAt: new Date('2023-06-12'),
    updatedAt: new Date('2023-06-12'),
  },

  // Existing activities follow
  {
    id: '1',
    type: 'meeting',
    title: 'Meeting with client Maria Eriksson',
    description: 'Discuss selling her apartment and finding a new home',
    date: new Date('2023-02-15'),
    completed: true,
    status: 'completed',
    contact: 'Maria Eriksson',
    clientId: '2',
    createdAt: new Date('2023-02-14'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '2',
    type: 'call',
    title: 'Call with Erik Lindgren',
    description: 'Discuss property requirements and budget',
    date: new Date('2023-02-18'),
    completed: true,
    status: 'completed',
    contact: 'Erik Lindgren',
    clientId: '3',
    createdAt: new Date('2023-02-17'),
    updatedAt: new Date('2023-02-18'),
  },
  {
    id: '3',
    type: 'email',
    title: 'Send property listings to Anders',
    description: 'Email Anders with 5 potential apartments in Södermalm',
    date: new Date('2023-02-20'),
    completed: true,
    status: 'completed',
    contact: 'Anders Johansson',
    clientId: '1',
    createdAt: new Date('2023-02-19'),
    updatedAt: new Date('2023-02-20'),
  },
  {
    id: '4',
    type: 'viewing',
    title: 'Property viewing at Hornsgatan 45',
    description: 'Showing the apartment to potential buyers',
    date: new Date('2023-03-05'),
    completed: true,
    status: 'completed',
    contact: 'Anders Johansson',
    propertyId: '1',
    clientId: '1',
    createdAt: new Date('2023-02-25'),
    updatedAt: new Date('2023-03-05'),
  },
  {
    id: '5',
    type: 'offer',
    title: 'Offer on Valhallavägen 128',
    description: 'Received an offer from Anders Johansson',
    date: new Date('2023-03-15'),
    completed: true,
    status: 'completed',
    contact: 'Anders Johansson',
    clientId: '1',
    propertyId: '2',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15'),
  },
  {
    id: '6',
    type: 'meeting',
    title: 'Contract signing for Valhallavägen 128',
    description: 'Meeting with buyer and seller to sign the contract',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Anders Johansson & Maria Eriksson',
    clientId: '1',
    propertyId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    type: 'call',
    title: 'Follow-up with Sofia Bergström',
    description: 'Call to discuss her requirements for a summer house',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'scheduled',
    contact: 'Sofia Bergström',
    leadId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Adding additional viewing activities for all properties
  {
    id: '8',
    type: 'viewing',
    title: 'Second viewing at Hornsgatan 45',
    description: 'Follow-up viewing with serious buyers',
    date: new Date('2023-03-12'),
    completed: true,
    status: 'completed',
    contact: 'Lena Karlsson',
    propertyId: '1',
    clientId: '4',
    createdAt: new Date('2023-03-08'),
    updatedAt: new Date('2023-03-12'),
  },
  {
    id: '9',
    type: 'viewing',
    title: 'Evening viewing at Hornsgatan 45',
    description: 'Evening slot for those who couldn\'t make it during the day',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Erik Lindgren',
    propertyId: '1',
    clientId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    type: 'viewing',
    title: 'First viewing at Valhallavägen 128',
    description: 'Initial viewing of the property with multiple interested buyers',
    date: new Date('2023-03-08'),
    completed: true,
    status: 'completed',
    contact: 'Anders Johansson',
    propertyId: '2',
    clientId: '1',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-08'),
  },
  {
    id: '11',
    type: 'viewing',
    title: 'Private viewing at Valhallavägen 128',
    description: 'Follow-up viewing for a serious buyer',
    date: new Date('2023-03-10'),
    completed: true,
    status: 'completed',
    contact: 'Henrik Bergman',
    propertyId: '2',
    clientId: '9',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-10'),
  },
  {
    id: '12',
    type: 'viewing',
    title: 'Final viewing at Valhallavägen 128',
    description: 'Last chance viewing before offer deadline',
    date: new Date('2023-03-12'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '2',
    clientId: '1',
    createdAt: new Date('2023-03-08'),
    updatedAt: new Date('2023-03-12'),
  },
  {
    id: '13',
    type: 'viewing',
    title: 'Initial viewing at Birger Jarlsgatan 104',
    description: 'First showing of this premium property',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Multiple Clients',
    propertyId: '3',
    clientId: '9',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '14',
    type: 'viewing',
    title: 'Open house at Sveavägen 88',
    description: 'Open house event for this newly renovated apartment',
    date: new Date('2023-03-04'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '4',
    clientId: '1',
    createdAt: new Date('2023-02-25'),
    updatedAt: new Date('2023-03-04'),
  },
  {
    id: '15',
    type: 'viewing',
    title: 'Second viewing at Sveavägen 88',
    description: 'Follow-up viewings for interested buyers',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Lena Karlsson',
    propertyId: '4',
    clientId: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '16',
    type: 'viewing',
    title: 'Viewing at Bondegatan 70',
    description: 'Showing this charming apartment in Södermalm',
    date: new Date('2023-03-02'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '5',
    clientId: '1',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-03-02'),
  },
  {
    id: '17',
    type: 'viewing',
    title: 'Evening viewing at Bondegatan 70',
    description: 'Extra viewing slot in the evening',
    date: new Date('2023-03-03'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '5',
    clientId: '4',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-03-03'),
  },
  {
    id: '18',
    type: 'viewing',
    title: 'Final viewing at Bondegatan 70',
    description: 'Last chance to view before offers are considered',
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Multiple Clients',
    propertyId: '5',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Adding additional activity types
  {
    id: '19',
    type: 'call',
    title: 'Follow up with Maria Eriksson',
    description: 'Call to discuss offers received on her property',
    date: new Date('2023-03-16'),
    completed: true,
    status: 'completed',
    contact: 'Maria Eriksson',
    propertyId: '1',
    clientId: '2',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-16'),
  },
  {
    id: '20',
    type: 'email',
    title: 'Send offer details to Maria',
    description: 'Email Maria with details of all offers received',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'pending',
    contact: 'Maria Eriksson',
    propertyId: '1',
    clientId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Additional follow-up activities for properties
  {
    id: '21',
    type: 'call',
    title: 'Follow-up call about Hornsgatan 45',
    description: 'Call potential buyers who viewed the property',
    date: new Date('2023-03-20'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '1',
    clientId: '2',
    createdAt: new Date('2023-03-19'),
    updatedAt: new Date('2023-03-20'),
  },
  {
    id: '22',
    type: 'email',
    title: 'Additional information for Norr Mälarstrand 84',
    description: 'Send floor plans and renovation history',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'pending',
    contact: 'Henrik Bergman',
    propertyId: '3',
    clientId: '9',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '23',
    type: 'meeting',
    title: 'Meeting about Djursholmsvägen 22',
    description: 'Discuss marketing strategy for the villa',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Maria Eriksson',
    propertyId: '4',
    clientId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '24',
    type: 'call',
    title: 'Interest check for Götgatan 118',
    description: 'Call leads who showed interest at the viewing',
    date: new Date('2023-03-18'),
    completed: true,
    status: 'completed',
    contact: 'Multiple Clients',
    propertyId: '6',
    clientId: '1',
    createdAt: new Date('2023-03-17'),
    updatedAt: new Date('2023-03-18'),
  },
  
  // Add additional activities for today, tomorrow, and coming week
  {
    id: '25',
    type: 'contract',
    title: 'Contract signing for Götgatan 118',
    description: 'Finalize the sale with buyer and seller',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Lena Karlsson & Gustav Holm',
    propertyId: '6',
    clientId: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '26',
    type: 'follow-up',
    title: 'Follow-up with potential buyers',
    description: 'Call all potential buyers after the open house',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'scheduled',
    contact: 'Multiple Clients',
    propertyId: '3',
    clientId: '9',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '27',
    type: 'evaluation',
    title: 'Property evaluation in Östermalm',
    description: 'Visit new property for market valuation',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Johanna Sjöberg',
    clientId: '10',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '28',
    type: 'meeting',
    title: 'Strategy meeting with marketing team',
    description: 'Discuss spring campaign for luxury properties',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'scheduled',
    contact: 'Marketing Team',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '29',
    type: 'call',
    title: 'Call with mortgage advisor',
    description: 'Discuss financing options for client',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    completed: false,
    status: 'scheduled',
    contact: 'SEB Bank & Anders Johansson',
    propertyId: '2',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '30',
    type: 'email',
    title: 'Send documents to notary',
    description: 'Forward contracts for finalization',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'pending',
    contact: 'Legal Department',
    propertyId: '5',
    clientId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '31',
    type: 'viewing',
    title: 'Group viewing at Götgatan 118',
    description: 'Open house event for interested buyers',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Multiple Clients',
    propertyId: '6',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '32',
    type: 'evaluation',
    title: 'Market analysis presentation',
    description: 'Present current market trends to team',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Sales Team',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '33',
    type: 'follow-up',
    title: 'Post-viewing follow-up calls',
    description: 'Call all viewers from yesterdays viewing',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    status: 'scheduled',
    contact: 'Multiple Clients',
    propertyId: '4',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '34',
    type: 'contract',
    title: 'Review contract draft with lawyer',
    description: 'Go through final contract for Valhallavägen sale',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Legal Department',
    propertyId: '2',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '35',
    type: 'meeting',
    title: 'Team performance review',
    description: 'Quarterly performance review with agents',
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Sales Team',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '36',
    type: 'offer',
    title: 'Present offer to property owner',
    description: 'Discuss offer on Sveavägen 88',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false,
    status: 'scheduled',
    contact: 'Karl Nilsson',
    propertyId: '4',
    clientId: '5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Offers
export const mockOffers: Offer[] = [
  {
    id: '1',
    propertyId: '1',
    buyerId: '1',
    amount: 4800000,
    status: 'negotiating',
    date: new Date('2023-03-15'),
    expiryDate: new Date('2023-03-22'),
    notes: 'Initial offer, below asking price.'
  },
  {
    id: '2',
    propertyId: '1',
    buyerId: '3',
    amount: 4700000,
    status: 'rejected',
    date: new Date('2023-03-14'),
    expiryDate: new Date('2023-03-21'),
    notes: 'Too low compared to asking price.'
  },
  {
    id: '3',
    propertyId: '1',
    buyerId: '6',
    amount: 4900000,
    status: 'submitted',
    date: new Date('2023-03-18'),
    expiryDate: new Date('2023-03-25'),
    notes: 'Received today, close to asking price.'
  },
  {
    id: '4',
    propertyId: '2',
    buyerId: '4',
    amount: 7100000,
    status: 'accepted',
    date: new Date('2023-03-12'),
    expiryDate: new Date('2023-03-19'),
    notes: 'Offer accepted after minor negotiation.'
  },
  {
    id: '5',
    propertyId: '5',
    buyerId: '6',
    amount: 24500000,
    status: 'accepted',
    date: new Date('2023-02-20'),
    expiryDate: new Date('2023-02-27'),
    notes: 'Accepted final offer after negotiations.'
  },
  {
    id: '6',
    propertyId: '7',
    buyerId: '8',
    amount: 8650000,
    status: 'accepted',
    date: new Date('2023-01-10'),
    expiryDate: new Date('2023-01-17'),
    notes: 'Offer accepted at slightly below asking price.'
  },
  {
    id: '7',
    propertyId: '3',
    buyerId: '1',
    amount: 12000000,
    status: 'submitted',
    date: new Date('2023-03-28'),
    expiryDate: new Date('2023-04-04'),
    notes: 'Initial offer, significantly below asking price.'
  },
  {
    id: '8',
    propertyId: '4',
    buyerId: '3',
    amount: 18000000,
    status: 'negotiating',
    date: new Date('2023-04-02'),
    expiryDate: new Date('2023-04-09'),
    notes: 'Counteroffer made at 18M SEK.'
  },
  {
    id: '9',
    propertyId: '1',
    buyerId: '9',
    amount: 4925000,
    status: 'submitted',
    date: new Date('2023-03-19'),
    expiryDate: new Date('2023-03-26'),
    notes: 'High interest buyer, close to asking price.'
  },
  {
    id: '10',
    propertyId: '2',
    buyerId: '8',
    amount: 7000000,
    status: 'rejected',
    date: new Date('2023-03-11'),
    expiryDate: new Date('2023-03-18'),
    notes: 'Lower than the accepted offer.'
  },
  {
    id: '11',
    propertyId: '2',
    buyerId: '9',
    amount: 7050000,
    status: 'rejected',
    date: new Date('2023-03-11'),
    expiryDate: new Date('2023-03-18'),
    notes: 'Slightly lower than the accepted offer.'
  },
  {
    id: '12',
    propertyId: '3',
    buyerId: '9',
    amount: 12300000,
    status: 'submitted',
    date: new Date('2023-03-29'),
    expiryDate: new Date('2023-04-05'),
    notes: 'High interest buyer making competitive offer.'
  },
  {
    id: '13',
    propertyId: '4',
    buyerId: '9',
    amount: 18200000,
    status: 'submitted',
    date: new Date('2023-04-03'),
    expiryDate: new Date('2023-04-10'),
    notes: 'High interest buyer with strong offer.'
  },
  {
    id: '14',
    propertyId: '5',
    buyerId: '9',
    amount: 24300000,
    status: 'rejected',
    date: new Date('2023-02-19'),
    expiryDate: new Date('2023-02-26'),
    notes: 'Close but not the highest offer.'
  },
  {
    id: '15',
    propertyId: '5',
    buyerId: '1',
    amount: 24000000,
    status: 'rejected',
    date: new Date('2023-02-18'),
    expiryDate: new Date('2023-02-25'),
    notes: 'Initial offer, not competitive enough.'
  },
  {
    id: '16',
    propertyId: '6',
    buyerId: '4',
    amount: 5700000,
    status: 'submitted',
    date: new Date('2023-04-16'),
    expiryDate: new Date('2023-04-23'),
    notes: 'Offer after viewing, below asking price.'
  },
  {
    id: '17',
    propertyId: '7',
    buyerId: '4',
    amount: 8500000,
    status: 'rejected',
    date: new Date('2023-01-08'),
    expiryDate: new Date('2023-01-15'),
    notes: 'Lower than the accepted offer.'
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    propertyId: '2',
    offerId: '4',
    sellerId: '5',
    buyerId: '4',
    amount: 7100000,
    status: 'pending',
    contractUrl: '/contracts/transaction_1.pdf',
    notes: 'Final contract being drawn up.'
  },
  {
    id: '2',
    propertyId: '5',
    offerId: '5',
    sellerId: '10',
    buyerId: '6',
    amount: 24500000,
    status: 'completed',
    contractUrl: '/contracts/transaction_2.pdf',
    completionDate: new Date('2023-02-28'),
    notes: 'Transaction completed successfully.'
  },
  {
    id: '3',
    propertyId: '7',
    offerId: '6',
    sellerId: '5',
    buyerId: '8',
    amount: 8650000,
    status: 'completed',
    contractUrl: '/contracts/transaction_3.pdf',
    completionDate: new Date('2023-01-15'),
    notes: 'Transaction completed ahead of schedule.'
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  // Property 1 (Hornsgatan 45) - Available
  {
    id: '1',
    propertyId: '1',
    title: 'Floor Plan - Hornsgatan 45',
    type: 'other',
    fileUrl: '/documents/property_1/floor_plan.pdf',
    fileSize: 1245,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-02-25'),
    description: 'Detailed floor plan with measurements',
    tags: ['floor plan', 'property details'],
    isPublic: true
  },
  {
    id: '2',
    propertyId: '1',
    title: 'Property Assessment Report',
    type: 'other',
    fileUrl: '/documents/property_1/assessment.pdf',
    fileSize: 2780,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-02-26'),
    description: 'Official property assessment and valuation',
    tags: ['assessment', 'valuation'],
    isPublic: true
  },
  {
    id: '3',
    propertyId: '1',
    title: 'Offer Letter - Anders Johansson',
    type: 'offer_letter',
    fileUrl: '/documents/property_1/offer_1.pdf',
    fileSize: 560,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-15'),
    relatedToId: '1', // Offer ID
    relatedToType: 'offer',
    description: 'Formal offer letter from Anders Johansson',
    tags: ['offer', 'negotiation'],
    isPublic: false
  },
  {
    id: '4',
    propertyId: '1',
    title: 'Offer Letter - Erik Lindgren',
    type: 'offer_letter',
    fileUrl: '/documents/property_1/offer_2.pdf',
    fileSize: 545,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-14'),
    relatedToId: '2', // Offer ID
    relatedToType: 'offer',
    description: 'Formal offer letter from Erik Lindgren',
    tags: ['offer', 'rejected'],
    isPublic: false
  },
  
  // Property 2 (Valhallavägen 128) - Pending
  {
    id: '5',
    propertyId: '2',
    title: 'Purchase Agreement - Valhallavägen 128',
    type: 'contract',
    fileUrl: '/documents/property_2/purchase_agreement.pdf',
    fileSize: 3450,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-20'),
    relatedToId: '1', // Transaction ID
    relatedToType: 'transaction',
    description: 'Final purchase agreement between Karl Nilsson and Lena Karlsson',
    tags: ['contract', 'signed', 'purchase'],
    isPublic: false
  },
  {
    id: '6',
    propertyId: '2',
    title: 'Loan Approval - Lena Karlsson',
    type: 'loan_approval',
    fileUrl: '/documents/property_2/loan_approval.pdf',
    fileSize: 1850,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-18'),
    relatedToId: '4', // Client ID
    relatedToType: 'client',
    description: 'Bank loan approval for Lena Karlsson',
    tags: ['loan', 'bank', 'approval'],
    isPublic: false
  },
  {
    id: '7',
    propertyId: '2',
    title: 'Property Inspection Report',
    type: 'inspection',
    fileUrl: '/documents/property_2/inspection.pdf',
    fileSize: 4250,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-15'),
    description: 'Detailed property inspection with findings',
    tags: ['inspection', 'report'],
    isPublic: true
  },
  
  // Property 3 (Norr Mälarstrand 84) - Available
  {
    id: '8',
    propertyId: '3',
    title: 'Floor Plan - Norr Mälarstrand 84',
    type: 'other',
    fileUrl: '/documents/property_3/floor_plan.pdf',
    fileSize: 2560,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-20'),
    description: 'Detailed floor plan with measurements',
    tags: ['floor plan', 'property details'],
    isPublic: true
  },
  {
    id: '9',
    propertyId: '3',
    title: 'Property Disclosure Statement',
    type: 'other',
    fileUrl: '/documents/property_3/disclosure.pdf',
    fileSize: 1820,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-20'),
    description: 'Seller\'s disclosure of property condition',
    tags: ['disclosure', 'legal'],
    isPublic: true
  },
  
  // Property 4 (Djursholmsvägen 22) - Available
  {
    id: '10',
    propertyId: '4',
    title: 'Floor Plan - Djursholmsvägen 22',
    type: 'other',
    fileUrl: '/documents/property_4/floor_plan.pdf',
    fileSize: 3580,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-30'),
    description: 'Complete floor plan of all levels',
    tags: ['floor plan', 'property details'],
    isPublic: true
  },
  {
    id: '11',
    propertyId: '4',
    title: 'Property Brochure',
    type: 'other',
    fileUrl: '/documents/property_4/brochure.pdf',
    fileSize: 8450,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-03-30'),
    description: 'High-quality brochure with professional photos',
    tags: ['marketing', 'brochure'],
    isPublic: true
  },
  {
    id: '12',
    propertyId: '4',
    title: 'Pre-approval - Erik Lindgren',
    type: 'loan_approval',
    fileUrl: '/documents/property_4/pre_approval.pdf',
    fileSize: 780,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-04-02'),
    relatedToId: '3', // Client ID
    relatedToType: 'client',
    description: 'Bank pre-approval for Erik Lindgren',
    tags: ['loan', 'pre-approval'],
    isPublic: false
  },
  
  // Property 5 (Strandvägen 7) - Sold
  {
    id: '13',
    propertyId: '5',
    title: 'Final Purchase Contract - Strandvägen 7',
    type: 'contract',
    fileUrl: '/documents/property_5/purchase_contract.pdf',
    fileSize: 5240,
    uploadedBy: '2', // Emma Lindberg
    uploadedAt: new Date('2023-02-25'),
    relatedToId: '2', // Transaction ID
    relatedToType: 'transaction',
    description: 'Final signed purchase contract between Johanna Sjöberg and Sara Björk',
    tags: ['contract', 'signed', 'final'],
    isPublic: false
  },
  {
    id: '14',
    propertyId: '5',
    title: 'Loan Documentation - Sara Björk',
    type: 'loan_approval',
    fileUrl: '/documents/property_5/loan_docs.pdf',
    fileSize: 3850,
    uploadedBy: '2', // Emma Lindberg
    uploadedAt: new Date('2023-02-22'),
    relatedToId: '6', // Client ID
    relatedToType: 'client',
    description: 'Complete loan documentation for the buyer',
    tags: ['loan', 'financing', 'approved'],
    isPublic: false
  },
  {
    id: '15',
    propertyId: '5',
    title: 'Transfer of Ownership',
    type: 'agreement',
    fileUrl: '/documents/property_5/transfer.pdf',
    fileSize: 1240,
    uploadedBy: '2', // Emma Lindberg
    uploadedAt: new Date('2023-02-28'),
    relatedToId: '2', // Transaction ID
    relatedToType: 'transaction',
    description: 'Legal documentation for property title transfer',
    tags: ['legal', 'transfer', 'ownership'],
    isPublic: false
  },
  
  // Property 6 (Götgatan 118) - Available
  {
    id: '16',
    propertyId: '6',
    title: 'Floor Plan - Götgatan 118',
    type: 'other',
    fileUrl: '/documents/property_6/floor_plan.pdf',
    fileSize: 1960,
    uploadedBy: '2', // Emma Lindberg
    uploadedAt: new Date('2023-04-10'),
    description: 'Detailed floor plan with measurements',
    tags: ['floor plan', 'property details'],
    isPublic: true
  },
  {
    id: '17',
    propertyId: '6',
    title: 'Property Condition Report',
    type: 'inspection',
    fileUrl: '/documents/property_6/condition.pdf',
    fileSize: 4120,
    uploadedBy: '2', // Emma Lindberg
    uploadedAt: new Date('2023-04-10'),
    description: 'Detailed assessment of property condition',
    tags: ['condition', 'report', 'inspection'],
    isPublic: true
  },
  
  // Property 7 (Karlaplan 10) - Sold
  {
    id: '18',
    propertyId: '7',
    title: 'Final Purchase Contract - Karlaplan 10',
    type: 'contract',
    fileUrl: '/documents/property_7/purchase_contract.pdf',
    fileSize: 4850,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-01-12'),
    relatedToId: '3', // Transaction ID
    relatedToType: 'transaction',
    description: 'Final signed purchase contract between Karl Nilsson and Astrid Lundqvist',
    tags: ['contract', 'signed', 'final'],
    isPublic: false
  },
  {
    id: '19',
    propertyId: '7',
    title: 'Loan Approval - Astrid Lundqvist',
    type: 'loan_approval',
    fileUrl: '/documents/property_7/loan_approval.pdf',
    fileSize: 2240,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-01-08'),
    relatedToId: '8', // Client ID
    relatedToType: 'client',
    description: 'Bank loan approval for Astrid Lundqvist',
    tags: ['loan', 'bank', 'approval'],
    isPublic: false
  },
  {
    id: '20',
    propertyId: '7',
    title: 'Closing Statement',
    type: 'agreement',
    fileUrl: '/documents/property_7/closing.pdf',
    fileSize: 1850,
    uploadedBy: '1', // Johan Andersson
    uploadedAt: new Date('2023-01-15'),
    relatedToId: '3', // Transaction ID
    relatedToType: 'transaction',
    description: 'Final closing statement with all costs detailed',
    tags: ['closing', 'financial', 'summary'],
    isPublic: false
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalClients: 128,
  totalProperties: 87,
  totalLeads: 243,
  propertiesSold: 42,
  revenueGenerated: 32750000, // 32.75M SEK
  activeListings: 35,
  pendingDeals: 10,
  newLeadsThisMonth: 28,
  commissionGoal: 250000, // 250,000 SEK monthly goal
  currentCommission: 187500, // 187,500 SEK current commission (75% of goal)
  commissionLastMonth: 235000, // 235,000 SEK last month's commission
  daysLeftInMonth: 8, // 8 days left in the current month
};

// Mock Market Stats for price development and average prices
export const mockMarketStats = {
  priceDevelopment: {
    'Sweden': {
      houses: 2.3,
      apartments: 1.8,
    },
    'Stockholm Urban Area': {
      houses: 3.1,
      apartments: 2.7,
    },
    'Stockholm County': {
      houses: 2.8,
      apartments: 2.5,
    }
  },
  averagePricePerSqm: {
    'Sweden': {
      houses: 32500,
      apartments: 48700,
    },
    'Stockholm Urban Area': {
      houses: 57800,
      apartments: 79200,
    },
    'Stockholm County': {
      houses: 51200,
      apartments: 68500,
    }
  },
  // Add time-series data for the last 30 days
  priceDevelopmentTimeSeries: {
    'Sweden': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 32000 + Math.random() * 2000 * Math.sin(i / 5) + i * 100
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 48000 + Math.random() * 1500 * Math.sin(i / 4) + i * 80
      }))
    },
    'Stockholm Urban Area': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 57000 + Math.random() * 3000 * Math.sin(i / 6) + i * 150
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 78500 + Math.random() * 2500 * Math.sin(i / 5) + i * 120
      }))
    },
    'Stockholm County': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 50500 + Math.random() * 2800 * Math.sin(i / 5.5) + i * 130
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 67800 + Math.random() * 2200 * Math.sin(i / 4.5) + i * 100
      }))
    }
  },
  percentageChangeTimeSeries: {
    'Sweden': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 2 + Math.random() * 0.8 * Math.sin(i / 10) + (i / 100)
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 1.6 + Math.random() * 0.6 * Math.sin(i / 8) + (i / 120)
      }))
    },
    'Stockholm Urban Area': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 2.9 + Math.random() * 1.2 * Math.sin(i / 9) + (i / 90)
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 2.5 + Math.random() * 1 * Math.sin(i / 7) + (i / 100)
      }))
    },
    'Stockholm County': {
      houses: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 2.6 + Math.random() * 1 * Math.sin(i / 8.5) + (i / 95)
      })),
      apartments: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2023, 5, i + 1), // June 2023
        value: 2.3 + Math.random() * 0.8 * Math.sin(i / 7.5) + (i / 110)
      }))
    }
  }
};

// Mock Meeting Rooms
export const mockMeetingRooms = [
  {
    id: '1',
    name: 'Hamnen',
    image: '/meetingRooms/room1.jpg',
    capacity: 6,
    isAvailable: true,
    office: 'Vasastaden',
    description: 'Small meeting room with modern AV equipment, ideal for client and team meetings.',
  },
  {
    id: '2',
    name: 'Utsiktstornet',
    image: '/meetingRooms/room2.jpg',
    capacity: 6,
    isAvailable: false,
    office: 'Vasastaden',
    description: 'Cozy meeting room perfect for client consultations and small group discussions.',
  },
  {
    id: '3',
    name: 'Sviten',
    image: '/meetingRooms/room3.jpg',
    capacity: 8,
    isAvailable: true,
    office: 'Vasastaden',
    description: 'Premium meeting space with elegant furnishings, designed for high-value client negotiations.',
  },
]; 