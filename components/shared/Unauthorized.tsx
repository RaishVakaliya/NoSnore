"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 md:pt-32 text-center">
        <div className="mb-6 md:mb-10 text-6xl md:text-8xl animate-bounce drop-shadow-2xl">
          😊
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 px-4">
          Access Restricted
        </h1>
        <p className="text-zinc-500 text-sm md:text-base max-w-sm md:max-w-md mb-8 leading-relaxed px-6">
          It looks like you're trying to access a protected area. Please sign in
          to view your dashboard, settings, and profile.
        </p>
        <div className="w-full max-w-[280px] md:max-w-none">
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="w-full md:w-auto rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 px-8 h-12 md:h-14 text-base md:text-lg transition-all shadow-2xl shadow-white/5"
            >
              Sign In to Continue
            </Button>
          </SignInButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
