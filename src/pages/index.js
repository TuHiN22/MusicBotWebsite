import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css"; // Thêm import cho CSS

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userData, setUserData] = useState(null);
	const [updateStatus, setUpdateStatus] = useState(null); // Trạng thái thông báo

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
		return <div className={styles.loader}>Loading...</div>;
	}

	const handleUpdate = async () => {
		try {
			const response = await fetch("/api/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userID: session.user.id,
					lang: userData.lang,
					color: userData.color,
					volume: userData.volume,
				}),
			});

			if (response.ok) {
				setUpdateStatus("Cập nhật thành công!"); // Cập nhật trạng thái thành công
			} else {
				setUpdateStatus("Cập nhật thất bại."); // Cập nhật trạng thái thất bại
			}
		} catch (error) {
			setUpdateStatus("Đã xảy ra lỗi. Vui lòng thử lại sau."); // Cập nhật trạng thái lỗi
		}
	};

	return (
		<div className={styles.container}>
			{session && userData ?
				<div className={styles.content}>
					<h1 className={styles.welcome}>Welcome back, {session.user.name}!</h1>
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
						<p>Âm lượng: {userData.volume}</p>
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
						<input
							type='range'
							min='0'
							max='100'
							value={userData.volume}
							onChange={(e) => {
								setUserData({ ...userData, volume: e.target.value });
							}}
						/>
					</nav>
					<nav className={styles.nav}>
						<button onClick={handleUpdate}>Cập nhật thông tin</button>
					</nav>

					{/* Hiển thị thông báo trạng thái cập nhật */}
					{updateStatus && <p className={styles.updateStatus}>{updateStatus}</p>}
				</div>
			:	<p>Redirecting to login...</p>}
		</div>
	);
}
