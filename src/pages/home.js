import Link from "next/link";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Server, Zap } from "lucide-react";
import { signIn } from "next-auth/react";

export default function DiscordBotLanding() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Layout>
				<main className='flex-1'>
					<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
						<div className='container px-4 md:px-6'>
							<div className='flex flex-col items-center space-y-4 text-center'>
								<div className='space-y-2'>
									<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
										Welcome to BloodiCe MuSiC Bot
									</h1>
									<p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
										Enhance your Discord server with powerful Music integrations and many more Fun Commands.
									</p>
								</div>
								<div className='space-x-4'>
									<Button
										asChild
										onClick={() => signIn("discord")}>
										<Link href='#'>Login with Discord</Link>
									</Button>
									<Button
										variant='outline'
										asChild>
										<Link href='/docs/general/getting-started'>Documentation</Link>
									</Button>
								</div>
							</div>
						</div>
					</section>
					<section
						id='features'
						className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
						<div className='container px-4 md:px-6'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>Features</h2>
							<div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
								<Card>
									<CardHeader>
										<CardTitle>Moderation</CardTitle>
									</CardHeader>
									<CardContent>
										<p>Keep your server safe with advanced moderation tools.</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Fun Commands</CardTitle>
									</CardHeader>
									<CardContent>
										<p>Engage your community with interactive games and commands.</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Integrations</CardTitle>
									</CardHeader>
									<CardContent>
										<p>Connect with popular services and enhance productivity.</p>
									</CardContent>
								</Card>
							</div>
						</div>
					</section>
					<section
						id='stats'
						className='w-full py-12 md:py-24 lg:py-32'>
						<div className='container px-4 md:px-6'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>Bot Statistics</h2>
							<div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
								<div className='flex flex-col items-center space-y-2'>
									<Users className='h-12 w-12 text-primary' />
									<h3 className='text-xl font-bold'>1M+ Users</h3>
									<p className='text-sm text-gray-500 dark:text-gray-400'>Across all servers</p>
								</div>
								<div className='flex flex-col items-center space-y-2'>
									<Server className='h-12 w-12 text-primary' />
									<h3 className='text-xl font-bold'>2K+ Servers</h3>
									<p className='text-sm text-gray-500 dark:text-gray-400'>Trusting our bot</p>
								</div>
								<div className='flex flex-col items-center space-y-2'>
									<Zap className='h-12 w-12 text-primary' />
									<h3 className='text-xl font-bold'>99.9% Uptime</h3>
									<p className='text-sm text-gray-500 dark:text-gray-400'>Reliable performance</p>
								</div>
							</div>
						</div>
					</section>
				</main>
			</Layout>
		</div>
	);
}
