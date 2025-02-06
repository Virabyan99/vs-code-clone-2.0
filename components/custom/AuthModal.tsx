"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import { signInWithGoogle, signInWithGithub } from "@/lib/actions";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButton";

const AuthModal = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) return null; // Hide if authenticated

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition">
          Try for Free
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
        <DialogHeader className="flex flex-col items-center">
          <Image src={Logo} className="size-12 mb-2" alt="Logo" />
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
            Easy <span className="text-primary">Codding</span>
          </h4>
        </DialogHeader>

        <DialogTitle className="sr-only">Authentication Modal</DialogTitle>

        <div className="flex flex-col gap-4 mt-5">
          <form className="w-full" action={signInWithGoogle}>
            <GoogleAuthButton />
          </form>

          <form className="w-full" action={signInWithGithub}>
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
