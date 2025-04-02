# **📂 Scalable Modular Architecture – Folder Structure**  

## **Introduction**  
As part of our frontend development approach, I have designed this **scalable modular folder structure** to ensure scalability, maintainability, and ease of onboarding for new developers. This structure follows **Modular Architecture** principles, making it easier to work on independent features while keeping the codebase well-organized.  

---

## **Why This Folder Structure?**  

### **✅ 1. Scalability & Maintainability**  
- Each feature is isolated in the `modules/` folder, making it easy to add, update, or remove functionalities without affecting other parts of the application.  
- The `store/` folder centralizes state management, ensuring a single source of truth.  

### **✅ 2. Improved Developer Onboarding**  
- New developers can quickly understand the project by following the structure.  
- All global utilities, types, and styles are well-organized, reducing confusion.  

### **✅ 3. Reusability & Separation of Concerns**  
- **Feature-Sliced Design (FSD)**: Each module contains its own components, hooks, API calls, and types.  
- **Shared utilities** (like providers and constants) are kept in `shared/` for reusability.  

### **✅ 4. Next.js & Redux Integration**  
- The `app/` folder follows Next.js **App Router** structure.  
- The `store/` folder ensures a **centralized Redux state**, making state management more predictable.  

---

## **📂 Folder Structure Overview**  

```
/src
│── app/                  # Next.js App Router (entry pages, layouts, API routes)
│── modules/              # Feature-based structure (authentication, dashboard, etc.)
│── store/                # Global state management (Redux Toolkit)
│── shared/               # Common utilities, providers, hooks, and constants
│── public/               # Static assets (images, fonts, icons)
│── styles/               # Global styles and themes
│── types/                # TypeScript interfaces and global types
│── config/               # Configuration settings (API, session, etc.)
│── middleware.ts         # Next.js middleware (authentication & redirection logic)
│── .env.local            # Environment variables (API keys, session secrets)
│── README.md             # Documentation for developers
```

---

## **📂 Detailed Folder Explanation**  

### **📌 `app/` – Application Entry & Routing**  
Handles **page rendering, layouts, and API routes** using Next.js App Router.  
- Contains pages like `page.tsx` (home) and API endpoints.  
- Uses `(auth)/` and `(dashboard)/` folders for authentication and protected routes.  
- `layout.tsx` is used to wrap the entire application with providers (Redux, authentication).  

📌 **Example Structure:**  
```
/app
│── layout.tsx          # Global layout with Redux provider
│── page.tsx            # Home page
│── api/                # Next.js API routes
│── (auth)/             # Authentication pages (Login, Register)
│── (dashboard)/        # Protected pages (Dashboard, Profile)
│── loading.tsx         # Global loading indicator
│── not-found.tsx       # 404 Page
```

---

### **📌 `modules/` – Feature-Based Code**  
Each module contains **all the necessary logic** for a feature, following Feature-Sliced Design (FSD).  
- This keeps the code modular and easy to maintain.  

📌 **Example: Authentication Module (`auth/`)**  
```
/modules/auth
│── components/          # UI components (LoginForm, RegisterForm)
│── hooks/               # Custom React hooks (useAuth)
│── api/                 # API functions (login/logout)
│── types.ts             # TypeScript interfaces
│── auth.module.ts       # Module entry point
```

---

### **📌 `store/` – Redux Toolkit State Management**  
Holds all **Redux slices** and **store configuration** to manage global state.  
- `store.ts` initializes the Redux store.  
- `slices/` contains feature-specific Redux logic.  
- `hooks.ts` contains custom Redux hooks (`useAppSelector`, `useAppDispatch`).  

📌 **Example Structure:**  
```
/store
│── store.ts             # Main Redux store setup
│── slices/              # Redux slices (authSlice.ts, userSlice.ts)
│── hooks.ts             # Typed hooks for Redux
```

---

### **📌 `shared/` – Reusable Utilities & Providers**  
Stores **global utilities, context providers, and helper functions** shared across multiple features.  

📌 **Example Structure:**  
```
/shared
│── providers/           # Wrappers for Redux, Auth, and Theme
│── lib/                 # Utility functions (date formatting, API helpers)
│── constants/           # Global constants (routes, status codes)
│── hooks/               # Global reusable hooks
```

---

### **📌 `public/` – Static Assets**  
Holds **static files** such as images, fonts, and icons.  

📌 **Example Structure:**  
```
/public
│── images/              # Logos, icons, and illustrations
│── fonts/               # Custom fonts
│── favicon.ico          # Site favicon
```

---

### **📌 `styles/` – Global Styles & Themes**  
Contains all **global styling logic**, whether using **CSS, SCSS, Tailwind, or MUI themes**.  

📌 **Example Structure:**  
```
/styles
│── globals.css          # Global styles
│── theme.ts             # Theme configuration (if using MUI or Tailwind)
│── mixins.scss          # SCSS mixins (if using SCSS)
```

---

### **📌 `types/` – TypeScript Definitions**  
Defines **TypeScript interfaces and types** used across the application.  

📌 **Example Structure:**  
```
/types
│── user.ts              # User-related types
│── api.ts               # API response types
│── auth.ts              # Authentication types
```

---

### **📌 `config/` – Configuration & Environment Variables**  
Stores **application-wide configurations** like API URLs, session settings, and other constants.  

📌 **Example Structure:**  
```
/config
│── api.ts               # API base URLs
│── session.ts           # Iron-session settings
```

---

### **📌 `middleware.ts` – Next.js Middleware**  
Handles **server-side redirections & authentication checks**.  

📌 **Example Use Case:**  
- **Redirect unauthenticated users** from `/dashboard` to `/login`.  
- **Protect API routes** from unauthorized access.  

---

### **📌 `.env.local` – Environment Variables**  
Stores **sensitive configuration values** like API keys, database URLs, and session secrets.  

📌 **Example:**
```
SESSION_SECRET=your-secure-random-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## **✅ Best Practices**  
✔ **Follow modular design (`modules/`)** to keep code isolated and reusable.  
✔ **Use `shared/` for utilities** like constants, hooks, and providers.  
✔ **Keep API calls inside features (`modules/auth/api`).**  
✔ **Organize styles and assets properly (`styles/`, `public/`).**  
✔ **Centralize state management (`store/`)** to keep data flow predictable.  

---

## **🚀 Next Steps**  
1️⃣ Implement **role-based authentication**.  
2️⃣ Add **unit tests for authentication & API calls**.  
3️⃣ Document **API usage and state management flow**.  

---

## **📧 Need Help?**  
If you have questions or suggestions, feel free to reach out or open an **issue** in the repo.  

---

### **💡 Happy Coding! 🚀**  
_By Pavitar Singh_