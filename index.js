#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const projectName = process.argv[2] || "app-name";
const projectPath = path.join(process.cwd(), projectName);

console.log(`🚀 Creating project: ${projectName}...`);
fs.mkdirSync(projectPath, { recursive: true });

const folders = [
  "src/app",
  "src/modules/auth/components/.temp",
  "src/modules/auth/hooks/.temp",
  "src/modules/auth/api/.temp",
  "src/modules/chat/components/",
  "src/app/chat",
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
  "src/app/api",
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

const askQuestion = (query) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
};

const setUpSampleChat = () => {
  fs.writeFileSync(
    path.join(projectPath, "src/modules/chat/components/chat.tsx"),
    `
    "use client";
    import React, { useEffect, useState } from "react";
    import style from "./chat.module.css";

    interface IMsgDataTypes {
      roomId: String | number;
      user: String;
      msg: String;
      time: String;
    }

    const ChatPage = ({ socket, username, roomId }: any) => {
      const [currentMsg, setCurrentMsg] = useState("");
      const [chat, setChat] = useState<IMsgDataTypes[]>([]);

      const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentMsg !== "") {
          const msgData: IMsgDataTypes = {
            roomId,
            user: username,
            msg: currentMsg,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
          await socket.emit("send_msg", msgData);
          setCurrentMsg("");
        }
      };

      useEffect(() => {
        socket.on("receive_msg", (data: IMsgDataTypes) => {
          setChat((pre) => [...pre, data]);
        });
      }, [socket]);

      return (
        <div className={style.chat_div}>
          <div className={style.chat_border}>
            <div style={{ marginBottom: "1rem" }}>
              <p>
                Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
              </p>
            </div>
            <div>
              {chat.map(({ roomId, user, msg, time }, key) => (
                <div
                  key={key}
                  className={
                    user == username
                      ? style.chatProfileRight
                      : style.chatProfileLeft
                  }
                >
                  <span
                    className={style.chatProfileSpan}
                    style={{ textAlign: user == username ? "right" : "left" }}
                  >
                    {user.charAt(0)}
                  </span>
                  <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                    {msg}
                  </h3>
                </div>
              ))}
            </div>
            <div>
              <form onSubmit={(e) => sendData(e)}>
                <input
                  className={style.chat_input}
                  type="text"
                  value={currentMsg}
                  placeholder="Type your message.."
                  onChange={(e) => setCurrentMsg(e.target.value)}
                />
                <button className={style.chat_button}>Send</button>
              </form>
            </div>
          </div>
        </div>
      );
    };

    export default ChatPage;

    `
  );

  fs.writeFileSync(
    path.join(projectPath, "src/modules/chat/components/chat.module.css"),
    `
    .chat_div {
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      }
    .chat_border {
      border: 1px solid red;
      padding: 5px;
      }
    .chat_input {
      height: 2rem;
      width: 15rem;
      padding: 5px;
      }
    .chat_button {
      height: 2rem;
      }
    .chatProfileRight {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-direction: row-reverse;
      margin-bottom: 5px;
      }
    .chatProfileLeft {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 5px;
      }
    .chatProfileSpan {
      background-color: rgb(213, 213, 182);
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      border: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      }

    `
  );

  fs.writeFileSync(
    path.join(projectPath, "src/app/chat/page.tsx"),
    `
    "use client";
  import styles from "./page.module.css";
  import { io } from "socket.io-client";
  import { useState } from "react";
  import ChatPage from "@/components/page";

  export default function Home() {
    const [showChat, setShowChat] = useState(false);
    const [userName, setUserName] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [roomId, setroomId] = useState("");

    var socket: any;
    socket = io("http://localhost:3001");

    const handleJoin = () => {
      if (userName !== "" && roomId !== "") {
        console.log(userName, "userName", roomId, "roomId");
        socket.emit("join_room", roomId);
        setShowSpinner(true);
        // You can remove this setTimeout and add your own logic
        setTimeout(() => {
          setShowChat(true);
          setShowSpinner(false);
        }, 4000);
      } else {
        alert("Please fill in Username and Room Id");
      }
    };

    return (
      <div>
        <div
          className={styles.main_div}
          style={{ display: showChat ? "none" : "" }}
        >
          <input
            className={styles.main_input}
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            disabled={showSpinner}
          />
          <input
            className={styles.main_input}
            type="text"
            placeholder="room id"
            onChange={(e) => setroomId(e.target.value)}
            disabled={showSpinner}
          />
          <button className={styles.main_button} onClick={() => handleJoin()}>
            {!showSpinner ? (
              "Join"
            ) : (
              <div className={styles.loading_spinner}></div>
            )}
          </button>
        </div>
        <div style={{ display: !showChat ? "none" : "" }}>
         <ChatPage socket={socket} roomId={roomId} username={userName} />
       </div>
    </div>
  );
}

    `,
    "utf8"
  );

  fs.writeFileSync(
    path.join(projectPath, "src/app/chat/page.module.css"),
    `
    .main_div {
      height: 100vh;
      widows: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      }
    .main_input {
      height: 2rem;
      width: 15rem;
      padding: 5px;
      }
    .main_button {
      height: 2rem;
      width: 15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      }
    .loading_spinner {
      border: 4px solid rgba(0, 0, 0, 0.3);
      border-top: 4px solid #2196f3;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      }
    @keyframes spin {
      0% {
          transform: rotate(0deg);
          }
      100% {
          transform: rotate(360deg);
          }
    }

    `
  );


  console.log("✅ Basic chat setup successfully! You can check it on /chat 🚀");
};

const setupSocket = async () => {
  fs.writeFileSync(
    path.join(projectPath, "src/shared/hooks/useSocket.ts"),
    `
    import { useMemo } from "react";
    import { io } from "socket.io-client";

    export const useSocket = (url: string) => {
      return {
      socket: useMemo(() => io(url), [url]),
      };
    };

    `
  );

  fs.writeFileSync(
    path.join(projectPath, "server.js"),
    `
  const http = require("http");
  const { Server } = require("socket.io");
  const cors = require("cors");
  const httpServer = http.createServer();
  const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
 });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log("user with id"+socket.id + "joined room - " + roomId);
    });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log("Socket.io server is running on port"+PORT);
});

    `
  );

  const packageJsonContent = `{
    "name": "${projectName}",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "node": "node server.js"
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
      "next": "^15.2.4",
      "socket.io": "^4.8.1",
      "socket.io-client": "^4.8.1",
      "ws": "^8.18.1"
    },
    "devDependencies": {
      "@types/express": "^5.0.1",
      "@types/node": "^20.17.30",
      "@types/react": "^19.0.10",
      "@types/react-dom": "^19",
      "prettier": "^3.5.3",
      "@types/ws": "^8.18.1",
      "ts-node": "^10.9.2",
      "typescript": "^5.8.2"
    }
  }`;

  console.log("📜 Updating package.json...");
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    packageJsonContent,
    "utf8"
  );
 
};

(async () => {
  const useSocket = await askQuestion(
    "Do you want to include Socket.IO setup? (yes/no): "
  );
  const useSampleChatUI = await askQuestion(
    "Do you want me to sample chat ui? (yes/no): "
  );
  if (useSocket === "yes") setupSocket();
  if (useSampleChatUI === "yes") setUpSampleChat();

  console.log("✅ Do npm i or npm install to install dependencies");

  console.log(`
  📌 Next steps:
  
    1️⃣  Run:  npm run node  
    2️⃣  Start the server:  npm run dev  
  `);
  console.log("✅ Project setup completed successfully!");
})();

console.log("✅ Project setup complete!");
