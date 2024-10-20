import ZiUser from "@/models/User";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";

export default async function handler(req, res) {
	if (mongoose.connection.readyState === 0) await connectToDatabase();

	const { userID } = req.query; // Lấy userID từ query

	try {
		const user = await ZiUser.findOne({ userID });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching user data" });
	}
}
