// import connectDB from "../../lib/connectDB"
import User from '../../../model/userModel'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"
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

        // console.log(newUser)  



        // const token = jwt.sign({ _id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME } )
        const token = jwt.sign({ _id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"} )

          // console.log("token1", token)

          newUser.emailToken = token
          await newUser.save()

          const { origin } = absoluteUrl(req)
          const link = `${origin}/src/user/email/${token}`

          const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
        <div>link:${link}</div>`

          await sendEmail({
            to: newUser.email,
            subject: "Email Verification",
            text: message,
          })

          return res.status(200).json({
            success: `Email sent to ${newUser.email}, please check your email`,
          })


        // return res.status(201).json({ success: 'Signup success' })
    } catch (error) {
      console.log(error)
      // const errors = handleErrors(err);
      // console.log(errors)
      return res.status(400).json({ error })
    }
  }
};