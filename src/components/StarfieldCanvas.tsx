import { useEffect, useRef, useCallback } from "react";

/**
 * Star Configuration
 * Adjust these values to customize the starfield appearance
 */
const CONFIG = {
  // Density: stars per 100k pixels (scales with viewport size)
  starDensity: 0.15,
  
  // Speed multipliers for parallax effect
  minSpeed: 0.05,
  maxSpeed: 0.5,
  
  // Star size range (radius in pixels)
  minSize: 0.5,
  maxSize: 2.5,
  
  // Twinkle settings
  twinkleProbability: 0.002,
  twinkleSpeed: 0.03,
  
  // Shooting stars
  shootingStarProbability: 0.0003,
  shootingStarSpeed: 8,
  shootingStarLength: 100,
  
  // Colors (mix of white, blue, purple tints)
  colors: [
    "rgba(255, 255, 255,", // white
    "rgba(173, 216, 255,", // blue tint
    "rgba(200, 180, 255,", // purple tint
  ],
};

interface Star {
  x: number;
  y: number;
  z: number; // depth (0-1, closer = higher z)
  baseSize: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  isTwinkling: boolean;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  active: boolean;
}

/**
 * StarfieldCanvas Component
 * 
 * A performant, animated starfield background using Canvas API
 * Features:
 * - Depth-based parallax (stars move at different speeds based on depth)
 * - Twinkling animation
 * - Occasional shooting stars
 * - High-DPI support
 * - Responsive resize handling
 * - Motion preference support
 * 
 * @param reduceMotion - If true, disables animations for accessibility
 */
export const StarfieldCanvas = ({ reduceMotion = false }: { reduceMotion?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Initialize stars based on viewport size
  const initStars = useCallback((width: number, height: number) => {
    const area = width * height;
    const starCount = Math.floor((area / 100000) * CONFIG.starDensity * 100);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const z = Math.random(); // depth: 0 (far) to 1 (close)
      const colorIndex = Math.floor(Math.random() * CONFIG.colors.length);
      
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        baseSize: CONFIG.minSize + (CONFIG.maxSize - CONFIG.minSize) * z,
        size: CONFIG.minSize + (CONFIG.maxSize - CONFIG.minSize) * z,
        baseOpacity: 0.4 + z * 0.6,
        opacity: 0.4 + z * 0.6,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        isTwinkling: false,
        color: CONFIG.colors[colorIndex],
      });
    }

    return stars;
  }, []);

  // Create a new shooting star
  const createShootingStar = useCallback((width: number, height: number) => {
    const startX = Math.random() * width;
    const startY = Math.random() * height * 0.5; // top half more likely
    const angle = Math.PI / 4 + Math.random() * (Math.PI / 6); // 45° to 75°

    return {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * CONFIG.shootingStarSpeed,
      vy: Math.sin(angle) * CONFIG.shootingStarSpeed,
      length: CONFIG.shootingStarLength,
      opacity: 1,
      active: true,
    };
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, dpr } = dimensionsRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width * dpr, height * dpr);

    const stars = starsRef.current;
    const shootingStars = shootingStarsRef.current;

    // Update and draw stars
    stars.forEach((star) => {
      if (!reduceMotion) {
        // Parallax movement based on depth
        star.y += star.z * (CONFIG.minSpeed + (CONFIG.maxSpeed - CONFIG.minSpeed) * star.z);
        
        // Wrap around
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        // Twinkling logic
        if (!star.isTwinkling && Math.random() < CONFIG.twinkleProbability) {
          star.isTwinkling = true;
        }

        if (star.isTwinkling) {
          star.opacity -= star.twinkleSpeed;
          if (star.opacity <= 0.2) {
            star.opacity = 0.2;
            star.twinkleSpeed *= -1; // reverse
          } else if (star.opacity >= star.baseOpacity) {
            star.opacity = star.baseOpacity;
            star.isTwinkling = false;
            star.twinkleSpeed = Math.abs(star.twinkleSpeed);
          }
        }
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(star.x * dpr, star.y * dpr, star.size * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `${star.color}${star.opacity})`;
      ctx.fill();
    });

    // Update and draw shooting stars
    if (!reduceMotion) {
      // Spawn new shooting star occasionally
      if (Math.random() < CONFIG.shootingStarProbability) {
        shootingStars.push(createShootingStar(width, height));
      }

      shootingStars.forEach((shootingStar, index) => {
        if (!shootingStar.active) return;

        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStars.splice(index, 1);
          return;
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          shootingStar.x * dpr,
          shootingStar.y * dpr,
          (shootingStar.x - shootingStar.vx * 10) * dpr,
          (shootingStar.y - shootingStar.vy * 10) * dpr
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(1, `rgba(173, 216, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(shootingStar.x * dpr, shootingStar.y * dpr);
        ctx.lineTo(
          (shootingStar.x - shootingStar.vx * 10) * dpr,
          (shootingStar.y - shootingStar.vy * 10) * dpr
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();
      });
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [reduceMotion, createShootingStar]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Set actual canvas size (accounting for DPI)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Update dimensions
    dimensionsRef.current = {
      width: rect.width,
      height: rect.height,
      dpr,
    };

    // Reinitialize stars with new dimensions
    starsRef.current = initStars(rect.width, rect.height);
  }, [initStars]);

  useEffect(() => {
    handleResize();
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ backgroundColor: "hsl(var(--background))" }}
      aria-hidden="true"
    />
  );
};
