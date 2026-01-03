# 🌍 GlobeTrotter

> **Plan, Share, and Experience Your Perfect Journey**

GlobeTrotter is a modern travel planning platform that helps you organize trips, discover activities, manage budgets, and share your adventures with fellow travelers. Built with Next.js 16 and powered by a beautiful, intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19.1-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)

---

## ✨ Features

### 🗺️ **Trip Planning**

- **Create Multi-Destination Trips** - Plan journeys with multiple stops
- **Itinerary Builder** - Organize activities by day with calendar view
- **Smart Stop Management** - Add cities and countries with arrival/departure dates
- **Trip Timeline** - Visual timeline of your entire journey

### 💰 **Budget Management**

- **Budget Tracking** - Set and monitor budgets for each trip
- **Expense Categories** - Track spending across accommodation, food, transport, and activities
- **Visual Analytics** - Interactive charts showing budget breakdown and spending trends
- **Currency Support** - Multi-currency budget planning

### 🎯 **Activity Discovery**

- **Curated Activities** - Browse pre-loaded activities across popular destinations
- **Category Filters** - Filter by landmarks, outdoor, cultural, adventure, nightlife, and more
- **Activity Details** - View descriptions, prices, durations, and best times to visit
- **Add to Trip** - Easily add discovered activities to your itinerary

### 👥 **Collaboration & Sharing**

- **Public Trip Sharing** - Share your trip itineraries with others
- **Shareable Links** - Generate unique URLs for each trip
- **Trip Discovery** - Explore trips created by other travelers
- **Social Features** - Inspire and get inspired by the community

### 🔐 **User Management**

- **Secure Authentication** - NextAuth.js powered authentication
- **User Profiles** - Personalized profile with avatar and preferences
- **Trip History** - Access all your past and upcoming trips
- **Privacy Controls** - Choose to keep trips private or public

### 📊 **Dashboard & Analytics**

- **Trip Overview** - Quick summary of all your trips
- **Recent Activity** - Track your planning progress
- **Statistics** - View travel stats and insights
- **Quick Actions** - Fast access to common tasks

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Optional: OAuth providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Initialize the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database (optional)**

   ```bash
   npx prisma db seed
   ```

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **Database**: [Prisma](https://www.prisma.io/) + SQLite
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Date Handling**: [date-fns](https://date-fns.org/)

---

## 📁 Project Structure

```
globetrotter/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── actions/               # Server actions
│   │   ├── activity.ts
│   │   ├── budget.ts
│   │   ├── trip.ts
│   │   └── ...
│   ├── app/                   # Next.js app router
│   │   ├── (auth)/           # Auth pages
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard pages
│   │   └── share/            # Public sharing
│   ├── components/           # React components
│   │   ├── activities/
│   │   ├── dashboard/
│   │   ├── itinerary/
│   │   └── ui/              # shadcn/ui components
│   ├── data/                 # Data utilities
│   ├── lib/                  # Shared utilities
│   └── schemas/              # Zod validation schemas
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎨 Key Features Breakdown

### **1. Authentication System**

- Email/password authentication
- Secure session management
- Protected routes with middleware
- User profile management

### **2. Trip Management**

- Create trips with cover images
- Add multiple stops (cities/countries)
- Set start and end dates
- Public/private visibility toggle

### **3. Activity System**

- 50+ pre-loaded activities across 20+ cities
- Category-based organization
- Price range filtering
- Duration and timing information
- Add to any trip stop

### **4. Budget Tools**

- Set total budget per trip
- Category-based expense tracking
- Visual budget analytics
- Spending vs. planned comparison

### **5. Calendar Integration**

- Day-by-day itinerary view
- Drag-and-drop activity scheduling
- Date range picker
- Multi-day event support

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema changes

# Code Quality
npm run lint         # Run ESLint
```

---

## 🔒 Environment Variables

| Variable               | Description          | Required |
| ---------------------- | -------------------- | -------- |
| `DATABASE_URL`         | SQLite database path | ✅       |
| `NEXTAUTH_URL`         | Application URL      | ✅       |
| `NEXTAUTH_SECRET`      | Session secret       | ✅       |
| `GOOGLE_CLIENT_ID`     | Google OAuth ID      | ❌       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret  | ❌       |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database powered by [Prisma](https://www.prisma.io/)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <strong>Happy Traveling! 🌏✈️🏖️</strong>
</div>
