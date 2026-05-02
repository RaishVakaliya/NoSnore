import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full" />

          <div className="relative text-center">
            <h1 className="text-[12rem] font-black leading-none tracking-tighter text-white/5 select-none sm:text-[18rem]">
              404
            </h1>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Lost in Space?
              </h2>
              <p className="mt-4 text-zinc-400 max-w-md mx-auto">
                The page you are looking for doesn't exist or has been moved to
                another dimension.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button className="h-12 px-8 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <MoveLeft className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
