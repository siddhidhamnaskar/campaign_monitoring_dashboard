import {
  getCampaignById,
  getCampaignInsightsById,
} from '../../lib/api';
import MetricCard from '../../components/MetricCard';

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('Campaign ID:', id);

  const [campaign,insights] = await Promise.all([
    getCampaignById(id),
    getCampaignInsightsById(id),
  ]);

  return (
    <main className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{campaign.name}</h1>
        <p className="text-sm text-gray-500">
          Status: <span className="capitalize">{campaign.status}</span>
        </p>
      </div>

      {/* Campaign Meta */}
      <section className="border rounded p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p>{campaign.status}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Platforms</p>
          <p>{campaign.platforms.join(', ')}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Budget</p>
          <p>${campaign.budget.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Daily Budget</p>
          <p>${campaign.daily_budget.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p>{new Date(campaign.created_at).toLocaleDateString()}</p>
        </div>
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
