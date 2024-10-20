import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css"; // Thêm import cho CSS

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userData, setUserData] = useState(null);

	// Chỉ thực hiện chuyển hướng khi đã render trên client-side
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		} else if (session) {
			// Lấy thông tin người dùng từ DB
			fetch(`/api/user/getUser?userID=${session.user.id}`)
				.then((res) => res.json())
				.then((data) => setUserData(data))
				.catch((error) => console.error("Error fetching user data:", error));
		}
	}, [status, session, router]);

	// Trong khi kiểm tra session, có thể hiển thị loading hoặc placeholder
	if (status === "loading") {
		return <div className={styles.loading}>Loading...</div>;
	}

	const handleUpdate = async () => {
		await fetch("/api/user/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userID: session.user.id, lang: userData.lang, color: userData.color }),
		});
	};

	return (
		<div className={styles.container}>
			{session && userData ?
				<div className={styles.content}>
					<h1 className={styles.welcome}>Welcome, {session.user.name}</h1>
					<img
						src={session.user.image}
						alt='avatar'
						className={styles.avatar}
					/>
					<button
						className={styles.signOutButton}
						onClick={() => signOut()}>
						Sign Out
					</button>
					{/* Hiển thị thông tin cấp độ, màu sắc và ngôn ngữ */}
					<div className={styles.info}>
						<p>Cấp độ: {userData.level}</p>
						<p>Màu sắc: {userData.color}</p>
						<p>Ngôn ngữ: {userData.lang}</p>
					</div>
					{/* Thêm thanh điều hướng cho ngôn ngữ và màu sắc */}
					<nav className={styles.nav}>
						<select
							value={userData.lang}
							onChange={(e) => {
								setUserData({ ...userData, lang: e.target.value });
							}}>
							<option value=''>Chọn ngôn ngữ</option>
							<option value='vi'>Tiếng Việt</option>
							<option value='en'>English</option>
						</select>
						<input
							type='color'
							value={userData.color}
							onChange={(e) => {
								setUserData({ ...userData, color: e.target.value });
							}}
						/>
						<button onClick={handleUpdate}>Cập nhật thông tin</button>
					</nav>
				</div>
			:	<p>Redirecting to login...</p>}
		</div>
	);
}
