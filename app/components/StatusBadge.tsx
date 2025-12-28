interface StatusBadgeProps {
  status: 'active' | 'paused' | 'completed';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeClasses = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeClasses()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
