'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Campaign } from '../types/campaign';
import StatusBadge from './StatusBadge';
import PlatformPills from './PlatformPills';

export default function CampaignTable({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesName = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const campaignDate = new Date(c.created_at);
    const matchesDate =
      (!startDate || campaignDate >= new Date(startDate)) &&
      (!endDate || campaignDate <= new Date(endDate));
    const matchesBudget =
      (!minBudget || c.budget >= parseFloat(minBudget)) &&
      (!maxBudget || c.budget <= parseFloat(maxBudget));
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesName && matchesDate && matchesBudget && matchesStatus;
  });

  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-0 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="overflow-y-auto max-h-64 border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left sticky top-0">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Platforms</th>
              <th className="p-2">Budget</th>
              <th className="p-2">Daily Budget</th>
              <th className="p-2">Created</th>
              <th>View Details</th>
              <th>Live Insights</th>
            </tr>
          </thead>

          <tbody>
            {filteredCampaigns.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {c.name}
                  </Link>
                </td>
                <td className="p-2">
                  <StatusBadge status={c.status} />
                </td>
                <td className="p-2">
                  <PlatformPills platforms={c.platforms} />
                </td>
                <td className="p-2">${c.budget.toLocaleString()}</td>
                <td className="p-2">${c.daily_budget.toLocaleString()}</td>
                <td className="p-2">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="text-blue-600 underline flex items-end"
                  >
                    View
                  </Link>
                </td>
            <td>
              <Link
                href={`/campaigns/${c.id}/insights/stream`}
                className="text-blue-600 underline flex items-end"
              >
                View Live Insights →
              </Link>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
