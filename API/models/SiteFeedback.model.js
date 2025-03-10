import mongoose from "mongoose";

const { Schema, model } = mongoose;

const siteFeedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  ratings: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating should be between 1 and 5"],
    max: [5, "Rating should be between 1 and 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SiteFeedback = model("SiteFeedback", siteFeedbackSchema);

export default SiteFeedback;
