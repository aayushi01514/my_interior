import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  type: String,
  assignee: String,
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
