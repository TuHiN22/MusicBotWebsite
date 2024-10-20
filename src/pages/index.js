import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
		return <div>Loading...</div>;
	}

	return (
		<div>
			{session ?
				<>
					<h1>Welcome, {session.user.name}</h1>
					<button onClick={() => signOut()}>Sign Out</button>
				</>
			:	<p>Redirecting to login...</p>}
		</div>
	);
}
