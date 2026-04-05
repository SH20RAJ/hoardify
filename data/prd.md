# 📄 Product Requirements Document (PRD)
## Hoardify — Outdoor Advertising Marketplace

---

## 1. 🧭 Product Overview

**Product Name:** Hoardify  
**Type:** Marketplace + SaaS (OOH Advertising Platform)  
**Platform:** Web (MVP), Mobile (Future)

**Vision:**
> Build the **Google Ads for the offline world** by making hoarding (billboard) advertising searchable, bookable, and measurable.

**Primary Goal (MVP):**
Enable businesses to **discover → evaluate → enquire/book hoardings** in a single city (Ranchi).

---

## 2. 🎯 Objectives

### Business Objectives
- Digitize fragmented OOH advertising market
- Acquire hoarding inventory (supply)
- Generate advertiser leads (demand)
- Achieve first 10–20 bookings

### Product Objectives
- Provide **map-based hoarding discovery**
- Simplify booking/enquiry process
- Build trust via transparency + visuals
- Introduce basic analytics

---

## 3. 👥 Target Users

### 1. Advertisers (Primary)
- Local businesses (shops, coaching, hospitals)
- Real estate developers
- Event organizers
- Political campaigns

**Needs:**
- Easy discovery of hoardings
- Pricing clarity
- Location visibility
- ROI estimation

---

### 2. Hoarding Owners (Secondary)
- Individual owners
- Agencies

**Needs:**
- More bookings
- Visibility of inventory
- Simple listing management

---

### 3. Internal Admin (Founders/Team)
**Needs:**
- Manage listings
- Track leads
- Monitor activity

---

## 4. 🧩 Core Features (MVP Scope)

---

### 4.1 Hoarding Inventory System

**Description:**
Central database of all hoardings.

**Functional Requirements:**
- Add/edit/delete hoardings
- Store:
  - title
  - location (lat/lng)
  - price
  - size
  - type
  - images
  - availability

---

### 4.2 Listing & Discovery

**Description:**
Browse hoardings.

**Features:**
- Grid view
- Filters:
  - price range
  - location (city)
  - type

---

### 4.3 Map View (Critical Feature)

**Description:**
Visualize hoardings on map.

**Features:**
- Markers for each hoarding
- Click marker → preview
- Sync with listing
- Centered on city

---

### 4.4 Hoarding Detail Page

**Features:**
- Image gallery
- Map preview
- Price & size
- Availability
- CTA: “Book / Enquire”

---

### 4.5 Booking / Enquiry System

**MVP Approach:**
Lead-based (no payments)

**Flow:**
1. User clicks “Enquire”
2. Fills form:
   - name
   - phone
   - message
   - duration
3. Lead stored in DB
4. Admin notified

---

### 4.6 Admin Panel

**Features:**
- Add/edit hoardings
- Upload images
- Manage availability
- View leads

---

## 5. 📊 Analytics (MVP + Future)

---

### MVP Analytics

- Estimated impressions (manual logic)
- Campaign duration tracking

---

### Future Analytics

- QR code tracking
- Call tracking
- Landing page visits
- Performance scoring

---

## 6. 📐 User Flows

---

### Advertiser Flow

1. Visit homepage  
2. Browse hoardings / open map  
3. Select hoarding  
4. View details  
5. Click “Enquire”  
6. Submit form  

---

### Admin Flow

1. Login  
2. Add hoarding  
3. Upload images  
4. Monitor leads  
5. Contact clients  

---

## 7. 🗃️ Data Model (Simplified)

---

### Hoardings

- id  
- title  
- lat  
- lng  
- address  
- price  
- size  
- type  
- images  
- availability  
- traffic_score  
- estimated_impressions  

---

### Leads

- id  
- hoarding_id  
- name  
- phone  
- message  
- duration  
- status  

---

### Campaigns (Future)

- id  
- hoarding_id  
- start_date  
- end_date  
- qr_code  
- tracking_link  

---

## 8. ⚙️ Non-Functional Requirements

- Fast load time (<2s)
- Mobile responsive
- Scalable DB design
- Secure API endpoints
- SEO-friendly pages

---

## 9. 🚀 Success Metrics

### MVP Success Criteria

- 50+ hoardings listed  
- 10+ enquiries generated  
- 2–3 confirmed bookings  

---

### Product Metrics

- conversion rate (view → enquiry)
- enquiry volume per hoarding
- most viewed locations

---

## 10. ⚠️ Assumptions & Constraints

- Traffic/impressions are estimates
- Inventory initially added manually
- Offline execution handled outside product
- Single city focus for MVP

---

## 11. 🧪 Risks

- Low supply onboarding
- Low demand initially
- inaccurate pricing
- operational dependency on offline execution

---

## 12. 🗺️ Roadmap

---

### Phase 1 (MVP — 3 Weeks)

- Inventory system  
- Listing + filters  
- Map view  
- Enquiry system  
- Admin panel  

---

### Phase 2 (Validation)

- Owner dashboard  
- Lead management  
- analytics basics  

---

### Phase 3 (Monetization)

- payments (Razorpay)  
- subscriptions  
- premium listings  

---

### Phase 4 (Advanced)

- AI recommendations  
- traffic intelligence  
- DOOH integration  

---

## 13. 🔥 Differentiation

- Map-first discovery  
- transparent pricing  
- analytics for offline ads  
- end-to-end workflow  

---

## 14. 📌 Open Questions

- How accurate should traffic estimation be?
- What pricing control does platform have?
- Will owners manage listings themselves?
- How to ensure supply quality?

---

## 15. ⭐ Summary

Hoardify is building:

> A **tech-enabled marketplace + analytics layer** for outdoor advertising.

MVP focuses on:

- inventory visibility  
- easy discovery  
- lead generation  

Future evolves into:

- performance-driven ad platform  

---