'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MetricCard from '../../components/MetricCard';
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
    return <p className="p-6">Loading campaign...</p>;
  }

  if (!campaign || !insights) {
    return <p className="p-6 text-red-600">Failed to load campaign</p>;
  }

  return (
    <main className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{campaign.name}</h1>
        <p className="text-sm text-gray-500">
          Status:{' '}
          <span className="capitalize">{campaign.status}</span>
        </p>
      </div>

      {/* Campaign Meta */}
      <section className="border rounded p-4 grid grid-cols-2 md:grid-cols-6 gap-4">
        <Meta label="Status" value={campaign.status} />
        <Meta label="Platforms" value={campaign.platforms.join(', ')} />
        <Meta
          label="Total Budget"
          value={`$${campaign.budget.toLocaleString()}`}
        />
        <Meta
          label="Daily Budget"
          value={`$${campaign.daily_budget.toLocaleString()}`}
        />
        <Meta
          label="Created At"
          value={new Date(campaign.created_at).toLocaleDateString()}
        />

        {/* <Link
          href={`/campaigns/${campaign.id}/insights/stream`}
          className="text-blue-600 underline flex items-end"
        >
          View Live Insights →
        </Link> */}
      </section>

      {/* Performance Insights */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Performance Insights
        </h2>

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
