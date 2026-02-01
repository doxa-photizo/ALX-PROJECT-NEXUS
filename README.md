--🛒 Project Nexus – E-Commerce Frontend (Next.js)
--📌 Project Overview
This project is a frontend-focused e-commerce web application built with Next.js, designed for Project Nexus. The application emphasizes functionality, scalability, role-based access, and real-world architecture, with the intention of integrating seamlessly with a backend API developed by a collaborator.

The app supports two user roles:

Customer (User)

Admin (Store Manager)

Both roles exist within the same frontend application but experience different interfaces, routes, and permissions.

🎯 Project Goals
Build a production-ready frontend, not a demo.

Focus on functionality-first UI.

Demonstrate clean architecture and best practices.

Support real backend integration.

Achieve an Exceptional (80%+) Project Nexus evaluation.

🧠 Core Architectural Decisions
1️⃣ Single Frontend, Multiple Experiences
There is one Next.js app, but:

Public users interact with the store.

Admins interact with a protected admin panel.

This is achieved using role-based routing, separate layouts, and route protection. No duplicate apps. No shortcuts.

2️⃣ Role-Based Access Model
User roles are determined after authentication.

User → Store experience

Admin → Admin dashboard experience

The frontend does not decide roles — it reads them from the backend API response.

🔐 Authentication & Authorization Flow
User / Admin Login Flow
User visits /login or /admin/login.

Credentials are submitted.

Backend responds with:

user data

role (user or admin)

token/session info

Frontend stores auth state.

User is redirected based on role:

User → /products

Admin → /admin/dashboard

Route Protection (Frontend Guard)
Admin routes are protected before rendering:

If not logged in → redirect to /admin/login.

If logged in but not admin → access denied.

This prevents unauthorized access via direct URL entry.

🗂️ File & Folder Structure (No src/ Folder)
Plaintext
/pages
  index.tsx                  → Home

  /login.tsx                 → User login
  /register.tsx              → User registration

  /products
    index.tsx                → Product listing
    [id].tsx                 → Product details

  /cart.tsx
  /checkout.tsx

  /admin
    login.tsx
    dashboard.tsx
    products.tsx
    orders.tsx
    users.tsx

/components
  /layout
    UserLayout.tsx
    AdminLayout.tsx

  /common
    Button.tsx
    Input.tsx
    Modal.tsx
    Table.tsx
    Badge.tsx
    Loader.tsx
    ProductCard.tsx
    AuthForm.tsx
    Pagination.tsx

  /admin
    AdminSidebar.tsx
    AdminHeader.tsx
    MetricsCard.tsx

/context
  AuthContext.tsx

/lib
  api.ts            → Axios instance + API handlers
  auth.ts           → auth helpers
  routeGuard.ts     → route protection logic

/types
  user.ts
  product.ts
  order.ts


🧩 Component Strategy
layout/
Reusable page-level layouts:

UserLayout: navbar, footer, cart.

AdminLayout: sidebar, admin header.

common/
Reusable logic-heavy components (Forms, Inputs with validation, Buttons, Tables, Modals, Cards). Most business logic lives here.

admin/
Admin-specific UI components (Sidebar, Dashboard cards, Data tables).

🛍️ Core Frontend Features
Customer Features
Product listing & search

Product details

Cart management

Checkout flow

Order confirmation

Authentication (login/register)

Admin Features
Admin login

Dashboard metrics

Product management (CRUD)

Order management

User management

Note: Admin UI is not visible in the store UI and is accessed only via /admin.

🎨 UI/UX Principles
Clean, professional, production-ready UI.

Functionality-first design.

Fully responsive & Accessible (WCAG-friendly).

Keyboard navigation supported.

Clear error and loading states.

⚡ Performance Considerations
Component-level reuse.

Lazy loading where applicable.

Optimized images.

Minimal unnecessary re-renders.

API-driven data fetching.

🤝 Backend Collaboration
This frontend is designed to integrate with a backend that provides:

Authentication endpoints.

Role-based user data.

Product and Order APIs.

The frontend assumes real API responses, making collaboration seamless.

✅ Summary
This project demonstrates role-based architecture, clean frontend structure, and real-world product thinking, ensuring strong collaboration readiness and alignment with Project Nexus requirements.
