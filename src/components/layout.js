import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { CircleFadingArrowUp } from "lucide-react";

const Layout = ({ children }) => {
	const [showScroll, setShowScroll] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", checkScrollTop);
		return () => {
			window.removeEventListener("scroll", checkScrollTop);
		};
	}, []);

	const checkScrollTop = () => {
		if (!showScroll && window.scrollY > 400) {
			setShowScroll(true);
		} else {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='min-h-screen'>{children}</main>
			<Footer />
			{showScroll && (
				<div className='fixed bottom-8 right-8 cursor-pointer'>
					<CircleFadingArrowUp
						className='h-6 w-6'
						onClick={scrollTop}
					/>
				</div>
			)}
		</div>
	);
};

export default Layout;
