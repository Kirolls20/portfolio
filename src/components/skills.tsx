import { useEffect, useRef, useState } from "react";

const skills = [
  "Python",
  "Django",
  "Django Rest Framework",
  "SQL Server",
  "PostgreSQL",
  "JavaScript",
  "React",
  "TypeScript",
  "Docker",
  "Tailwind CSS",
  "Git",
  "FastAPI",
  "Redis",
  "Linux",
  'GPTs'
];

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate skills for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 space-y-4 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to build amazing products
          </p>
        </div>

        {/* Scrolling Skills Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling Skills */}
          <div className="flex gap-4 animate-scroll">
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="flex-shrink-0 px-6 py-3 rounded-full glass-panel border border-border/50 hover:border-primary/50 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <span className="text-xlg font-medium text-foreground">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
