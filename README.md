# Interactive 3D Portfolio & Real-time Content Dashboard

A highly interactive, glassmorphic portfolio powered by **Next.js 15**, **React Three Fiber (WebGL)**, and **Framer Motion**. But it's not just a static site—it features a custom, completely headless CMS (built with **MongoDB** and **Prisma**) allowing you to manage your own content in real-time.

Any edits you make in the Admin Dashboard instantly hydrate across all connected browsers using Next.js advanced Server Component reloading without requiring a hard refresh!

## Features
- 🌌 **3D Space Scene:** A beautiful, GPU-accelerated massive points-cloud scene driven by React Three Fiber.
- ⚡ **Real-Time Data Streaming:** A Next.js API polling infrastructure dynamically triggers internal server re-renders when backend data changes.
- 🔐 **Hot-Admin Panel:** Access the comprehensive dashboard under `/hot-admin` to seamlessly manage Hero info, Experience, Education, Capabilities, and Project nodes.
- 📊 **Magnetic UI Elements:** Cursor-following interactive DOM boundaries.
- 💎 **No Third-Party CMS:** Everything functions natively via MongoDB and Server Actions, keeping bundle sizes optimized and API requests internalized.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install requirements:
```bash
npm install
```

### 2. Environment Variables
To keep your secrets safe, **never** commit `.env` to a public repository! 
We've provided a `.env.example` file. Duplicate it and rename it to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your credentials:
- `DATABASE_URL`: Your MongoDB cluster connection string.
- `ADMIN_PASSWORD`: A secure password of your choice to access the `/hot-admin` section.

### 3. Initialize the Database
Generate the Prisma Client and sync the schema to your MongoDB instance:
```bash
npx prisma generate
npx prisma db push
```

### 4. Boot the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see your portfolio, and `http://localhost:3000/hot-admin` to manage your data!

> *Note: If this is an entirely fresh database, you can seed it by hitting the `/api/seed` route with a POST request containing your ADMIN_PASSWORD to instantly populate the site with standard demo content.*

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 App Router
- **Database:** MongoDB
- **ORM:** Prisma
- **Styling:** Vanilla CSS & HTML5
- **Animations:** Framer Motion
- **3D Render:** Three.js / React Three Fiber

## 🛡 Security & Publishing Notes
Before deploying to Vercel, Netlify, or any other hosting provider, remember to:
1. Under your Project Settings in Vercel, add your `DATABASE_URL` and `ADMIN_PASSWORD` strictly as Environment Variables.
2. Ensure you never commit your local `.env` file to GitHub (it should automatically be ignored via `.gitignore`).
