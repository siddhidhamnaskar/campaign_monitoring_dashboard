'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-6">
      <h2 className="text-red-600 font-semibold">Error</h2>
      <p>{error.message}</p>
    </div>
  );
}
