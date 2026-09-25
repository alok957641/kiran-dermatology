# 🏥 Kiran Dermatology

> A modern, fast, and elegant website for **Kiran Skin Clinic** — Patna's trusted skin, hair & laser clinic led by **Dr. (Major) Asmita Singh**.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

### 🌐 Public Website
- **Home** — Hero, About preview, Services, Stats, Why Choose Us, Gallery, Testimonials, Blog, CTA
- **About** — Doctor bio, qualifications, achievements, philosophy
- **Services** — List with filter/search + detail pages with FAQs
- **Gallery** — Interactive before/after drag slider
- **Blog** — List + detail with rich text content
- **Contact** — Form, map embed, social links
- **Appointment** — Online booking form with date/time slots
- **WhatsApp float button** on every page
- **Scroll progress indicator** + back-to-top

### 🔐 Admin Panel
- **Login** — Supabase Auth (email + password)
- **Dashboard** — Real-time stats + recent activity
- **Appointments** — Manage patient appointments (status change, delete)
- **Contacts** — Manage contact messages (auto-read, reply, delete)
- **Services CRUD** — Add/edit/delete with image upload
- **Testimonials CRUD** — Approve/feature reviews
- **Blogs CRUD** — Rich text editor with image uploads
- **Gallery CRUD** — Before/after image management

### 🎨 Design
- **Modern** green theme (`#75BE84` / `#5FB475`)
- **Award-winning** scroll animations (Framer Motion + GSAP)
- **Fully responsive** (mobile-first)
- **Interactive** — hover effects, micro-interactions, page transitions
- **SEO optimized** — meta tags, schema.org, sitemap

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite 8 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router v6 |
| **Animation** | Framer Motion + GSAP |
| **Forms** | React Hook Form + Zod |
| **Backend** | Supabase (Postgres + Auth + Storage) |
| **SEO** | React Helmet Async |
| **Icons** | Lucide React |
| **Toasts** | React Hot Toast |
| **Rich Editor** | React Quill New |

---

## 📁 Project Structure

```
kiran-dermatology/
├── public/
│   ├── images/           # Static images
│   ├── logo.png          # Brand logo
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── admin/        # Admin-specific components
│   │   ├── animations/   # Framer Motion wrappers
│   │   ├── cards/         # Reusable cards
│   │   ├── layout/         # Public & Admin layouts
│   │   ├── sections/       # Page sections
│   │   ├── shared/         # Global components
│   │   └── ui/              # Base UI components
│   │
│   ├── context/           # Auth, UI contexts
│   ├── data/              # Static fallback data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Supabase client, schemas
│   ├── pages/
│   │   ├── admin/         # Admin pages
│   │   └── public/        # Public pages
│   ├── routes/            # Route configs
│   ├── services/          # Supabase service layer
│   ├── styles/            # Global styles
│   ├── utils/             # Helpers, constants
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                   # Environment variables (NOT committed)
├── .env.example           # Template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Supabase** account (free tier works)
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/alok957641/kiran-dermatology.git
cd kiran-dermatology
```

### 2️⃣ Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3️⃣ Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WHATSAPP_NUMBER=918595749644
VITE_SITE_URL=https://kirandermatology.com
```

### 4️⃣ Setup Supabase

Run the SQL in Supabase SQL Editor:

```sql
-- Appointments
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contacts
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  icon TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  overview TEXT,
  conditions TEXT[] DEFAULT '{}',
  procedures TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]',
  duration TEXT,
  sessions TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  rating INT DEFAULT 5,
  message TEXT NOT NULL,
  service TEXT,
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blogs
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  author TEXT DEFAULT 'Dr. (Major) Asmita Singh',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  read_time TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  before_image TEXT,
  after_image TEXT,
  description TEXT,
  sessions TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Setup Storage Buckets

Create 4 public buckets in Supabase Storage:
- `services` — service images
- `blog-images` — blog covers
- `gallery` — before/after images
- `doctor` — doctor photos

#### Create Admin User

In Supabase Auth → Users → Add User with your admin email/password.

### 5️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linter |

---

## 🔐 Admin Access

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin` | Dashboard |
| `/admin/appointments` | Manage appointments |
| `/admin/contacts` | Manage contacts |
| `/admin/services` | Services CRUD |
| `/admin/testimonials` | Testimonials CRUD |
| `/admin/blogs` | Blogs CRUD |
| `/admin/gallery` | Gallery CRUD |

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#75BE84` | Buttons, badges, backgrounds |
| Text Green | `#5FB475` | Text accents, hover states |
| Dark Green | `#2A5235` | Headings, dark text |
| Light Green | `#DEF0E3` | Card backgrounds, borders |
| Footer Gray | `#444444` | Footer background |
| Background | `#F5FBF6` | Page background |

---

## 📱 Browser Support

✅ Chrome (latest 2 versions)
✅ Firefox (latest 2 versions)
✅ Safari (latest 2 versions)
✅ Edge (latest 2 versions)
✅ Mobile Safari (iOS 14+)
✅ Chrome Android

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import GitHub repo
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_SITE_URL`
5. Deploy 🎉

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍⚕️ About

**Kiran Dermatology** — Skin, Hair & Laser Clinic
📍 Jalalpur Complex, Bailey Road, Patna
📞 +91 85957 49644
✉️ asmita.hi@gmail.com

Led by **Dr. (Major) Asmita Singh** (MBBS, MD Dermatology, Gold Medalist)

---

## 📞 Contact

- **Email:** asmita.hi@gmail.com
- **Phone:** +91 85957 49644
- **Website:** kirandermatology.com

---

<div align="center">

Made with 💚 for Kiran Dermatology

⭐ Star this repo if you found it helpful!

</div>
