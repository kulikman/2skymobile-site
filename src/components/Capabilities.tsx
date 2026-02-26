import { Globe, Code, Smartphone, CreditCard, Bell, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
const capabilities = [{
  icon: Globe,
  title: "Multi-IMSI & Global Routing",
  description: "Connect to multiple carrier networks worldwide with intelligent routing and failover."
}, {
  icon: Code,
  title: "API-first Platform",
  description: "RESTful APIs for provisioning, activation, usage tracking and billing integration."
}, {
  icon: Smartphone,
  title: "Whitelabel eSIM Store",
  description: "Launch your branded eSIM storefront with customizable UI, pricing and plans."
}, {
  icon: CreditCard,
  title: "Billing & Settlement",
  description: "Operator-grade rating, invoicing, and automated settlement workflows."
}, {
  icon: Bell,
  title: "Automation & Alerts",
  description: "Real-time notifications, usage alerts, and automated provisioning triggers."
}, {
  icon: BarChart3,
  title: "AI Support 24/7",
  description: "Intelligent support automation designed for telecom operations. From first-line partner assistance to traffic analysis and issue detection."
}];
const Capabilities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <Section ref={sectionRef} className="relative">
      <SectionHeader
        title="Our Capabilities"
        subtitle="End-to-end solutions for modern telecom operations"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((capability, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl bg-card border border-border/50 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <capability.icon className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {capability.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {capability.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
export default Capabilities;