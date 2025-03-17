import Mongoose from "mongoose";

const { Schema } = Mongoose;

const stopSchema = new Schema({
  title: String,
  type: String,
  hours: String,
  trailid: {
    type: Schema.Types.ObjectId,
    ref: "Trail",
  },
});

export const Stop = Mongoose.model("Stop", stopSchema);