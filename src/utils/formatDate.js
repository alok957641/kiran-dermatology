import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(date, fmt = 'dd MMM yyyy') {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, fmt)
  } catch { return '—' }
}

export function formatDateTime(date) { return formatDate(date, 'dd MMM yyyy, hh:mm a') }
export function formatTime(date) { return formatDate(date, 'hh:mm a') }

export function formatRelative(date) {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  } catch { return '—' }
}

export function toInputDate(date = new Date()) {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'yyyy-MM-dd')
}

export default { formatDate, formatDateTime, formatTime, formatRelative, toInputDate }