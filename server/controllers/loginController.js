import User from "../models/User.js";
import bcrypt from 'bcryptjs';
export const login = async (req, res) => {
  try {
    const message = req.body.message; // Access request body
    const userCookie = req.cookies.user;
    const parsedUser = JSON.parse(userCookie);
    // console.log("yash", parsedUser)

    // res.json({ message: 'Received data and cookie!' });
console.log(1)
    const user = await User.findOne({
      email: parsedUser.email,



    });

    if (!user) {
      console.log(2)

      const newUser = new User({
        email: parsedUser.email,
        name: parsedUser.name,
        token: parsedUser.token,
        id: parsedUser.id
      });

      await newUser.save();

      return res.status(200).send({message:'User has been created'});
    }
   else {
    console.log(3)
    res.status(200).send({message:"user found"});
   }


  }


  catch (error) {
    console.log(error);
  }
}