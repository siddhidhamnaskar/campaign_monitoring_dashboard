import { CampaignInsights ,Campaign,CampaignIdInsights} from '../types/campaign';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getCampaignById(id: string): Promise<Campaign> {
  const res = await fetch(`${BASE_URL}/campaigns/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch campaign');
  return (await res.json()).campaign;
}

export async function getCampaignInsightsById(
  id: string
): Promise<CampaignIdInsights> {
  const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch campaign insights');
  return (await res.json()).insights;
}
