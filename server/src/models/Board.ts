import mongoose, { Schema, Document } from "mongoose"

export interface IBoard extends Document {
  title: string
  ownerId: string
  content: any
  createdAt: Date
}

const boardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  ownerId: { type: String, required: true },
  content: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IBoard>("Board", boardSchema)
