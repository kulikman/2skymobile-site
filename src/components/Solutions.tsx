import { Globe, Smartphone, SlidersHorizontal, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { Heading, Text } from "@/components/ui/typography";


const solutions = [
  {
    icon: Globe,
    title: "Wholesale Mobile Data",
    description:
      "Global mobile data for MVNOs, resellers and digital brands. Multi-IMSI, multi-network, coverage in 190+ countries.",
    href: "/solutions/wholesale-mobile-data",
  },
  {
    icon: Smartphone,
    title: "White-Label eSIM Store",
    description:
      "A fully customizable eSIM store — web, app, admin panel, API. Launch your digital eSIM business in days.",
    href: "/solutions/white-label-esim",
  },
  {
    icon: SlidersHorizontal,
    title: "Telecom Software Development",
    description:
      "Custom telecom solutions: OSS/BSS systems, network integration, customer portals and automation platforms.",
    href: "/development/telecom-software",
  },
  {
    icon: Lightbulb,
    title: "Telecom Consulting",
    description:
      "Expert guidance to boost your telecom ROI. Strategic consulting from industry veterans.",
    href: "/solutions/consulting",
  },
];

const Solutions = () => {
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
    <Section ref={sectionRef} id="solutions" background="muted" padding="default">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeader
          title="Telecom solutions built for scale"
          subtitle="Everything you need to launch, operate and grow modern eSIM and mobile data services."
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        {/* Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              to={solution.href}
              className={`group block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <Card
                variant="interactive"
                padding="lg"
                className="h-full"
                enableTilt
                enableGlow
              >
                <IconBox 
                  icon={solution.icon} 
                  size="lg" 
                  className="mb-5 transition-all duration-300 group-hover:scale-105" 
                />
                <Heading level={3} className="mb-3">
                  {solution.title}
                </Heading>
                <Text size="sm" variant="muted" className="mb-4">
                  {solution.description}
                </Text>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Solutions;
