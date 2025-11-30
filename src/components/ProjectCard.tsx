import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <Card className="glass-panel border-border/50 overflow-hidden group hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
      {/* Project Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={`${title} preview`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        
        {/* Hover Overlay with Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm">
          {liveUrl && (
            <Button
              variant="default"
              size="lg"
              className="gap-2 rounded-full"
              asChild
            >
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                View Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-full border-2"
              asChild
            >
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" />
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-3 py-1 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        {liveUrl && (
          <Button
            variant="default"
            size="sm"
            className="gap-2 flex-1 rounded-full group/btn"
            asChild
          >
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              Live Demo
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 flex-1 rounded-full border-2 group/btn hover:bg-primary/10 hover:border-primary/50"
            asChild
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
