# 🚀 Hoardify — Outdoor Advertising Marketplace

> Book hoardings (billboards) like you book hotels.

Hoardify is a platform that **digitizes outdoor advertising (OOH)** by allowing businesses to discover, compare, and book hoardings with transparency, analytics, and ease.

---

- https://hoardify.shraj.workers.dev/


## 🌍 Problem

Outdoor advertising today is:

- fragmented and offline  
- non-transparent pricing  
- dependent on middlemen  
- hard to track performance  

---

## 💡 Solution

Hoardify provides:

- 📍 centralized hoarding inventory  
- 🗺️ map-based discovery  
- 💰 transparent pricing  
- ⚡ quick booking / enquiry system  
- 📊 campaign analytics  

---

## 🧱 MVP Features

### 🔍 Discovery
- Browse hoardings by city
- Filter by price, type, location
- Map view with pins (Google Maps)

### 🗺️ Map View
- Visualize hoardings on map
- Click marker → see details
- Sync with listing

### 📄 Hoarding Details
- Images, size, price
- Location & map preview
- Availability status

### 📩 Booking / Enquiry
- Simple form (no payment in MVP)
- Lead stored in database
- Admin notified

### 🧑‍💼 Admin Panel
- Add/edit/delete hoardings
- Upload images
- Manage availability

---

## 📊 Analytics (Phase-wise)

### MVP
- Estimated impressions (based on traffic score)
- Campaign duration tracking

### Advanced
- QR code tracking (scan analytics)
- Call tracking (via virtual numbers)
- Landing page visits

---

## ⚙️ Tech Stack

- **Frontend & Backend:** Next.js (App Router)
- **Database:** PostgreSQL (Supabase / Neon)
- **Auth:** Supabase Auth / Clerk
- **Maps:** Google Maps API
- **Storage:** Supabase Storage / Cloudflare R2
- **Hosting:** Vercel
- **Analytics:** PostHog / Custom tracking

---

## 🗃️ Database Schema (Simplified)

### Hoardings

```json
{
  "id": "string",
  "title": "string",
  "lat": "number",
  "lng": "number",
  "address": "string",
  "price": "number",
  "size": "string",
  "type": "string",
  "images": ["url"],
  "availability": "boolean",
  "traffic_score": "low | medium | high",
  "estimated_impressions": "number"
}
````

---

### Leads

```json
{
  "id": "string",
  "hoarding_id": "string",
  "name": "string",
  "phone": "string",
  "message": "string",
  "duration": "string",
  "status": "new | contacted | booked"
}
```

---

### Campaigns (Future)

```json
{
  "id": "string",
  "client_id": "string",
  "hoarding_id": "string",
  "start_date": "date",
  "end_date": "date",
  "qr_code_url": "string",
  "tracking_link": "string"
}
```

---

## 🗺️ Map Integration

Uses Google Maps:

* Markers for each hoarding
* InfoWindow for preview
* Optional traffic layer
* Lat/Lng stored in DB

---

## 📈 Traffic & Impression Logic

Since real traffic data is not directly available:

* road type + location → base score
* live traffic (optional via API) → multiplier

```text
estimated_impressions = base × traffic_index
```

---

## 🚀 Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/your-repo/hoardify.git
cd hoardify
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
DATABASE_URL=your_db_url
```

---

### 4. Run Dev Server

```bash
npm run dev
```

---

### 5. Open

```text
http://localhost:3000
```

---

## 📦 Folder Structure

```bash
/app
  /api
  /hoardings
  /admin
/components
  MapView.tsx
  HoardingCard.tsx
/lib
  db.ts
  utils.ts
```

---

## 🎯 MVP Goals

* 50+ hoardings listed
* 10+ enquiries generated
* 2–3 real bookings

---

## ⚠️ Key Assumptions

* impressions are estimated, not exact
* manual onboarding of hoardings initially
* offline execution handled separately

---

## 🔮 Future Roadmap

* payments (Razorpay)
* owner dashboard
* performance analytics
* AI-based hoarding recommendations
* DOOH (digital hoardings)

---

## 🤝 Contributing

Open to contributors for:

* frontend UI improvements
* analytics system
* scaling backend

---

## 📧 Contact

[hoardify.in@gmail.com](mailto:hoardify.in@gmail.com)

---

## ⭐ Vision

> Build the **Google Ads of the offline world**.

