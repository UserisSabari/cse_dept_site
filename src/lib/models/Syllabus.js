import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  // Programme the syllabus belongs to — used for public browser filtering
  programme: {
    type: String,
    enum: ["BTech", "MTech", "PhD"],
    required: true,
  },
  yearOfScheme: {
    type: String,
    required: true,
  },
  // Semester identifier, e.g. "S1" … "S8"
  sem: {
    type: String,
    enum: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
    required: true,
  },
  syllabus: {
    type: String,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
});

const Syllabus =
  mongoose.models.Syllabus || mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;
