import Link from "next/link";
import { Bot, Moon, Sun, LogOut } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function header() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { data: session, status } = useSession();

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark", !isDarkMode);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='px-4 lg:px-6 h-14 flex items-center'>
			<Link
				className='flex items-center justify-center'
				href='#'>
				<Bot className='h-6 w-6' />
				<span className='sr-only'>Ziji Bot</span>
			</Link>
			<Link
				className='flex ml-2 items-center justify-center'
				href='#'>
				{isDarkMode ?
					<Sun
						className='h-6 w-6'
						onClick={toggleDarkMode}
					/>
				:	<Moon
						className='h-6 w-6'
						onClick={toggleDarkMode}
					/>
				}
			</Link>
			<nav className='ml-auto flex gap-4 sm:gap-6 items-center'>
				<Link
					className='text-sm font-medium hover:underline underline-offset-4'
					href='#features'>
					Features
				</Link>
				<Link
					className='text-sm font-medium hover:underline underline-offset-4'
					href='#stats'>
					Stats
				</Link>
				<Link
					className='text-sm font-medium hover:underline underline-offset-4'
					href='#about'>
					About
				</Link>
				<Link
					className='text-sm font-medium hover:underline underline-offset-4'
					href='https://discord.com/oauth2/authorize?client_id=1005716197259612193'>
					Add Bot
				</Link>
				{session && (
					<div className='flex items-center'>
						<h1 className='text-sm font-medium hover:underline underline-offset-4'>{session.user.name}!</h1>
						<div className='relative'>
							{/* Avatar button */}
							<button onClick={toggleDropdown}>
								<img
									src={session.user.image}
									alt='avatar'
									className='w-10 h-10 rounded-lg ml-2 border-2 border-white'
								/>
							</button>

							{/* Dropdown menu */}
							{isOpen && (
								<div className='absolute right-0 mt-2 w-48 rounded-lg shadow-lg'>
									<ul className='text-sm'>
										{/* <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center'>My Profile</li>
										<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center'>Settings</li> */}
										<li
											className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center'
											onClick={signOut}>
											<LogOut className='h-6 w-6 mr-2' /> Log out
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
