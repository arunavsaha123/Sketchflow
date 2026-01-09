import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import { Server } from "socket.io"
import { connectDB } from "./config/db.js"
import boardRoutes from "./routes/boards.js"

dotenv.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())
app.use("/api/boards", boardRoutes)

io.on("connection", (socket) => {
  socket.on("join-board", (boardId) => {
    socket.join(boardId)
  })

  socket.on("canvas-update", ({ boardId, payload }) => {
    socket.to(boardId).emit("canvas-update", payload)
  })

  socket.on("disconnect", () => {})
})

connectDB()

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
