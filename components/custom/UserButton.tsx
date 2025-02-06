"use client";

import { signOut } from "@/app/lib/auth";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/lib/actions";
import Image from "next/image";

const UserButton = ({ session }: { session: any }) => {
  return (
    <div className="flex items-center gap-2">
      {/* User Avatar */}
      <Image
        src={session?.user?.image || "/default-avatar.png"}
        alt="User Avatar"
        width={32}
        height={32}
        className="rounded-full w-8 h-8"
        unoptimized // Add this if images still don’t load
      />
      {/* User Name */}
      <span className="text-white">{session?.user?.name || "User"}</span>
      {/* Sign Out Button */}
      <form action={handleSignOut}>
        <Button variant="outline" className="text-white bg-red-500">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default UserButton;
