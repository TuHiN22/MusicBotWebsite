import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

const scopes = ["identify", "guilds"].join(" ");

export default NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: scopes } },
		}),
	],
	logger: {
		error(code, metadata) {
			if (code === "OAUTH_CALLBACK_HANDLER_ERROR") {
				console.log(`[${code}] ${metadata.error_description}`);
			}
		},
	},

	callbacks: {
		async signIn({ user, account, profile }) {
			user.id = profile.id;
			return true;
		},
		async redirect({ baseUrl }) {
			return baseUrl;
		},
		async session({ session, token }) {
			session.discriminator = token.discriminator;
			session.id = token.id;
			session.accessToken = token.accessToken;
			session.user.id = token.id;
			return session;
		},
		async jwt({ token, user, account, profile }) {
			if (mongoose.connection.readyState === 0) await connectToDatabase();
			if (profile) {
				token.discriminator = profile.discriminator;
				token.id = profile.id;
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
	secret: process.env.JWT_SECRET,
	session: {
		maxAge: 2 * 24 * 60 * 60,
	},
});
