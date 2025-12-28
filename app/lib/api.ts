import { CampaignInsights ,Campaign,CampaignIdInsights} from '../types/campaign';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleApiError(res: Response, operation: string): Promise<never> {
  let errorMessage = `Failed to ${operation}`;

  try {
    const errorData = await res.json();
    if (errorData.message) {
      errorMessage = errorData.message;
    } else if (errorData.error) {
      errorMessage = errorData.error;
    }
  } catch {
    // If we can't parse the error response, use default message
  }

  switch (res.status) {
    case 400:
      throw new Error(`Bad request: ${errorMessage}`);
    case 401:
      throw new Error(`Unauthorized: ${errorMessage}`);
    case 403:
      throw new Error(`Forbidden: ${errorMessage}`);
    case 404:
      throw new Error(`Not found: ${errorMessage}`);
    case 422:
      throw new Error(`Validation error: ${errorMessage}`);
    case 500:
      throw new Error(`Server error: ${errorMessage}`);
    case 503:
      throw new Error(`Service unavailable: ${errorMessage}`);
    default:
      throw new Error(`${res.status}: ${errorMessage}`);
  }
}

export async function getCampaignInsights(): Promise<CampaignInsights> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/insights`, {
      headers:{
        "Content-type":"application/json"
      },
      cache: 'no-store', // always fresh
    });

    if (!res.ok) {
      await handleApiError(res, 'fetch campaign insights');
    }

    const data = await res.json();
    return data.insights;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching campaign insights');
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns`, {
        headers:{
        "Content-type":"application/json"
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      await handleApiError(res, 'fetch campaigns');
    }

    const data = await res.json();
    return data.campaigns;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching campaigns');
  }
}

export async function getCampaignById(id: string): Promise<Campaign> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${id}`, {
        headers:{
        "Content-type":"application/json"
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      await handleApiError(res, 'fetch campaign');
    }

    const data = await res.json();
    return data.campaign;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching campaign');
  }
}

export async function getCampaignInsightsById(
  id: string
): Promise<CampaignIdInsights> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`, {
        headers:{
        "Content-type":"application/json"
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      await handleApiError(res, 'fetch campaign insights');
    }

    const data = await res.json();
    return data.insights;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching campaign insights');
  }
}
