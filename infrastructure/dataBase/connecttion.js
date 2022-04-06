const mongoose = require('mongoose')

 connectDB(MONGO_URI) = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB