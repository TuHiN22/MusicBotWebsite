import Link from "next/link";
import { Bot, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function header() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle("dark", !isDarkMode);
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
				className='flex ml-3 items-center justify-center'
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
			<nav className='ml-auto flex gap-4 sm:gap-6'>
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
					href={"https://discord.com/oauth2/authorize?client_id=" + process.env.DISCORD_CLIENT_ID}>
					Add Bot
				</Link>
			</nav>
		</header>
	);
}
