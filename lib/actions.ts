"use server";

import { signIn, signOut } from "@/app/lib/auth";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signInWithGithub() {
  await signIn("github");
}

export async function handleSignOut() {
  await signOut();
}