// import mongoose from "mongoose"

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return
//   }
//   mongoose
//     .connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((con) => console.log("connected to DB"))
// }

// export default connectDB


import mongoose from 'mongoose'

const connectDB = () => {
  if(mongoose.connections[0].readyState){
    console.log('Already connected to MongoDB.')
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {}, err => {
    if(err) throw err;
    console.log('Connected to mongodb.')
  })
}

export default connectDB;