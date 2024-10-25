import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/home");
		} else if (session) {
			router.push("/profile");
		}
	}, [status, session, router]);

	if (status === "loading") {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='loader'>
					<div className='dot'></div>
					<div className='dot'></div>
					<div className='dot'></div>
					<div className='dot'></div>
					<div className='dot'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<p>Redirecting to {session ? "dashboard" : "login"}...</p>
		</div>
	);
}
