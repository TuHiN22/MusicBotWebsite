"use client";

import { useState, useEffect } from "react";
import { User, LogOut, X, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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

export default function Component() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userData, setUserData] = useState({
		lang: "English",
		color: "#ff0000",
		volume: 100,
	});
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
				setPopupVisible(false);
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

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  
	return (
	  <div className="flex h-screen bg-gray-100">
		{/* Sidebar */}
		<div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
		  <div className="p-4 bg-indigo-600 flex justify-between items-center">
			<h1 className="text-2xl font-bold">Ziji Bot</h1>
			<button
			  onClick={toggleSidebar}
			  className="md:hidden text-white hover:text-gray-200"
			>
			  <X className="h-6 w-6" />
			</button>
		  </div>
		  <nav className="mt-4">
			<a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800">
			  <User className="mr-3" />
			  Profile
			</a>
		  </nav>
		</div>

			{/* Main content */}
			<div className='flex-1 overflow-auto'>
				<header className='bg-white shadow'>
					<div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
						<div className="flex items-center">
							<button onClick={toggleSidebar} className="mr-4 md:hidden">
                				<Menu className="h-6 w-6 text-gray-500" />
              				</button>
              				<h1 className="text-3xl font-bold text-gray-900">Profile settings</h1>
						</div>
						<div className='flex items-center'>
							<span className='mr-4 text-gray-600'>{session?.user?.name || "Username"}</span>
							<button
								onClick={() => signOut()}
								className='text-gray-600 hover:text-gray-800'>
								<LogOut className='h-5 w-5' />
							</button>
						</div>
					</div>
				</header>
				<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
					<div className='flex gap-6'>
						{/* Profile banner */}
						<div className='flex-1'>
							<div className='bg-indigo-600 rounded-lg p-6 mb-6 relative h-48'>
								<div className='absolute -bottom-12 left-6'>
									<img
										src={session?.user?.image || ""}
										alt='avatar'
										className='w-24 h-24 rounded-full border-4 border-white'
									/>
								</div>
							</div>
							<div className='mt-16 mb-6'>
								<h2 className='text-2xl font-bold text-gray-900'>{session?.user?.name || "Username"}</h2>
							</div>
						</div>

						{/* Configuration */}
						<div className='flex-1'>
							<div className='bg-white shadow rounded-lg p-6'>
								<h3 className='text-lg font-medium text-gray-900 mb-4'>Configuration</h3>
								<div className='space-y-4'>
									<div>
										<label
											htmlFor='language'
											className='block text-sm font-medium text-gray-700'>
											Language
										</label>
										<select
											id='language'
											name='language'
											className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
											value={userData.lang}
											onChange={(e) => setUserData({ ...userData, lang: e.target.value })}>
											<option value='vi'>Tiếng Việt</option>
											<option value='en'>English</option>
										</select>
									</div>

									<div>
										<label
											htmlFor='color'
											className='block text-sm font-medium text-gray-700'>
											Color {userData.color}
										</label>
										<input
											type='color'
											id='color'
											name='color'
											value={userData.color}
											onChange={(e) => setUserData({ ...userData, color: e.target.value })}
											className='mt-1 block w-8 h-8'
										/>
									</div>

									<div>
										<label
											htmlFor='volume'
											className='block text-sm font-medium text-gray-700'>
											Volume {userData.volume}%
										</label>
										<input
											type='range'
											id='volume'
											name='volume'
											min='0'
											max='100'
											value={userData.volume}
											onChange={(e) => setUserData({ ...userData, volume: e.target.value })}
											className='mt-1 block w-full'
										/>
									</div>
								</div>
								<div className='mt-6'>
									<button
										onClick={handleUpdate}
										className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										Save changes
									</button>
								</div>
							</div>
						</div>
					</div>
					{popupVisible && (
						<Notification
							message={updateStatus?.message}
							type={updateStatus?.type}
							onClose={() => setPopupVisible(false)}
						/>
					)}
				</main>
			</div>
		</div>
	);
}
