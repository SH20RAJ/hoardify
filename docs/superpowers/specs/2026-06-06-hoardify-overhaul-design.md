# Hoardify Overhaul Design Spec

**Date:** 2026-06-06
**Status:** Approved by User

## 1. Overview
This project involves a significant overhaul of the Hoardify platform to improve agency management, streamline the admin panel, revamp the homepage with an Airbnb-inspired search experience, and fix functional bugs in messaging and booking selection.

## 2. Goals
- **Agency Management:** Introduce a 1-to-many relationship between Agencies and Hoardings.
- **Admin Panel Refactor:** Transition 'Add New Placement' to a dedicated page and add an Agencies tab.
- **Homepage Redesign:** Remove legacy hero/channels and add a minimalist, functional search bar.
- **Booking Fix:** Implement functional date range selection on hoarding pages.
- **Messaging:** Ensure fully dynamic communication between users and admins.

## 3. Schema Changes (Drizzle)
### `agencies` table
- `id`: serial primary key
- `name`: text not null
- `logoUrl`: text
- `email`: text
- `phone`: text
- `address`: text
- `createdAt`: timestamp default now

### `hoardings` table update
- Add `agencyId`: integer references `agencies.id`

## 4. Proposed Changes

### 4.1. Admin Panel
- **`/admin/agencies`**: New page listing all agencies. Includes a button to add new agencies.
- **`/admin/agencies/[id]`**: Detail page for an agency, showing its hoardings and allowing edits.
- **`/admin/hoardings/new`**: Dedicated page for adding placements, moving logic away from modals.
- **`/admin/enquiries`**: Ensure this page and its detail view `/admin/enquiries/[id]` are fully dynamic with real-time-ish (revalidatePath) messaging.

### 4.2. Homepage (Explore)
- Remove `HoardingHero` and "Browse by channel" sections.
- Create `AirbnbSearchBar` component:
  - **Location:** Search by city/area.
  - **Dates:** Start and End date selection.
  - **Category:** Dropdown/Switcher for placement types.
- Layout: High-impact search bar at the top, followed directly by trending inventory.

### 4.3. Hoarding Detail Page
- **`BookingCard`**: Replace static date text with a functional range selector.
- Ensure selected dates are captured and sent via `createBooking` action.

### 4.4. Messaging System
- Fix `https://hoardify.in/inbox` to correctly fetch all user conversations.
- Ensure admin replies update enquiry status and are visible to users instantly.

## 5. Technical Approach
- **UI:** Stick to existing Tailwind/CSS patterns. Use native date inputs or a custom simple range picker if needed for aesthetics.
- **State Management:** Leverage Next.js Server Actions and `revalidatePath` for data updates.
- **Architecture:** Keep components small and focused. Move complex forms to dedicated pages to reduce client-side overhead.

## 6. Verification Plan
- **Schema:** Run drizzle-kit push and verify table structure.
- **Admin:** Test adding an agency, then adding a hoarding linked to that agency.
- **Search:** Verify search bar filters hoarding list correctly.
- **Booking:** Verify dates selected in the UI are persisted in the `bookings` table.
- **Inbox:** Verify bi-directional messaging between User and Admin.
