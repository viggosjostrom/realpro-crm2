import { Client, Property, Lead, Activity, User, DashboardStats } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Johan',
    lastName: 'Andersson',
    email: 'johan.andersson@realpro.se',
    role: 'admin',
    avatar: '/avatars/johan.jpg',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Lindberg',
    email: 'emma.lindberg@realpro.se',
    role: 'agent',
    avatar: '/avatars/emma.jpg',
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
    price: 7200000,
    size: 110,
    rooms: 4,
    description: 'Spacious 4-room apartment near KTH with newly renovated kitchen and bathroom. This elegant apartment is located in a well-maintained building from the 1930s and offers a perfect blend of classic charm and modern comfort. The apartment features a large living room with a beautiful bay window, a separate dining area, and three bedrooms. The kitchen has been completely renovated with high-quality appliances and custom cabinetry. The bathroom features marble tiles, a walk-in shower, and a separate bathtub. The location is ideal, with easy access to universities, parks, and public transportation.',
    status: 'pending',
    type: 'apartment',
    images: ['/properties/dashboard-property-2.jpg'],
    ownerId: '5',
    agentId: '1',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05'),
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
    price: 24900000,
    size: 210,
    rooms: 6,
    description: 'Prestigious apartment on Strandvägen with high ceilings, stucco, and a fireplace. This extraordinary apartment is located in one of Stockholm\'s most iconic buildings and offers a rare opportunity to own a piece of history. The apartment features grand proportions with ceiling heights of over 3.5 meters, original parquet floors, and intricate stucco work. The living spaces include a formal reception room, a library, a dining room that can accommodate 12 guests, and a modern kitchen that respects the historical context. The apartment has four bedrooms, including a master suite with a dressing room and a marble bathroom. Additional features include three fireplaces, custom built-ins, and a separate staff quarters.',
    status: 'sold',
    type: 'apartment',
    images: ['/properties/dashboard-property-5.jpg'],
    ownerId: '4',
    buyerId: '6',
    agentId: '2',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-01-10'),
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
    ownerId: '1',
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
    price: 8750000,
    size: 105,
    rooms: 4,
    description: 'Elegant pre-war apartment with original details and a modern renovation. Located in the prestigious Östermalm district, this apartment offers a perfect combination of historical charm and contemporary comfort. Features include high ceilings, herringbone parquet floors, decorative moldings, and three large windows facing a quiet courtyard. The kitchen has been completely updated with high-end appliances and custom cabinetry. The property includes three spacious bedrooms, a formal dining room, and a renovated bathroom with heated marble floors.',
    status: 'sold',
    type: 'apartment',
    images: ['/properties/dashboard-property-3.jpg'],
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
    notes: 'Interested in properties in Vasastan',
    assignedTo: '2',
    createdAt: new Date('2023-03-28'),
    updatedAt: new Date('2023-03-28'),
  },
  {
    id: '2',
    firstName: 'Sofia',
    lastName: 'Bergström',
    email: 'sofia.bergstrom@hotmail.com',
    phone: '073-333-4444',
    source: 'referral',
    status: 'contacted',
    notes: 'Looking for a summer house in the archipelago',
    assignedTo: '1',
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-26'),
    lastContactedAt: new Date('2023-03-26'),
  },
  {
    id: '3',
    firstName: 'Mikael',
    lastName: 'Öberg',
    email: 'mikael.oberg@gmail.com',
    phone: '076-777-8888',
    source: 'social',
    status: 'qualified',
    notes: 'Interested in investment properties',
    assignedTo: '2',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-22'),
    lastContactedAt: new Date('2023-03-22'),
  },
  {
    id: '4',
    firstName: 'Anna',
    lastName: 'Holm',
    email: 'anna.holm@outlook.com',
    phone: '070-555-6666',
    source: 'event',
    status: 'proposal',
    notes: 'Looking for a 2-bedroom apartment in Kungsholmen',
    assignedTo: '1',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-18'),
    lastContactedAt: new Date('2023-03-18'),
  },
  {
    id: '5',
    firstName: 'Peter',
    lastName: 'Lundqvist',
    email: 'peter.lundqvist@gmail.com',
    phone: '073-999-0000',
    source: 'website',
    status: 'negotiation',
    notes: 'Interested in property ID 3',
    assignedTo: '2',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-17'),
    lastContactedAt: new Date('2023-03-17'),
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Initial call with Maria Eriksson',
    description: 'Discussed selling her apartment and her requirements for a new home',
    date: new Date('2023-02-15'),
    completed: true,
    clientId: '2',
    createdAt: new Date('2023-02-14'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Property valuation at Kungsgatan 12',
    description: 'Meeting with Maria to evaluate her apartment',
    date: new Date('2023-02-18'),
    completed: true,
    clientId: '2',
    propertyId: '1',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-18'),
  },
  {
    id: '3',
    type: 'email',
    title: 'Send property listings to Anders',
    description: 'Email Anders with 5 potential apartments in Södermalm',
    date: new Date('2023-02-20'),
    completed: true,
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
    propertyId: '2',
    clientId: '1',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-08'),
  },
  {
    id: '11',
    type: 'viewing',
    title: 'Private viewing at Valhallavägen 128',
    description: 'Special viewing arranged for a VIP client',
    date: new Date('2023-03-10'),
    completed: true,
    propertyId: '2',
    clientId: '3',
    createdAt: new Date('2023-03-07'),
    updatedAt: new Date('2023-03-10'),
  },
  {
    id: '12',
    type: 'viewing',
    title: 'Viewing at Norr Mälarstrand 84',
    description: 'Exclusive viewing of the luxury apartment',
    date: new Date('2023-03-25'),
    completed: true,
    propertyId: '3',
    clientId: '4',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-25'),
  },
  {
    id: '13',
    type: 'viewing',
    title: 'Second viewing at Norr Mälarstrand 84',
    description: 'Follow-up viewing with serious buyers',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: false,
    propertyId: '3',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '14',
    type: 'viewing',
    title: 'Open house at Djursholmsvägen 22',
    description: 'Open house event for the villa property',
    date: new Date('2023-04-02'),
    completed: true,
    propertyId: '4',
    clientId: '3',
    createdAt: new Date('2023-03-28'),
    updatedAt: new Date('2023-04-02'),
  },
  {
    id: '15',
    type: 'viewing',
    title: 'Private tour of Djursholmsvägen 22',
    description: 'Exclusive tour of the property and grounds',
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    completed: false,
    propertyId: '4',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '16',
    type: 'viewing',
    title: 'Final viewing before sale at Strandvägen 7',
    description: 'Last viewing before the property was sold',
    date: new Date('2023-02-20'),
    completed: true,
    propertyId: '5',
    clientId: '4',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-20'),
  },
  {
    id: '17',
    type: 'viewing',
    title: 'Initial viewing at Götgatan 118',
    description: 'First showing of the modern apartment',
    date: new Date('2023-04-15'),
    completed: true,
    propertyId: '6',
    clientId: '1',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-15'),
  },
  {
    id: '18',
    type: 'viewing',
    title: 'Upcoming viewing at Götgatan 118',
    description: 'Scheduled viewing for next week',
    date: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    completed: false,
    propertyId: '6',
    clientId: '4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Additional follow-up activities for properties
  {
    id: '19',
    type: 'call',
    title: 'Follow-up call about Hornsgatan 45',
    description: 'Call to Lena Karlsson to discuss her interest after the viewing',
    date: new Date('2023-03-14'),
    completed: true,
    propertyId: '1',
    clientId: '4',
    createdAt: new Date('2023-03-13'),
    updatedAt: new Date('2023-03-14'),
  },
  {
    id: '20',
    type: 'email',
    title: 'Additional information for Norr Mälarstrand 84',
    description: 'Sending floor plans and association details to Anders',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    propertyId: '3',
    clientId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '21',
    type: 'meeting',
    title: 'Meeting about Djursholmsvägen 22',
    description: 'Discussion about financing options for the villa',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    completed: false,
    propertyId: '4',
    clientId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '22',
    type: 'call',
    title: 'Interest check for Götgatan 118',
    description: 'Call to Lena to gauge her interest level after the viewing',
    date: new Date('2023-04-17'),
    completed: true,
    propertyId: '6',
    clientId: '4',
    createdAt: new Date('2023-04-16'),
    updatedAt: new Date('2023-04-17'),
  },
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