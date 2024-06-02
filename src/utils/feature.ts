import mongoose from "mongoose"


const connectDB = async (mongoURI:string) => {
    try {
        const dbConnect = await mongoose.connect(mongoURI, {
            dbName: "whatsapp",
        })
        console.log("db connect successfuly " + dbConnect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}

export default connectDB; 