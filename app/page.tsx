import { getCampaignInsights } from './lib/api';
import DashboardOverview from './components/DashboardOverview';

export default async function Home() {
  const insights = await getCampaignInsights();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Campaign Insights
      </h1>

      <DashboardOverview insights={insights} />
    </main>
  );
}
