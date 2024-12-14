import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>BloodiCE MuSiC</title>
				<link
					rel='icon'
					href='https://dbl-static.usercontent.prism.gg/avatars/615647608475746304/bdb91ae5d2e40abc897727f43d096249.png?size=256'
				/>
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
