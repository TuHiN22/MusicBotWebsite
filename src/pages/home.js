import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Users, Server, Zap } from 'lucide-react'

export default function DiscordBotLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Bot className="h-6 w-6" />
          <span className="sr-only">Ziji Bot</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#stats">
            Stats
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Ziji Bot
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Enhance your Discord server with moderation, fun commands, and powerful integrations.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/login">Login with Discord</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
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
        <section id="stats" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Bot Statistics</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">1M+ Users</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Across all servers</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Server className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">2K+ Servers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trusting our bot</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">99.9% Uptime</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reliable performance</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Ziji Bot. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/zijipia/Ziji-bot-discord">
            GitHub
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/zijipia/Ziji-bot-discord?tab=MIT-1-ov-file">
            License
          </Link>
        </nav>
      </footer>
    </div>
  )
}