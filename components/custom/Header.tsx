import Link from "next/link";
import { Blocks, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/lib/auth";
import AuthModal from "@/components/custom/AuthModal";
import UserButton from "@/components/custom/UserButton"; // Import UserButton

const Header = async () => {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="relative z-50 w-full px-7">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl p-6 rounded-lg w-full">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
            <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
              Vs code clone
            </span>
            <span className="block text-xs text-blue-400/60 font-medium">
              Interactive Code Editor
            </span>
          </div>
        </Link>

        {/* Right side - Dark Mode & Auth Modal/User Button */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <Button variant="outline" size="sm" className="bg-slate-600">
            <Sun className="w-5 h-5 text-white" />
          </Button>

          {/* Show User Button if authenticated, otherwise show AuthModal */}
          {isAuthenticated ? <UserButton session={session} /> : <AuthModal isAuthenticated={isAuthenticated} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
