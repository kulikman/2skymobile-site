import { useState, useEffect } from "react";
import { AnimatedGradientBg } from "@/components/ui/animated-gradient-bg";
import { GradientOrb, NetworkGrid } from "@/components/ui/decorative-elements";
import { useParallax } from "@/hooks/use-parallax";

interface PageHeroProps {
  badgeIcon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  title: string | React.ReactNode;
  subtitle: string;
  heroImage?: string;
  heroImageAlt?: string;
  children?: React.ReactNode;
}

export function PageHero({
  badgeIcon: Icon,
  badgeText,
  title,
  subtitle,
  heroImage,
  heroImageAlt = "Hero",
  children,
}: PageHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const parallaxOffset = useParallax(0.2);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const hasImage = !!heroImage;

  const content = (
    <>
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 transition-all duration-700 badge-shimmer ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{badgeText}</span>
      </div>

      <div className="headline-glow">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {title}
        </h1>
      </div>

      <p
        className={`text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 transition-all duration-700 delay-200 ${
          hasImage ? "max-w-2xl" : "max-w-2xl mx-auto"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {subtitle}
      </p>

      {children && (
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {children}
        </div>
      )}
    </>
  );

  return (
    <section
      className={`relative flex items-center overflow-hidden bg-background pt-20 ${
        hasImage ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <AnimatedGradientBg variant="mesh" />
      <div
        className="absolute inset-0 network-pattern opacity-40"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <GradientOrb size="xl" color="primary" position="top-right" animate />
      <GradientOrb size="lg" color="accent" position="bottom-left" animate />
      <NetworkGrid opacity="light" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {hasImage ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>{content}</div>
            <div className="hidden lg:block">
              <div
                className={`relative perspective-container transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="absolute -inset-8 bg-primary/20 rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <img
                    src={heroImage}
                    alt={heroImageAlt}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center">{content}</div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
