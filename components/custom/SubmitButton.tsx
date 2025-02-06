"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import GithubLogo from "@/public/github.svg";
import GoogleLogo from "@/public/google.svg";
import { useFormStatus } from "react-dom";

interface iAppProps {
  text: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled variant="outline" className={cn("w-full", className)}>
      <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
    </Button>
  ) : (
    <Button variant={variant} type="submit" className={cn("w-full font-medium px-4 py-3 rounded-lg transition hover:shadow-md", className)}>
      {text}
    </Button>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Please wait
        </>
      ) : (
        <>
          <Image src={GithubLogo} className="size-5 dark:invert" alt="GitHub Logo" />
          <span>Sign in with GitHub</span>
        </>
      )}
    </Button>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Please wait
        </>
      ) : (
        <>
          <Image src={GoogleLogo} className="size-5" alt="Google Logo" />
          <span>Sign in with Google</span>
        </>
      )}
    </Button>
  );
}
