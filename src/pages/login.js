import { signIn } from "next-auth/react";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.header}>Login with Discord</h1>
				<button
					className={styles.button}
					onClick={() => signIn("discord")}>
					Sign in with Discord
				</button>
			</div>
		</div>
	);
}
