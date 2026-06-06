# Hoardify Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul Hoardify with agency management, revamped homepage, and functional booking/messaging systems.

**Architecture:** Next.js with Drizzle ORM (PostgreSQL), Stack Auth, and Server Actions. Moving complex interactions to dedicated pages and improving component reactivity with `revalidatePath`.

**Tech Stack:** Next.js (React 19), Drizzle ORM, Tailwind CSS, Lucide Icons.

---

### Task 1: Schema Updates

**Files:**
- Modify: `src/db/schema.ts`

- [ ] **Step 1: Add `agencies` table and update `hoardings`**

```typescript
// Add to src/db/schema.ts
export const agencies = pgTable("agencies", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	logoUrl: text("logo_url"),
	email: text("email"),
	phone: text("phone"),
	address: text("address"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Update hoardings table in src/db/schema.ts
// Add: agencyId: integer("agency_id").references(() => agencies.id),
```

- [ ] **Step 2: Add relations**

```typescript
export const agenciesRelations = relations(agencies, ({ many }) => ({
	hoardings: many(hoardings),
}));

// Update hoardingsRelations to include agency
```

- [ ] **Step 3: Run schema push**

Run: `npx drizzle-kit push` (or equivalent command)
Expected: Schema updated in database.

- [ ] **Step 4: Commit**

```bash
git add src/db/schema.ts
git commit -m "db: add agencies table and link to hoardings"
```

---

### Task 2: Agency Management Actions

**Files:**
- Create: `src/actions/agencies.ts`

- [ ] **Step 1: Implement CRUD actions for agencies**

```typescript
"use server";
import { db } from "@/db";
import { agencies } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAgencies() {
	return await db.select().from(agencies).orderBy(desc(agencies.createdAt));
}

export async function createAgency(data: any) {
	const res = await db.insert(agencies).values(data).returning();
	revalidatePath("/admin/agencies");
	return res[0];
}

export async function updateAgency(id: number, data: any) {
	await db.update(agencies).set(data).where(eq(agencies.id, id));
	revalidatePath("/admin/agencies");
}
```

- [ ] **Step 2: Commit**

```bash
git add src/actions/agencies.ts
git commit -m "feat: add agency server actions"
```

---

### Task 3: Admin Agencies Interface

**Files:**
- Create: `src/app/(admin)/admin/agencies/page.tsx`
- Create: `src/components/admin/AgencyActions.tsx`

- [ ] **Step 1: Create Agency Listing Page**

Display a table of agencies with "View Hoardings" and "Edit" buttons.

- [ ] **Step 2: Implement Agency Creation Component**

A button/modal to add new agencies.

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/agencies/page.tsx src/components/admin/AgencyActions.tsx
git commit -m "feat: add admin agencies page"
```

---

### Task 4: Dedicated Placement Page

**Files:**
- Create: `src/app/(admin)/admin/hoardings/new/page.tsx`
- Modify: `src/components/admin/HoardingActions.tsx`

- [ ] **Step 1: Create New Placement Page**

Migrate the form from `CreateHoardingButton` modal to a full page. Add Agency selection dropdown.

- [ ] **Step 2: Update `CreateHoardingButton`**

Change the button to a `Link` component pointing to `/admin/hoardings/new`.

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/hoardings/new/page.tsx src/components/admin/HoardingActions.tsx
git commit -m "feat: move placement creation to dedicated page"
```

---

### Task 5: Homepage Redesign (Airbnb Style)

**Files:**
- Modify: `src/app/(website)/page.tsx`
- Create: `src/components/home/AirbnbSearchBar.tsx`

- [ ] **Step 1: Create `AirbnbSearchBar`**

A centered, pill-shaped search bar with Location, Date Range, and Category inputs.

- [ ] **Step 2: Update Explore Page**

Remove `HoardingHero` and `Browse by channel`. Place the search bar at the top.

- [ ] **Step 3: Commit**

```bash
git add src/app/(website)/page.tsx src/components/home/AirbnbSearchBar.tsx
git commit -m "ui: revamped homepage with airbnb-style search"
```

---

### Task 6: BookingCard Date Selection

**Files:**
- Modify: `src/components/hoardings/BookingCard.tsx`

- [ ] **Step 1: Implement Date Range Selection**

Replace static date displays with interactive inputs (or a custom date picker).

- [ ] **Step 2: Update `handleBooking`**

Ensure `startDate` and `endDate` are passed to the `createBooking` action.

- [ ] **Step 3: Commit**

```bash
git add src/components/hoardings/BookingCard.tsx
git commit -m "fix: functional date selection in booking card"
```

---

### Task 7: Messaging & Inbox Fixes

**Files:**
- Modify: `src/actions/messages.ts`
- Modify: `src/components/inbox/InboxClient.tsx`

- [ ] **Step 1: Improve Conversation Fetching**

Ensure `getConversationsByEmail` fetches all relevant enquiries and their latest messages reliably.

- [ ] **Step 2: Admin Messaging Status Sync**

Ensure admin replies consistently update enquiry status to "Contacted".

- [ ] **Step 3: Commit**

```bash
git add src/actions/messages.ts src/components/inbox/InboxClient.tsx
git commit -m "fix: ensure dynamic messaging and status updates"
```

---

### Task 8: Final Deployment

- [ ] **Step 1: Git Push**

Run: `git push origin main` (or current branch)

- [ ] **Step 2: Deploy**

Run: `bun run deploy`
Expected: Application live on Cloudflare.
