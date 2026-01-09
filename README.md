# ✏️ Sketchflow  
**A real-time collaborative whiteboard inspired by Excalidraw, Miro, and FigJam**

Sketchflow is a full-stack collaborative whiteboard application that allows users to create boards, draw freely, share links with view/edit permissions, and collaborate live in real time.

Built with **React, Excalidraw, Node.js, MongoDB, and WebSockets**.

---

## 🌟 Features

### 🧠 Whiteboard
- Freehand drawing, shapes, text, arrows, images
- Powered by **Excalidraw**
- Infinite canvas with pan & zoom
- Autosave (debounced)

### 🔗 Shareable Boards
- **Private boards**
- **View-only links**
- **Edit links**
- Original owner always retains edit access
- Share mode handled via URL query params

### 👥 Live Collaboration
- Real-time multi-user editing using **Socket.IO**
- Instant sync across tabs and devices
- No page refresh needed
- Prevents editor conflicts & blank screens

### 📁 Board Management
- Create, delete, duplicate boards
- Dashboard with search & filters
- MongoDB-backed persistence

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript  
- Excalidraw  
- React Router  
- Vite  
- Tailwind CSS  
- Socket.IO Client  

### Backend
- Node.js + Express  
- MongoDB + Mongoose  
- Socket.IO  
- TypeScript  

---

## 📂 Project Structure

canvas-creation-main/
│
├── client/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Dashboard.tsx
│ │ │ └── Whiteboard.tsx
│ │ ├── components/
│ │ ├── socket.ts # shared socket instance
│ │ └── main.tsx
│ └── package.json
│
├── server/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── boardController.ts
│ │ ├── routes/
│ │ │ └── boards.ts
│ │ ├── models/
│ │ │ └── Board.ts
│ │ ├── socket.ts
│ │ └── index.ts
│ └── package.json
│
└── README.md

