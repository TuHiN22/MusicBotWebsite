import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css"; // Thêm import cho CSS

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Chỉ thực hiện chuyển hướng khi đã render trên client-side
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	// Trong khi kiểm tra session, có thể hiển thị loading hoặc placeholder
	if (status === "loading") {
		return <div className={styles.loading}>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			{session ? (
				<div className={styles.content}>
					<h1 className={styles.welcome}>Welcome, {session.user.name}</h1>
					<img src={session.user.image} alt="avatar" className={styles.avatar} />
					<button className={styles.signOutButton} onClick={() => signOut()}>
						Sign Out
					</button>
				</div>
			) : (
				<p>Redirecting to login...</p>
			)}
		</div>
	);
}
