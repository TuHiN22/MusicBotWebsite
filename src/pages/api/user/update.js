import User from "@/models/User";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";

const handler = async (req, res) => {
	if (mongoose.connection.readyState === 0) await connectToDatabase();

	if (req.method === "POST") {
		const { userID, lang, color, volume } = req.body;

		// Kiểm tra ngôn ngữ
		if (!["vi", "en"].includes(lang)) {
			return res.status(400).json({ error: "Ngôn ngữ không hợp lệ. Chỉ chấp nhận 'vi' hoặc 'en'." });
		}

		// Kiểm tra mã màu hex
		const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
		if (!hexColorRegex.test(color)) {
			return res.status(400).json({ error: "Màu sắc không hợp lệ. Vui lòng nhập mã hex." });
		}

		if (isNaN(volume)) {
			return res.status(400).json({ error: "Âm lượng không hợp lệ. Vui lòng nhập số." });
		}

		try {
			await User.updateOne({ userID }, { lang, color, volume });
			res.status(200).json({ message: "User updated successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to update user" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
