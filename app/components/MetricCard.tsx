export default function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}
