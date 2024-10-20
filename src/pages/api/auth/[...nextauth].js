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
	callbacks: {
		async signIn() {
			return true;
		},
		async redirect({ baseUrl }) {
			return baseUrl;
		},
		async session({ session, token }) {
			session.discriminator = token.discriminator;
			session.id = token.id;
			session.accessToken = token.accessToken;
			return session;
		},
	},
	secret: process.env.JWT_SECRET,
	session: {
		maxAge: 2 * 24 * 60 * 60,
	},
});
