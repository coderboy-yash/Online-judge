import User from "../models/User.js";
import bcrypt from 'bcryptjs';
export const login = async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email.trim() });

        if (!user) {
            // User does not exist, create a new user
            const password=req.body.password
            const username=req.body.username
            const email=req.body.email
            // console.log(email,username,password);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
      console.log(hash)
            const newUser = new User({
              username: username.trim(),
              email: email.trim(),
              password: hash,
            });
      
            await newUser.save();
            return res.status(200).send('User has been created');
          }
      
    
        // Compare the entered password with the stored hash
        const isMatch = bcrypt.compareSync(req.body.password, user.token);
    
        if (!isMatch) {
          return res.status(400).send('Invalid password');
        }
    
        // Passwords match, authentication successful
        res.status(200).send('Login successful',user);
      }

    
    catch(error){
        console.log(error);
    }
}