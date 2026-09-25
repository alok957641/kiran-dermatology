import { cn } from '../../utils/cn'
import { Loader2 } from 'lucide-react'

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyState = null,
  onRowClick,
  className = '',
}) {
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-borderLight bg-slate-50/50">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-3.5 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.headerClassName
                  )}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-sm text-textMuted mt-2">Loading...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  {emptyState || (
                    <div className="py-16 text-center">
                      <p className="text-textMuted">No data available</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b border-borderLight last:border-0 transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-primary-50/40'
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        'px-4 py-4 text-sm text-textPrimary',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.className
                      )}
                    >
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}