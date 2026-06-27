export default function ActivityItem({
  icon: Icon,
  title,
  subtitle,
  time,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl p-4 transition hover:bg-slate-50">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-blue-100 p-3">

          <Icon className="h-5 w-5 text-blue-600" />

        </div>

        <div>

          <p className="font-medium">
            {title}
          </p>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>

        </div>

      </div>

      <span className="text-xs text-slate-400">

        {time}

      </span>

    </div>
  );
}