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

  useEffect(() => {
    if (!id) return;
     async function fetchData() {
           try {
             const [campaignRes] = await Promise.all([
               getCampaignById(id),
               
             ]);
     
             setCampaign(campaignRes);
            
           } finally {
            //  setLoading(false);
           }
         }
     
         fetchData();

    console.log(id);
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}/insights/stream`
    );

    eventSource.onopen = () => {
      setConnected(true);
      console.log('🟢 Stream connected');
    };

    eventSource.onmessage = (event) => {
      const parsed: StreamInsight = JSON.parse(event.data);
      setData(parsed);
    };

    eventSource.onerror = () => {
      console.error('🔴 Stream error');
      eventSource.close();
      setConnected(false);
    };

    return () => eventSource.close();
  }, [id]);

  if (!data || !campaign) {
    return <p className="p-6">Waiting for live insights...</p>;
  }

  return (
    <main className="p-6 space-y-6">
         <h1 className="text-2xl font-semibold">{campaign.name}</h1>
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
    </main>
  );
}
