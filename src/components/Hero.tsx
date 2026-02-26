import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Store, BarChart3, Wifi, Signal, Activity } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedGradientBg } from "@/components/ui/animated-gradient-bg";
import { useParallax } from "@/hooks/use-parallax";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useAnimatedCounter } from "@/hooks/use-count-up";
import { trackCTAClick } from "@/lib/event-tracking";

const benefits = [
  {
    icon: Globe,
    text: "190+ countries coverage",
  },
  {
    icon: Store,
    text: "Quick launch",
  },
  {
    icon: BarChart3,
    text: "Operator-grade billing",
  },
];

// Floating particle component
const FloatingParticle = ({ 
  delay, 
  size, 
  initialX, 
  initialY 
}: { 
  delay: number; 
  size: number; 
  initialX: number; 
  initialY: number;
}) => (
  <div
    className="absolute rounded-full bg-primary/20 animate-float"
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${6 + Math.random() * 4}s`,
    }}
  />
);

// Dashboard Mockup Component with 3D tilt effect
const DashboardMockup = ({ isVisible }: { isVisible: boolean }) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { style: tiltStyle } = useMouseParallax(dashboardRef, { 
    intensity: 8, 
    smoothing: 150 
  });

  // Animated counter values
  const activeEsims = useAnimatedCounter("24.8K", isVisible, 2000);
  const countries = useAnimatedCounter("194", isVisible, 1800);
  const dataToday = useAnimatedCounter("1.2TB", isVisible, 2200);

  return (
    <div
      ref={dashboardRef}
      className={`relative perspective-container transition-all duration-1000 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={isVisible ? tiltStyle : undefined}
    >
      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-8 bg-primary/20 rounded-3xl blur-3xl" />
      
      {/* Main dashboard card */}
      <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Signal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Network Dashboard</p>
              <p className="text-xs text-muted-foreground">Real-time analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success">Live</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/50 rounded-xl p-3 group hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xs text-muted-foreground">Active eSIMs</span>
            </div>
            <p className="text-xl font-bold text-foreground">{activeEsims}</p>
            <p className="text-xs text-success">+12.4%</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 group hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xs text-muted-foreground">Countries</span>
            </div>
            <p className="text-xl font-bold text-foreground">{countries}</p>
            <p className="text-xs text-success">Global</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 group hover:bg-muted/80 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xs text-muted-foreground">Data Today</span>
            </div>
            <p className="text-xl font-bold text-foreground">{dataToday}</p>
            <p className="text-xs text-success">+8.2%</p>
          </div>
        </div>

        {/* Mini chart placeholder */}
        <div className="h-16 bg-muted/30 rounded-xl flex items-end justify-around px-3 pb-2 gap-1">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
            <div
              key={i}
              className="w-full bg-primary/60 rounded-t transition-all duration-500 hover:bg-primary"
              style={{ 
                height: `${height}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating notification card */}
      <div
        className={`absolute -bottom-4 -left-8 bg-card border border-border/50 rounded-xl p-3 shadow-xl transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
            <span className="text-success text-sm">✓</span>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">New eSIM activated</p>
            <p className="text-xs text-muted-foreground">Germany • Just now</p>
          </div>
        </div>
      </div>

      {/* Floating stats card */}
      <div
        className={`absolute -top-4 -right-6 bg-card border border-border/50 rounded-xl p-3 shadow-xl transition-all duration-1000 delay-900 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Revenue</p>
            <p className="text-sm font-bold text-primary">+23.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(0.3);
  const parallaxOffsetSlow = useParallax(0.15);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Animated gradient mesh background */}
      <AnimatedGradientBg variant="mesh" />
      
      {/* Network pattern with parallax */}
      <div 
        className="absolute inset-0 network-pattern opacity-40"
        style={{ transform: `translateY(${parallaxOffsetSlow}px)` }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticle delay={0} size={6} initialX={10} initialY={20} />
        <FloatingParticle delay={1} size={4} initialX={85} initialY={15} />
        <FloatingParticle delay={2} size={8} initialX={70} initialY={60} />
        <FloatingParticle delay={0.5} size={5} initialX={25} initialY={70} />
        <FloatingParticle delay={1.5} size={6} initialX={90} initialY={80} />
        <FloatingParticle delay={2.5} size={4} initialX={5} initialY={50} />
      </div>

      {/* Gradient orbs with parallax */}
      <div 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div 
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-20">
          {/* Left: Content */}
          <div>
            {/* Badge with shimmer effect */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 badge-shimmer"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Reach new heights in global connectivity
              </span>
            </div>

            {/* Headline with radial glow */}
            <div className="headline-glow">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
              >
                The sky is
                <br />
                <span className="text-gradient">not the limit</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
            >
              Roaming & Management Wholesale Platform for eSIM Stores, Multi Country eSIM with worldwide coverage, White label service, Turnkey development of customized Wholesale Platforms and eSIM stores, and many other products and features.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button 
                size="lg" 
                variant="cta-glow" 
                className="group" 
                asChild
                onClick={() => trackCTAClick('Book a Free Demo', '/contact')}
              >
                <Link to="/contact">
                  Book a Free Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-shine" 
                asChild
                onClick={() => trackCTAClick('View solutions', '/solutions')}
              >
                <Link to="/solutions">View solutions</Link>
              </Button>
            </div>

            {/* Benefits */}
            <div
              className="flex flex-wrap gap-6 md:gap-10 pt-8 border-t border-border/50"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20 group-hover:scale-105">
                    <benefit.icon className="w-5 h-5 text-primary transition-transform icon-hover-bounce" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="hidden lg:block">
            <DashboardMockup isVisible={isVisible} />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
