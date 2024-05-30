// ignore

import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import Grid from "@/components/Grid";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex flex-col items-center justify-center sm:px-10 px-5 mx-auto overflow-hidden">
      <div className="w-full max-w-7xl">
        <FloatingNav navItems={[{ name: "Home", link: "/", icon: <FaHome /> }]} />
        <Hero />
        <Grid />
      </div>
    </main>
  );
}
