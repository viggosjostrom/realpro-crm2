# RealPro CRM

A modern, user-friendly CRM system designed specifically for real estate agents in the Swedish market. This project is a showcase demo built with Next.js, TypeScript, Material UI, and other modern web technologies.

## Features

- **Dashboard**: Get a quick overview of your business with key metrics and recent activities
- **Client Management**: Track buyers and sellers with detailed profiles and communication history
- **Property Management**: Manage property listings with comprehensive details and status tracking
- **Lead Management**: Capture and nurture leads through your sales pipeline
- **Activity Tracking**: Log calls, emails, meetings, and other interactions with clients

## Tech Stack

- **Frontend**:
  - Next.js 15.x
  - React 19.x
  - TypeScript
  - Material UI
  - Tailwind CSS
  - React Query

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/realpro-crm.git
   cd realpro-crm
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── auth/             # Authentication pages
│   │   └── login/        # Login page
│   ├── dashboard/        # Dashboard and feature pages
│   │   ├── properties/   # Property management pages
│   │   ├── clients/      # Client management pages
│   │   ├── leads/        # Lead management pages
│   │   └── activities/   # Activity tracking pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardLayout.tsx
│   ├── property/         # Property-related components
│   │   ├── Overview.tsx
│   │   ├── PropertyDetails.tsx
│   │   ├── SellersAndBuyers.tsx
│   │   ├── Marketing.tsx
│   │   ├── ViewingsAndFollowups.tsx
│   │   ├── OffersAndTransactions.tsx
│   │   └── DocumentsAndContracts.tsx
│   ├── ClientOnly.tsx
│   ├── HydrationErrorBoundary.tsx
│   ├── ThemeRegistry.tsx
│   └── WelcomePopup.tsx
├── styles/               # CSS and styling files
└── lib/                  # Utilities and helpers
    ├── types/            # TypeScript type definitions
    └── utils/            # Utility functions
```

## Future Enhancements

- Backend integration with C#/.NET
- Authentication with JWT
- Real-time notifications
- Calendar integration
- Document management
- Mobile app

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project is a showcase demo for educational purposes
- All data is mock data and does not represent real clients or properties
