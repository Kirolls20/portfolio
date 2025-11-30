import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Restaurant Cost Management",
    description: "A robust platform enabling restaurants to manage Recipe costs, inventory, and detailed reporting for better profitability.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Python", "Django", "SQL Server", "Tailwind CSS",'Javascript','Docker'],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Omega Clean Company System",
    description: "A comprehensive platform designed to streamline the management of cleaning product inventory, customer orders, invoicing, and all related financial operations. ",
    image: "",
    tags: ["Django", "Javascript", "Html&Css","Python", "Tailwind CSS",'SQL','Docker'],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },

  {
    title: "Blog Platform",
    description: "Minimalist blogging platform with markdown support and SEO optimization.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    tags: ["Gatsby", "GraphQL", "Contentful"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export const Projects = () => {
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 space-y-4 transition-all duration-700 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work showcasing different technologies and
            problem-solving approaches
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
