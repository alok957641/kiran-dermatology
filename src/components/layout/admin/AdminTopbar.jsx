import { useLocation } from 'react-router-dom'
import { Menu, Home, ChevronRight } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const routeTitles = {
  '/admin': 'Dashboard',
  '/admin/appointments': 'Appointments',
  '/admin/contacts': 'Contacts',
  '/admin/services': 'Services',
  '/admin/testimonials': 'Testimonials',
  '/admin/blogs': 'Blogs',
  '/admin/gallery': 'Gallery',
}

export default function AdminTopbar({ onOpenSidebar }) {
  const location = useLocation()
  const { user } = useAuth()

  const currentTitle =
    routeTitles[location.pathname] ||
    (location.pathname.includes('/services/') && 'Edit Service') ||
    (location.pathname.includes('/blogs/') && 'Edit Blog') ||
    (location.pathname.includes('/testimonials/') && 'Edit Testimonial') ||
    (location.pathname.includes('/gallery/') && 'Edit Gallery') ||
    'Admin'

  const initial = user?.email?.charAt(0).toUpperCase() || 'A'

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left — Hamburger + Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-slate-400" />
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="font-medium text-slate-700">{currentTitle}</span>
          </div>

          {/* Mobile title */}
          <span className="sm:hidden font-heading font-semibold text-slate-800">
            {currentTitle}
          </span>
        </div>

        {/* Right — User info */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-medium text-slate-700 truncate max-w-[180px]">
              {user?.email || 'Admin'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-soft">
            {initial}
          </div>
        </div>
      </div>
    </header>
  )
}