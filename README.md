# 📊 Mixo Ads Dashboard

A modern, responsive **campaign monitoring dashboard** built with **Next.js**.  
This application provides both **static and real-time insights** into advertising campaign performance, including impressions, clicks, conversions, spend, and efficiency metrics across multiple platforms.

The project is designed with **production-ready patterns**, focusing on clarity, correctness, and API-aware frontend behavior.

---

## ✨ Features

- **Campaign Overview Dashboard**
  - Aggregated performance metrics across all campaigns
  - Campaign status breakdown (Active, Paused, Completed)

- **Campaign Management**
  - View detailed information for individual campaigns
  - Budget, platform, and lifecycle visibility

- **Real-time Insights (Live Streaming)**
  - Live campaign performance using **Server-Sent Events (SSE)**
  - Connection status handling and graceful error recovery

- **Multi-platform Support**
  - Monitor campaigns across platforms like Facebook, Google Ads, etc.

- **Responsive UI**
  - Fully responsive layout built with Tailwind CSS
  - Optimized for readability and quick scanning

- **Type Safety**
  - End-to-end TypeScript for safer and predictable development

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom reusable React components
- **API Integration:** REST APIs + Server-Sent Events
- **Linting:** ESLint

---

## 📋 Prerequisites

- Node.js 18.x or later  
- npm / yarn / pnpm / bun

---

## ⚙️ Installation

```bash
git clone <repository-url>
cd dashboard
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/api
```

---

## ▶️ Usage

```bash
npm run dev
```

Open: http://localhost:3000

---

## 🔌 API Endpoints

- `GET /campaigns`
- `GET /campaigns/{id}`
- `GET /campaigns/{id}/insights`
- `GET /campaigns/{id}/insights/stream`

---

## 🔒 License

Private & proprietary.
