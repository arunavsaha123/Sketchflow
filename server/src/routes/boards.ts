import { Router } from "express"
import {
  createBoard,
  getBoardById,
  getAllBoards,
  updateBoardContent,
  deleteBoard,
} from "../controllers/boardController.js"

const router = Router()

router.get("/", getAllBoards)
router.post("/", createBoard)
router.get("/:id", getBoardById)
router.put("/:id", updateBoardContent)
router.delete("/:id", deleteBoard)

export default router
