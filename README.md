# Interactive 3D Portfolio & Content Management System

A highly interactive, glassmorphic portfolio powered by **Next.js 15**, **React Three Fiber (WebGL)**, and **Framer Motion**. This is a complete, full-stack application featuring a custom headless CMS for managing profiles, projects, and a fully-featured **Markdown Blog System**.

Any edits you make in the Admin Dashboard instantly hydrate across all connected browsers using Next.js advanced Server Component reloading—no manual refresh required.

---

## 🔥 Key Features

### 🌌 3D & Interactive UI
- **Immersive Space Scene:** A GPU-accelerated massive points-cloud background driven by React Three Fiber.
- **Magnetic UI Elements:** Smooth, cursor-following interactions for buttons and cards.
- **Glassmorphic Design:** A modern, high-tech aesthetic with neon accents (Cyan, Purple, Emerald).

### 📝 Comprehensive Blog System
- **Markdown Native:** Write blogs using full Markdown/GFM support (tables, lists, code blocks).
- **Featured Images:** Support for rectangular featured images that highlight your work on the home page and within articles.
- **Dynamic Routing:** Blogs are served via high-performance dynamic routes at `/b/[slug]`.
- **Public Journal:** A curated "Journal" section on the homepage displaying your latest insights in a bento-grid layout.

### 🔐 Root Admin Dashboard
- **Headless CMS:** Manage your entire profile—Hero section, Experiences, Skills, Projects, and Achievements—from a secure `/hot-admin` terminal.
- **Unified Navigation:** Re-architected admin layout featuring a persistent sidebar and navbar for seamless context switching.
- **Real-Time Updates:** Backend data managed via Prisma & MongoDB with instant server-side revalidation.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Variables
Provided is a `.env.example` file. Duplicate it and rename to `.env`:
```bash
cp .env.example .env
```

Configure your credentials:
- `DATABASE_URL`: Your MongoDB cluster connection string.
- `ADMIN_PASSWORD`: A secure password to access the `/hot-admin` control center.
- `NODE_ENV`: Set to `development` or `production`.

### 3. Initialize the Database
Sync the Prisma schema to your MongoDB instance:
```bash
npx prisma generate
npx prisma db push
```

### 4. Boot the System
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see your site, and `http://localhost:3000/hot-admin` to take control.

---

## 🛠 Tech Stack

- **Core:** Next.js 15 (App Router), React 19
- **Database Layer:** MongoDB & Prisma (ORM)
- **Content Rendering:** `react-markdown`, `remark-gfm`, `rehype-raw`
- **Styling:** Vanilla CSS3 (Custom Design System)
- **3D & Animation:** Three.js, React Three Fiber, Framer Motion

## 🛡 Security & Deployment
- **Secure Sessions:** Admin authentication is managed via encrypted `httpOnly` cookies.
- **Deployment:** Optimized for Vercel. Ensure `DATABASE_URL` and `ADMIN_PASSWORD` are set in your project environment variables.
- **Production Safety:** All admin routes are protected and verify session validity before allowing data mutations.

---

Designed & Built with 🤖 by **Tanmay Hirodkar**
