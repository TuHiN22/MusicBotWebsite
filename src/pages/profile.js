import Link from "next/link";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const Notification = ({ message, type, onClose }) => {
	return (
		<div
			className={`fixed flex items-center top-4 right-4 px-4 py-2 border rounded-md shadow-lg transition-transform ${
				type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
			}`}>
			<span>{message}</span>
			<X
				className='ml-1 h-6 w-6 mr-2 cursor-pointer'
				onClick={onClose}
			/>
		</div>
	);
};

export default function Profile() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userData, setUserData] = useState(null);
	const [updateStatus, setUpdateStatus] = useState(null);
	const [popupVisible, setPopupVisible] = useState(false);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/home");
		} else if (session) {
			fetch(`/api/user/getUser?userID=${session.user.id}`)
				.then((res) => res.json())
				.then((data) => setUserData(data))
				.catch((error) => console.error("Error fetching user data:", error));
		}
	}, [status, session, router]);

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
				setUpdateStatus({ message: "Cập nhật thành công!", type: "success" });
			} else {
				setUpdateStatus({ message: "Cập nhật thất bại.", type: "error" });
			}
		} catch (error) {
			setUpdateStatus({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau.", type: "error" });
		} finally {
			setPopupVisible(true);
			setTimeout(() => setPopupVisible(false), 5000);
		}
	};

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = ""; // This triggers the browser's confirmation dialog
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<div className='flex flex-col min-h-screen'>
			{session && (
				<Layout>
					<main className='flex-1'>
						{/* User Settings */}
						<section
							id='setting'
							className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
							<div className='container px-4 md:px-6'>
								<img
									src={session.user.image}
									alt='avatar'
									className='w-24 h-24 rounded-full mx-auto mb-5 border-2 border-white'
								/>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>User profile</h2>

								<div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
									{/* Language */}
									<Card>
										<CardHeader>
											<CardTitle>Language: {userData?.lang}</CardTitle>
										</CardHeader>
										<CardContent>
											<select
												value={userData?.lang}
												onChange={(e) => setUserData({ ...userData, lang: e.target.value })}>
												<option value='vi'>Tiếng Việt</option>
												<option value='en'>English</option>
											</select>
										</CardContent>
									</Card>

									{/* Color */}
									<Card>
										<CardHeader>
											<CardTitle>Color: {userData?.color}</CardTitle>
										</CardHeader>
										<CardContent>
											<input
												type='color'
												value={userData?.color}
												onChange={(e) => setUserData({ ...userData, color: e.target.value })}
											/>
										</CardContent>
									</Card>

									{/* Volume */}
									<Card>
										<CardHeader>
											<CardTitle>Volume: {userData?.volume}%</CardTitle>
										</CardHeader>
										<CardContent>
											<input
												type='range'
												min='0'
												max='100'
												value={userData?.volume}
												onChange={(e) => setUserData({ ...userData, volume: e.target.value })}
											/>
										</CardContent>
									</Card>

									{/* Update Button */}
									<div></div>
									<Button
										asChild
										onClick={handleUpdate}>
										<Link href='#setting'>Update</Link>
									</Button>
								</div>
							</div>
						</section>

						{/* Notification */}
						{popupVisible && (
							<Notification
								message={updateStatus.message}
								type={updateStatus.type}
								onClose={() => setPopupVisible(false)}
							/>
						)}
					</main>
				</Layout>
			)}
		</div>
	);
}
