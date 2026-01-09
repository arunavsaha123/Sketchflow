import { Request, Response } from "express"
import Board from "../models/Board.js"

export const createBoard = async (req: Request, res: Response) => {
  const board = await Board.create(req.body)
  res.status(201).json(board)
}

export const getBoardById = async (req: Request, res: Response) => {
  const board = await Board.findById(req.params.id)
  res.json(board)
}

export const getAllBoards = async (_: Request, res: Response) => {
  const boards = await Board.find().sort({ createdAt: -1 })
  res.json(boards)
}

export const updateBoardContent = async (req: Request, res: Response) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  )
  res.json(board)
}

export const deleteBoard = async (req: Request, res: Response) => {
  await Board.findByIdAndDelete(req.params.id)
  res.json({ success: true })
}
