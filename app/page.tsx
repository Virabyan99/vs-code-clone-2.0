import AuthModal from "@/components/custom/AuthModal";
import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
import { auth } from "./lib/auth";


export default async function Home() {
  const session = await auth()

  return (
    <div>
      <AuthModal/>
      <Header/>
      <Hero/>
    </div>
  );
}
