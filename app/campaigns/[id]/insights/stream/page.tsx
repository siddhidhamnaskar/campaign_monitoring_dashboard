'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MetricCard from '../../../../components/MetricCard';
import { StreamInsight } from '@/app/types/campaign';
import { getCampaignById } from '@/app/lib/api';


export default function StreamInsightsPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<StreamInsight | null>(null);
  const [campaign, setCampaign] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [error,setError]=useState<any>(null);

 useEffect(() => {
  if (!id) return;


  

  let eventSource: EventSource | null = null;
  let retryTimeout: NodeJS.Timeout;

  const connectStream = () => {
    eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}/insights/stream`
    );

    eventSource.onopen = () => {
      setConnected(true);
      setError(null);
      console.log('🟢 Stream connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const parsed: StreamInsight = JSON.parse(event.data);
        console.log(parsed);
        setData(parsed);
      } catch (e) {
        console.error('Failed to parse stream data', e);
      }
    };

    eventSource.onerror = () => {
      console.warn('🔴 Stream disconnected');
      setConnected(false);
      setError('Live insights temporarily unavailable. Reconnecting…');

      eventSource?.close();

      // Retry after 10 seconds (safe for rate limits)
      retryTimeout = setTimeout(connectStream, 10000);
    };
  };

  connectStream();

  return () => {
    eventSource?.close();
    clearTimeout(retryTimeout);
  };
}, [id]);

useEffect(()=>{
   async function fetchData() {
        try {
          const [campaignRes] = await Promise.all([
            getCampaignById(id),

          ]);

          setCampaign(campaignRes);

        } catch (err) {
          console.error('Failed to fetch campaign data:', err);
          setError(err instanceof Error ? err.message : 'Failed to load campaign data');
        } finally {
          // setLoading(false);
        }
      }

      fetchData();
},[id])


  if (error) {
    return <p className="p-6 text-center text-red-600">Error: {error}</p>;
  }

  if (!data || !campaign) {
    return <p className="p-6 text-center">Waiting for live insights...</p>;
  }

  return (
    <main className="p-6 space-y-6">
         <h1 className="text-2xl font-semibold">{campaign.name}</h1>
      <section className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center">

          <h1 className="text-xl font-semibold">
            Live Campaign Insights
          </h1>


          <span
            className={`text-sm ${
              connected ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {connected ? 'Live' : 'Disconnected'}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Last update:{' '}
          {new Date(data.timestamp).toLocaleTimeString()}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Impressions" value={data.impressions} />
          <MetricCard title="Clicks" value={data.clicks} />
          <MetricCard title="Conversions" value={data.conversions} />
          <MetricCard title="Spend" value={`$${data.spend}`} />
          <MetricCard title="CTR" value={`${data.ctr}%`} />
          <MetricCard title="CPC" value={`$${data.cpc}`} />
          <MetricCard
            title="Conversion Rate"
            value={`${data.conversion_rate}%`}
          />
        </div>
      </section>
    </main>
  );
}
