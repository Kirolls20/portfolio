import { useState, useEffect } from "react";
import { StarfieldCanvas } from "@/components/StarfieldCanvas";
import { GlassNav } from "@/components/GlassNav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

const Index = () => {
  // Check user's motion preference
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleToggleMotion = () => {
    setReduceMotion((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen">
      {/* Starfield Background */}
      <StarfieldCanvas reduceMotion={reduceMotion} />

      {/* Nebula Gradient Overlay */}
      <div className="fixed inset-0 nebula-gradient -z-10" />

      {/* Navigation */}
      <GlassNav
        reduceMotion={reduceMotion}
        onToggleMotion={handleToggleMotion}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
