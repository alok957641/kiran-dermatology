const variants = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  replied: 'bg-green-50 text-green-700 border-green-200',
}

export default function StatusBadge({ status }) {
  const style =
    variants[status] || 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${style}`}
    >
      {status}
    </span>
  )
}