import { Mongoose } from "mongoose";

const uri = process.env.MONGO_URI

export const db = Mongoose.connect(uri)
