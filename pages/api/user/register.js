// import connectDB from "../../lib/connectDB"
import User from '../../../model/userModel'
import bcrypt from 'bcryptjs'
// import { handleErrors } from '../../utils/HandleErrors'

// connectDB();

export default async function handler(req, res) {
  // console.log(req.method)
  if (req.method === 'POST') {
    // const { email, password, name } = req.body;
    const { email, password, firstName, lastName } = req.body;
    
    // const combinedName = name.firstName + ' ' + name.lastName;
    // console.log(combinedName)

    try {
      const user = await User.findOne({ email });
        if (user) {
          return res.status(422).json({ error: 'The email has already been registered. Please use another email' })
        }

        if (password.length < 6) {
          return res.status(422).json({ error: 'password must be at least 6 characters in length' })
        }

        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        // const newUser =  await User({ email, password: hashedpassword, name: combinedName }).save();
        const newUser =  await User({ email, password: hashedpassword, name: `${firstName} ${lastName}` }).save();
        return res.status(201).json({ success: 'Signup success' })
    } catch (err) {
      console.log(err)
      // const errors = handleErrors(err);
      // console.log(errors)
      return res.status(400).json({ err })
    }
  }
};