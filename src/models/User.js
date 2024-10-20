import mongoose from "mongoose";

const ZiUser = new mongoose.Schema({
	userID: { type: String },
	name: { type: String },
	xp: { type: Number },
	level: { type: Number, default: 1 },
	coin: { type: Number, default: 1 },
	lang: { type: String },
	volume: { type: Number, default: 100 },
	color: { type: String, default: "Random" },
});

export default mongoose.models.ZiUser || mongoose.model("ZiUser", ZiUser);
