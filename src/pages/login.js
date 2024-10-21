import { signIn } from "next-auth/react";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.header}>Welcome to the dashboard</h1>
				<h1 className={styles.subheader}>Here you can manage your profile!</h1>
				<button
					className={styles.button}
					onClick={() => signIn("discord")}>
					Sign in with Discord
				</button>
			</div>
		</div>
	);
}
