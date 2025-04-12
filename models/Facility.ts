import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  name: String,
  typeOfCare: [String],
  zipRange: {
    from: Number,
    to: Number,
  },
  facilityZip: Number,
  capacity: String, // "Full" or "Available"
});

export default mongoose.models.Facility ||
  mongoose.model("Facility", FacilitySchema);
