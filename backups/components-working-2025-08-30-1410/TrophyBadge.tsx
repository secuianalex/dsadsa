export default function TrophyBadge({
    title,
    description,
  }: {
    title: string
    description: string
  }) {
    return (
      <div className="rounded-xl border bg-white shadow-card p-4 hover:shadow-md transition">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white text-base font-semibold">
            🏆
          </span>
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-gray-600">{description}</div>
          </div>
        </div>
      </div>
    )
  }
  