import mongoose from "mongoose";

const connectToDatabase = async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
};

export default connectToDatabase;
