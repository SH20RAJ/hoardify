# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve SEO by optimizing image delivery, adding breadcrumb structured data, unique metadata for landing pages, and dynamic OG images.

**Architecture:** 
- Leverage Next.js Metadata API for page-specific tags.
- Use `next/image` optimization by removing `unoptimized` and configuring `remotePatterns`.
- Inject JSON-LD `BreadcrumbList` for enhanced SERP results.
- Implement `opengraph-image.tsx` for dynamic social sharing cards.

**Tech Stack:** Next.js 16, TypeScript, Lucide React, Tailwind CSS.

---

### Task 1: Image Optimization Configuration

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add remote patterns for common image hosts**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "picsum.photos" },
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "*.googleusercontent.com" },
		],
	},
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "chore: expand image remote patterns for optimization"
```

---

### Task 2: Optimize HoardingCard Images

**Files:**
- Modify: `src/components/hoardings/HoardingCard.tsx`

- [ ] **Step 1: Remove unoptimized prop and add sizes**

```typescript
// Find <Image ... unoptimized /> and replace with optimized version
// Example for large variant:
<Image
    src={getImgSrc(currentIndex)}
    alt={title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    onError={() => handleImageError(currentIndex)}
/>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hoardings/HoardingCard.tsx
git commit -m "perf: enable image optimization for HoardingCard"
```

---

### Task 3: Optimize HeroImage Components

**Files:**
- Modify: `src/components/hoardings/HeroImage.tsx`

- [ ] **Step 1: Remove unoptimized from HeroImage**

```typescript
// Remove 'unoptimized' from all <Image /> components in HeroImage.tsx
// Ensure 'priority' is set for the main image (index 0).
```

- [ ] **Step 2: Commit**

```bash
git add src/components/hoardings/HeroImage.tsx
git commit -m "perf: optimize HeroImage delivery"
```

---

### Task 4: Unique Metadata for Landing Page

**Files:**
- Modify: `src/app/(website)/landing/page.tsx`

- [ ] **Step 1: Export metadata**

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Outdoor Advertising Intelligence | Hoardify",
	description: "Revolutionize your outdoor campaigns with data-driven billboard placements in Ranchi. 100% verified inventory and transparent pricing.",
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(website)/landing/page.tsx
git commit -m "seo: add unique metadata to landing page"
```

---

### Task 5: Add Breadcrumb Structured Data

**Files:**
- Modify: `src/app/(website)/hoardings/[id]/page.tsx`

- [ ] **Step 1: Add BreadcrumbList JSON-LD**

```typescript
// Inside HoardingDetailPage, add to the JSON-LD script array:
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Explore",
            "item": "https://hoardify.in"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Hoardings",
            "item": "https://hoardify.in/search"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": hoarding.title,
            "item": `https://hoardify.in/hoardings/${hoarding.id}`
        }
    ]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(website)/hoardings/[id]/page.tsx
git commit -m "seo: add breadcrumb structured data for better SERP visibility"
```

---

### Task 6: Dynamic OpenGraph Images

**Files:**
- Create: `src/app/(website)/hoardings/[id]/opengraph-image.tsx`

- [ ] **Step 1: Implement dynamic OG image generator**

```typescript
import { ImageResponse } from 'next/og';
import { getHoardingById } from '@/actions/hoardings';

export const alt = 'Hoardify Billboard';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const hoarding = await getHoardingById(params.id);
  
  return new ImageResponse(
    (
      <div style={{
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 60, fontWeight: 'bold', color: '#ff385c', marginBottom: 20 }}>Hoardify</div>
          <div style={{ fontSize: 40, color: '#222', textAlign: 'center', padding: '0 80px' }}>{hoarding?.title}</div>
          <div style={{ fontSize: 24, color: '#666', marginTop: 20 }}>{hoarding?.location}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(website)/hoardings/[id]/opengraph-image.tsx
git commit -m "seo: add dynamic OpenGraph image generator for hoardings"
```
