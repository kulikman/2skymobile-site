import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackCTAClick } from "@/lib/event-tracking";
import { AnimatedGradientBg } from "@/components/ui/animated-gradient-bg";
const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-background overflow-hidden"
    >
      {/* Aurora gradient background */}
      <AnimatedGradientBg variant="aurora" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Ready to get started?
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Launch your eSIM or MVNO service
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            2SkyMobile provides infrastructure, software and global data to help you scale fast.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button 
              size="lg" 
              variant="glow"
              className="group"
              onClick={() => trackCTAClick('Book a call', '/contact')}
              asChild
            >
              <Link to="/contact">
                Book a call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              asChild
              onClick={() => trackCTAClick('View all solutions', '/solutions')}
            >
              <Link to="/solutions">View all solutions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
