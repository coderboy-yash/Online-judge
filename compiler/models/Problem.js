import mongoose from "mongoose";

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
  inputFormat: {
    type: String,
    required: true
  },
  outputFormat: {
    type: String,
    required: true
  },
  constraint: {
    type: String,
    required: true
  },
  
  sampleTestCases: {
    type: String,
    required: true
  },
  allTestCases: {
    type: String,
    required: true
  },
  sampleOutput:{
    type:String,
    required:true

  },
  allTestOutput:{
    type:String,
    required:true

  },
});


export default mongoose.model('Problem', problemSchema);


