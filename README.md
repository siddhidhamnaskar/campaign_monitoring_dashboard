# Mixo Ads Dashboard

A modern, responsive dashboard for monitoring and managing advertising campaigns built with Next.js. This application provides real-time insights into campaign performance, including metrics like impressions, clicks, conversions, and spend across multiple platforms.

## Features

- **Campaign Overview**: Comprehensive dashboard showing key metrics and campaign status
- **Campaign Management**: View and manage individual campaigns with detailed insights
- **Real-time Insights**: Stream real-time campaign performance data
- **Platform Support**: Multi-platform campaign monitoring (Facebook, Google Ads, etc.)
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **TypeScript**: Full type safety for better development experience

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React components with custom styling
- **API Integration**: RESTful API for campaign data
- **Linting**: ESLint for code quality

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js 18.x or later
- npm, yarn, pnpm, or bun package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your API configuration:
```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
```

## Usage

1. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Project Structure

```
dashboard/
├── app/
│   ├── campaigns/
│   │   ├── [id]/
│   │   │   ├── insights/
│   │   │   │   └── stream/
│   │   │   │       └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   ├── components/
│   │   ├── CampaignTable.tsx
│   │   ├── DashboardOverview.tsx
│   │   ├── MetricCard.tsx
│   │   ├── PlatformPills.tsx
│   │   └── StatusBadge.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── types/
│   │   └── campaign.ts
│   ├── error.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   └── (static assets)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## API Integration

The dashboard integrates with a REST API to fetch campaign data. The following endpoints are used:

- `GET /campaigns` - Fetch all campaigns
- `GET /campaigns/{id}` - Fetch specific campaign details
- `GET /campaigns/insights` - Fetch overall campaign insights
- `GET /campaigns/{id}/insights` - Fetch insights for specific campaign

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Base URL for the campaign API

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support or questions, please contact the development team.
