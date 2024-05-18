import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  }
});

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique:true

  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sampleTestCases: {
    type: [testCaseSchema],
    required: true
  },
  allTestCases: {
    type: [testCaseSchema],
    required: true
  }
});


export default mongoose.model('Problem', problemSchema);


