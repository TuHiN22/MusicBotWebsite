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
					href='/favicon.png'
				/>
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
