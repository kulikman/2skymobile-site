import { Award, Layers, Network, Headphones } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { Heading, Text } from "@/components/ui/typography";

const benefits = [
  {
    icon: Award,
    title: "14+ Years of Telecom Expertise",
    description:
      "We work exclusively with telecom and connectivity products. Wholesale data, eSIM, MVNO/MVNE models, IMSI sponsorship, billing, roaming agreements — this is our daily practice, not theory. Partners choose us because we understand how telecom really works behind the scenes.",
  },
  {
    icon: Layers,
    title: "Flexible Business Models",
    description:
      "We adapt to your business, not the other way around. Whether you need wholesale data supply, a white-label eSIM store, custom software, or full operational support — we structure solutions around your scale, geography, and financial model.",
  },
  {
    icon: Network,
    title: "Strong Partner Network",
    description:
      "We collaborate with mobile operators, traffic aggregators, technology vendors, and regional partners across multiple markets. This allows us to secure competitive pricing, reliable coverage, and fast deployment without long onboarding cycles.",
  },
  {
    icon: Headphones,
    title: "Speed, Transparency, and Support",
    description:
      "We value long-term partnerships built on trust. Clear pricing, fast responses, dedicated account management, and technical support that actually understands telecom operations — this is why partners stay with us and grow together.",
  },
];

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} background="default" padding="default">
      <div className="container mx-auto px-4 lg:px-6">
        <SectionHeader
          title="Why companies choose 2SkyMobile"
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              variant="flat"
              padding="lg"
              enableTilt
              enableGlow
              className={`transition-all duration-700 hover:shadow-md hover:border-primary/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <IconBox icon={benefit.icon} size="xl" className="mb-5" />
              <Heading level={3} className="mb-3">
                {benefit.title}
              </Heading>
              <Text size="sm" variant="muted">
                {benefit.description}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;
