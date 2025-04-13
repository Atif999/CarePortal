# 🧓🏥 CarePortal MVP

A minimal patient-care matching platform that helps route patients to the closest available care facility based on care type and ZIP code proximity.

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **MongoDB** (via Mongoose)
- **TailwindCSS**
- **Framer Motion** (for animations)
- **React Hook Form** (form management & validation)
- **Vercel** (deployment)

---

## ✨ Features

- Multi-step patient intake form
- Facility matching logic:
  - Matches based on `care type` and `zip code proximity`
  - Handles full-capacity fallbacks
  - Special case handling for "Day Care"
- Real-time validation with helpful error messages
- Smooth transitions and user-friendly UI

---

## 🧪 Sample Facilities (Pre-seeded)

| Facility | Type                    | Serves ZIP Range | ZIP Code | Capacity  |
| -------- | ----------------------- | ---------------- | -------- | --------- |
| A        | Stationary              | 10000–14999      | 12000    | Full      |
| B        | Stationary              | 15000–19999      | 17000    | Available |
| C        | Ambulatory              | 20000–24999      | 22000    | Full      |
| D        | Ambulatory              | 25000–29999      | 27000    | Available |
| E        | Stationary & Ambulatory | 10000–24999      | 18000    | Available |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Atif999/CarePortal.git
cd careportal-mvp
```

### 2. Install dependencies

```bash
npm install`
```

### 3. Setup environment

Create a .env.local file:
<br />
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/careportal
<br />
Replace with your MongoDB connection string.

### 4. Run the dev server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 5. Deployed Project Link

This project is also deployed on Vercel and if you want to check it out without<br/>
running it locally then visit this link below: <br/>
`https://care-portal-two.vercel.app/`
