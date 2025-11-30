import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TypeWriter } from "./TypeWriter";
import { StarfieldCanvas } from "./StarfieldCanvas";
import animated from "../assets/images/space_boy_developer.gif?url";
import animated1 from "../assets/images/space_boy_developer.webm?url";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
    >
      {/* Starfield Background */}
      <StarfieldCanvas />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 pointer-events-none"></div>
      <div className="absolute inset-0 nebula-gradient pointer-events-none"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              background:
                i % 3 === 0
                  ? "hsl(var(--primary))"
                  : i % 3 === 1
                  ? "hsl(var(--secondary))"
                  : "hsl(var(--accent))",
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Name and Info */}
          <div
            className={`flex flex-col space-y-8 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-left">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                  Kirolls Sabri
                </span>
              </h1>

              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium min-h-[3rem] text-left">
                <TypeWriter
                  texts={[
                    "Backend Developer",
                    "Python Developer",
                    "Full Stack Developer",
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={2000}
                />
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all duration-700 ease-out delay-150 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Button
                size="lg"
                className="gap-2 group relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                asChild
              >
                <a href="#projects">
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 group relative px-8 py-6 text-lg rounded-full border-2 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                asChild
              >
                <a href="#contact">
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 pt-2 transition-all duration-700 ease-out delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg group relative"
                asChild
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    GitHub
                  </span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg group relative"
                asChild
              >
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    LinkedIn
                  </span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg group relative"
                asChild
              >
                <a href="mailto:hello@example.com" aria-label="Email">
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Email
                  </span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side - Enhanced Avatar */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              <Avatar className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] border-0 shadow-none">
                <AvatarImage
                  src={animated}
                  alt="Kirolls Sabri - Backend Developer"
                  className="object-contain w-full h-full"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                  loading="eager"
                />
                <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground">
                  KS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
