"use client";

import { getCampaignInsights } from './lib/api';
import DashboardOverview from './components/DashboardOverview';
import CampaignTable from './components/CompaignTable';
import { getCampaigns } from './lib/api';
import { useState,useEffect } from 'react';

export default function Home() {
 const [campaigns, setCampaigns] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
   const [loading, setLoading] = useState(true);

 useEffect(() => {
    

    async function fetchData() {
      try {
        const [campaigns, insights] = await Promise.all([
          getCampaigns(),
          getCampaignInsights(),
        ]);

        setCampaigns(campaigns);
        setInsights(insights);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

   if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Campaign Monitoring Dashboard
      </h1>

      <DashboardOverview insights={insights} />
      <CampaignTable campaigns={campaigns} />
    </main>
  );
}
