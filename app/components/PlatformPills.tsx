interface PlatformPillsProps {
  platforms: string[];
}

export default function PlatformPills({ platforms }: PlatformPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <span
          key={platform}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </span>
      ))}
    </div>
  );
}
