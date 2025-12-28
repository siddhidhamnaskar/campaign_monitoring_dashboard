import { CampaignInsights ,Campaign} from '../types/campaign';

const BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

export async function getCampaignInsights(): Promise<CampaignInsights> {
  const res = await fetch(`${BASE_URL}/campaigns/insights`, {
    cache: 'no-store', // always fresh
  });

  if (!res.ok) {
    throw new Error('Failed to fetch campaign insights');
  }

  const data = await res.json();
  return data.insights;
}

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${BASE_URL}/campaigns`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return (await res.json()).campaigns;
}
