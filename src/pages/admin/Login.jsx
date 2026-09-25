import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Lock, Mail, LogIn, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { loginSchema } from '../../lib/schemas'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, loading } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  useEffect(() => {
    // Agar already logged in → redirect
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, loading, navigate, from])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await login(data.email, data.password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Invalid credentials')
    } finally {
      setSubmitting(false)
    }
  }

  // Already authenticated → don't show login
  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-primary-50/60 via-background to-accent-50/40">
      {/* LEFT — Branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <span className="font-heading text-white text-2xl font-bold">K</span>
            </div>
            <div className="leading-tight">
              <p className="font-heading font-bold text-white text-xl">Kiran</p>
              <p className="text-[10px] text-white/60 font-medium tracking-[0.2em] uppercase">
                Dermatology
              </p>
            </div>
          </Link>

          {/* Center Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading font-bold text-white text-display-sm xl:text-display-md leading-tight mb-5"
            >
              Admin <span className="text-gradient">Portal</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/60 text-lg max-w-md leading-relaxed"
            >
              Manage appointments, contacts, services, testimonials, blogs, and
              gallery — all from one place.
            </motion.p>
          </div>

          {/* Bottom */}
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Kiran Dermatology. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative">
        {/* Back to website */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-textMuted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-heading text-white text-2xl font-bold">K</span>
            </div>
            <div className="leading-tight">
              <p className="font-heading font-bold text-secondary text-xl">Kiran</p>
              <p className="text-[10px] text-textMuted font-medium tracking-widest uppercase">
                Dermatology
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="font-heading font-bold text-display-sm text-secondary mb-2">
              Welcome back
            </h2>
            <p className="text-textSecondary">
              Sign in to access your admin dashboard.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-borderLight shadow-large">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@kirandermatology.com"
                leftIcon={Mail}
                required
                error={errors.email?.message}
                autoComplete="email"
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={Lock}
                required
                error={errors.password?.message}
                autoComplete="current-password"
                {...register('password')}
              />

              <Button
                type="submit"
                size="lg"
                fullWidth
                loading={submitting}
                rightIcon={!submitting ? LogIn : undefined}
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-textMuted mt-6">
            Protected area · Authorized access only
          </p>
        </motion.div>
      </div>
    </div>
  )
}