import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      
    },
    
    

  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
