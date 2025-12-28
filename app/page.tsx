import { getCampaignInsights } from './lib/api';
import DashboardOverview from './components/DashboardOverview';
import CampaignTable from './components/CompaignTable';
import { getCampaigns } from './lib/api';

export default async function Home() {
  const insights = await getCampaignInsights();
  const campaigns =  await getCampaigns();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Campaign Insights
      </h1>

      <DashboardOverview insights={insights} />
      <CampaignTable campaigns={campaigns} />
    </main>
  );
}
