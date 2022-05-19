const mongoose = require("mongoose");
const {Schema} = mongoose;

const taskSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Please enter a first_name'] },
    description: { type: String, required: [true, 'Please enter a last_name'] },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    complete: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model("task", taskSchema);