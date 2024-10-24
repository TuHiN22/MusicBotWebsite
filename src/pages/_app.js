import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Zi Dashboard</title>
				<link
					rel='icon'
					href='https://avatars.githubusercontent.com/u/104454302'
				/>
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
