import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

const scopes = ["identify", "guilds"].join(" ");

export default NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: scopes } },
		}),
	],

	// Optional: Add custom pages, callbacks, etc.
});
