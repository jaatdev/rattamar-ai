import { HeroSection } from "@/components/features/HeroSection";
import { InputReactor } from "@/components/features/InputReactor";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] pb-20">
      <HeroSection />
      <InputReactor />
    </main>
  );
}

