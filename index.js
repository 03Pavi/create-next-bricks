#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "app-name";
const projectPath = path.join(process.cwd(), projectName);

console.log(`🚀 Creating project: ${projectName}...`);
fs.mkdirSync(projectPath, { recursive: true });

const folders = [
  "src/app",
  "src/modules/auth/components/.temp",
  "src/modules/auth/hooks/.temp",
  "src/modules/auth/api/.temp",
  "src/modules/auth",
  "src/store/slices/.temp",
  "src/shared/providers/.temp",
  "src/shared/lib/.temp",
  "src/shared/locales/.temp",
  "src/shared/ui/.temp",
  "src/shared/constants/.temp",
  "src/shared/hooks/.temp",
  "src/public/images/.temp",
  "src/public/fonts/.temp",
  "src/styles/.temp",
  "src/types/.temp",
  "src/config",
  "src/app/api/.temp",
  "src/app/public/.temp",
];

console.log("📂 Setting up folder structure...");
folders.forEach((folder) =>
  fs.mkdirSync(path.join(projectPath, folder), { recursive: true })
);

const packageJsonContent = `{
  "name": "${projectName}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.7",
    "@mui/material": "^6.4.8",
    "@reduxjs/toolkit": "^2.6.0",
    "axios": "^1.8.4",
    "date-fns": "^4.1.0",
    "dayjs": "^1.11.13",
    "i18next": "^24.2.2",
    "leaflet": "^1.9.4",
    "next": "^15.2.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.54.2",
    "react-i18next": "^15.4.1",
    "react-redux": "^9.2.0",
    "redux-persist": "^6.0.0",
    "sass": "^1.85.1",
    "next": "^15.2.4"
  },
  "devDependencies": {
    "@types/node": "^20.17.23",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2"
  }
}`;

console.log("📜 Creating package.json...");
fs.writeFileSync(
  path.join(projectPath, "package.json"),
  packageJsonContent,
  "utf8"
);

fs.writeFileSync(
  path.join(projectPath, "src/store/store.ts"),
  `
  import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/userSlice'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  auth: authReducer,
})
const persistedReducer: any = persistReducer(persistConfig, rootReducer)

export const store = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;

  `
);

fs.writeFileSync(
  path.join(projectPath, "src/store/slices/userSlice.ts"),
  `import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  name: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;`
);

fs.writeFileSync(
  path.join(projectPath, "src/config/api.ts"),
  `export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";`
);

fs.writeFileSync(
  path.join(projectPath, "src/app/globals.scss"),
  `:root {
  --global-color-secondary: #000000;
  --global-color-primary: #FFFFFF;
}

* {
  padding: 0;
  margin: 0;
}`
);

fs.writeFileSync(
  path.join(projectPath, "src/app/layout.tsx"),
  `import type { Metadata } from 'next'
import StoreProvider from '@/shared/providers/store-provider'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Next project',
  description: 'A Sample Next.js project with scalable modular structure',
  icons: {
    icon: '/app-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}`
);

fs.writeFileSync(
  path.join(projectPath, "src/app/page.tsx"),
  `import React from 'react';

const Page = () => {
  return <div>Welcome to ${projectName}</div>;
};

export default Page;`
);

fs.writeFileSync(
  path.join(projectPath, "next.config.js"),
  `/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};`
);

fs.writeFileSync(
  path.join(projectPath, "src/app/api/route.ts"),
  `
  import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json({ message: 'Server is running' })
}

  `
);

fs.writeFileSync(
  path.join(projectPath, "next-env.d.ts"),
  `
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
  `
);

fs.writeFileSync(
  path.join(projectPath, "tsconfig.json"),
  `
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "next.config.js"],
  "exclude": ["node_modules"]
}

  `
);

fs.writeFileSync(
  path.join(projectPath, ".env.local"),
  `SESSION_SECRET=your-secure-random-key
NEXT_PUBLIC_API_URL=http://localhost:3000`
);
fs.writeFileSync(
  path.join(projectPath, "src/store/hooks.ts"),
  `
  import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
  `
);

fs.writeFileSync(
  path.join(projectPath, "src/app/public/logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/></svg>`
);

fs.writeFileSync(
  path.join(projectPath, "src/shared/providers/store-provider.tsx"),
  `
'use client'

import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { Persistor } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import store, { AppStore } from '@/store/store'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(null)
  const persistorRef = useRef<Persistor>(null)
  if (!storeRef.current || !persistorRef.current) {
    storeRef.current = store()
    persistorRef.current = persistStore(storeRef.current)
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}
`
);

console.log("✅ Project setup complete!");
