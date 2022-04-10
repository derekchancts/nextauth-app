// import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"

// connectDB()

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // const { email } = req.body
      // console.log(email)


      // `object` ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types.
      // const note = await Note.findById(id);

      // `object` ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types (if we do not do this)
      // note._id = note._id.toString();

      // The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, 
      // but the result documents are plain old JavaScript objects (POJOs), not Mongoose documents
      let user = await User.findOne({ email: req.body.email }).lean()
      user._id = user?._id.toString();
      // console.log(user)

      // user.password = undefined;
      // console.log(user)

      // if (user !== null) {
        // const { _id = null, name, email } = user.toObject()
        const { _id, name, email, validEmail } = user
      // }

      
      const existingUser = { _id, name, email, validEmail }
      // console.log(existingUser)

      // return res.status(200).send(user)
      return res.status(200).send(existingUser)
    }
  } catch (error) {
    console.log(error)
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
