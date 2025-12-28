'use client';

import Link from 'next/link';
import { Campaign } from '../types/campaign';

export default function CampaignTable({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Campaigns
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Platforms</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Daily Budget</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-2">
                <Link
                  href={`/campaigns/${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {c.name}
                </Link>
              </td>

              <td className="p-2 capitalize">{c.status}</td>

              <td className="p-2">
                {c.platforms.join(', ')}
              </td>

              <td className="p-2">
                ${c.budget.toLocaleString()}
              </td>

              <td className="p-2">
                ${c.daily_budget.toLocaleString()}
              </td>

              <td className="p-2">
                {new Date(c.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
