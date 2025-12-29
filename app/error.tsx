'use client';

export default function Error({ error }: { error: Error }) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-red-600 font-semibold ">Error</h2>
      <p>{error.message}</p>
      <button
        onClick={handleRetry}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
}
