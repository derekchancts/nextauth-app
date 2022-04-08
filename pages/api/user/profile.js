// import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"

// connectDB()

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // const { email } = req.body
      // console.log(email)

      let user = await User.findOne({ email: req.body.email })
      // console.log(user)

      // user.password = '';
      // if (user !== null) {
        const { _id = null, name, email } = user 
      // }
      
      const existingUser = { _id, name, email }
      // console.log(existingUser)

      // return res.status(200).send(user)
      return res.status(200).send(existingUser)
    }
  } catch (err) {
    console.log(err)
  }
}


// export default handler = async (req, res) => {
//   try {
//     if (req.method === "POST") {
//       const { email } = req.body

//       // console.log(email, password, firstName, lastName)

//       const user = await User.findOne({ email: email })

//       user.password = undefined

//       return res.status(200).send(user)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }
