
# 🚀 Next.js Project Generator

A powerful CLI tool to scaffold a scalable, modular **Next.js** project with best practices, essential dependencies, and opinionated architecture—ready for real-world development.

---

## 📦 Features

- ✅ **Modular folder structure**
- 🧠 **Redux Toolkit + Persist** pre-configured
- 🌍 **i18next** for localization
- 🎨 **Material-UI** and **SCSS** support
- ⚙️ **TypeScript**, strict linting, and Prettier
- 🔐 Auth module boilerplate
- 🗃️ `.env.local` with default variables
- 🧪 Testing ready structure
- 🛠️ Easily extendable (e.g., Socket.IO, internationalization)

---

## 🛠️ How to Use

```bash

# Run 
npx create-next-bricks

```

If no app name is passed, it defaults to `app-name`.

---

## 📁 Generated Folder Structure

```
your-app-name/
├── public/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── config/               # Environment configs
│   ├── modules/
│   │   └── auth/             # Auth-related logic
│   ├── shared/               # Shared UI/components
│   ├── store/                # Redux Toolkit store setup
│   ├── types/                # Global TypeScript types
│   └── styles/               # Global SCSS files
└── .env.local                # Local environment variables
```

> Temporary folders include `.temp` files to prevent deletion during initial Git commits.

---

## 📚 Pre-installed Packages

| Category          | Packages                                                                 |
|-------------------|--------------------------------------------------------------------------|
| **Core**          | `next`, `react`, `react-dom`, `typescript`, `sass`                       |
| **UI Framework**  | `@mui/material`, `@mui/icons-material`, `@emotion/react`, `styled`       |
| **State Mgmt**    | `@reduxjs/toolkit`, `react-redux`, `redux-persist`                      |
| **Utilities**     | `axios`, `i18next`, `react-i18next`      |
| **Dev Tools**     | `@types/react`, `@types/node`, `prettier`                                |

---

## ⚙️ Configuration Included

- `package.json` with common scripts
- `tsconfig.json` with `@/*` path aliases
- `next.config.js` with SVG support
- `store` with Redux Toolkit + persistence
- Localization setup with i18next
- Global layout, styles, and sample components
- Auth module boilerplate (slice + login page)
- API helper (`api.ts`) using Axios

---

## 💬 Need Socket.IO Support?

You can easily extend this with **Socket.IO**.

> 💡 Just ans:
>
> **1. Do you want to include Socket.IO setup? (yes/no):**

> **2. Do you want to add sample chat ui? (yes/no):**

It generate a Socket.IO integration with:
- Socket initialization via custom hook
- Connection and event handling
- Folder structure that fits into `shared` or `modules/chat`

---

## 🧑‍💻 Contributing

This CLI generator is meant for rapid prototyping and scaling production apps. Fork it, modify it, and use it across teams!

---

## 📄 License

**MIT** — Free to use, modify, and distribute.