'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MetricCard from '../../components/MetricCard';
import PlatformPills from '../../components/PlatformPills';
import StatusBadge from '@/app/components/StatusBadge';
import {
  getCampaignById,
  getCampaignInsightsById,
} from '../../lib/api';

export default function CampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [campaign, setCampaign] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}


  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const [campaignRes, insightsRes] = await Promise.all([
          getCampaignById(id),
          getCampaignInsightsById(id),
        ]);

        setCampaign(campaignRes);
        setInsights(insightsRes);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading campaign...</p>;
  }

  if (!campaign || !insights) {
    return <p className="p-6 text-red-600">Failed to load campaign</p>;
  }

  return (
   <main className="p-6 space-y-8 bg-gray-50 min-h-screen">
  {/* Back */}
  <Link
    href="/"
    className="text-blue-600 hover:underline inline-flex items-center"
  >
    ← Back to Campaigns
  </Link>

  {/* Campaign Header */}
  <section className="bg-white rounded-xl shadow p-6 space-y-4">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{campaign.name}</h1>
        <div className="mt-2">
          <StatusBadge status={campaign.status} />
        </div>
      </div>

      <div className="flex gap-3">
        <PlatformPills platforms={campaign.platforms} />
      </div>
    </div>

    {/* Meta Info */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
      <MetaCard label="Total Budget" value={`$${campaign.budget.toLocaleString()}`} />
      <MetaCard label="Daily Budget" value={`$${campaign.daily_budget.toLocaleString()}`} />
      <MetaCard
        label="Created"
        value={new Date(campaign.created_at).toLocaleDateString()}
      />
      <MetaCard label="Campaign ID" value={campaign.id} />
    </div>
  </section>

       <section className="bg-white rounded-xl shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Performance Insights</h2>

      <Link
        href={`/campaigns/${campaign.id}/insights/stream`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Live Insights →
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Impressions" value={insights.impressions} />
      <MetricCard title="Clicks" value={insights.clicks} />
      <MetricCard title="Conversions" value={insights.conversions} />
      <MetricCard title="Spend" value={`$${insights.spend}`} />
      <MetricCard title="CTR" value={`${insights.ctr}%`} />
      <MetricCard title="CPC" value={`$${insights.cpc}`} />
      <MetricCard
        title="Conversion Rate"
        value={`${insights.conversion_rate}%`}
      />
    </div>
  </section>
</main>

  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p>{value}</p>
    </div>
  );
}
