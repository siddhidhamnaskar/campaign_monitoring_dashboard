'use client';

import { CampaignInsights } from '../types/campaign';
import MetricCard from './MetricCard';

export default function DashboardOverview({
  insights,
}: {
  insights: CampaignInsights;
}) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Total Campaigns" value={insights.total_campaigns} />
      <MetricCard title="Active Campaigns" value={insights.active_campaigns} />
      <MetricCard title="Paused Campaigns" value={insights.paused_campaigns} />
      <MetricCard title="Completed Campaigns" value={insights.completed_campaigns} />

      <MetricCard title="Total Impressions" value={insights.total_impressions} />
      <MetricCard title="Total Clicks" value={insights.total_clicks} />
      <MetricCard title="Total Spend" value={`$${insights.total_spend}`} />
      <MetricCard title="Avg CTR" value={`${insights.avg_ctr}%`} />
    </section>
  );
}
