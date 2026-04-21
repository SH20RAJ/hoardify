# AGENTS.md

This document outlines the core functional modules (agents) of the Hoardify system, their responsibilities, and how they interact to provide a seamless outdoor advertising experience.

## 1. Identity Agent (Authentication & Authorization)
- **Responsibility:** Manages user authentication, session persistence, and role-based access control (RBAC).
- **Core Technologies:** Stack Auth, Next.js Middleware.
- **Roles:**
    - `Customer`: Browses, saves, and inquires about hoardings.
    - `Owner`: Manages their own hoarding inventory and bookings.
    - `Admin`: System-wide oversight, user management, and global analytics.
- **Key Files:** `src/stack/`, `src/app/(admin)/layout.tsx` (PasscodeGate).

## 2. Inventory Agent (Asset Management)
- **Responsibility:** Handles the lifecycle of hoarding listings, including creation, updates, and categorization.
- **Data Model:** `hoardings` table.
- **Key Features:** Location tagging, image management, pricing, and availability status.
- **Key Files:** `src/db/schema.ts`, `src/actions/hoardings.ts`, `src/app/(website)/hoardings/`.

## 3. Engagement Agent (Lead Generation)
- **Responsibility:** Facilitates communication between customers and owners through enquiries.
- **Data Model:** `enquiries` table.
- **Workflows:** Inquiry submission, status tracking (pending, responded, closed).
- **Key Files:** `src/actions/hoardings.ts` (submitEnquiry), `src/app/(admin)/admin/enquiries/`.

## 4. Transaction Agent (Booking & Scheduling)
- **Responsibility:** Manages the booking process, scheduling, and occupancy tracking for hoarding spaces.
- **Data Model:** `bookings` table.
- **Integrations:** Calendar views, date range selection.
- **Key Files:** `src/db/schema.ts`, `src/components/ui/SelectDates.tsx`, `src/components/hoardings/BookingCard.tsx`.

## 5. Intelligence Agent (Analytics & Reporting)
- **Responsibility:** Aggregates system-wide data to provide actionable insights for administrators.
- **Metrics:** Total revenue, active users, inventory occupancy, recent activity pulses.
- **Key Files:** `src/actions/admin.ts` (getAdminMetrics, getRecentActivity), `src/components/admin/StatsGrid.tsx`.

## 6. Discovery Agent (Search & Map Interface)
- **Responsibility:** Provides an intuitive interface for users to find hoardings based on location and filters.
- **Technologies:** Google Maps API, AI-driven context bars.
- **Key Files:** `src/components/maps/GoogleMapWrapper.tsx`, `src/components/hoardings/search/`.
