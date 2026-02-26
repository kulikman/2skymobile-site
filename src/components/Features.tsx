import { useRef, useState, useEffect } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { Zap, Route, Activity, Calculator, BellRing, RefreshCw } from "lucide-react";
// Import feature images
import esimProvisioningImg from "@/assets/features/esim-provisioning.jpg";
import networkRoutingImg from "@/assets/features/network-routing.jpg";
import usageTrackingImg from "@/assets/features/usage-tracking.jpg";
import automatedBillingImg from "@/assets/features/automated-billing.jpg";
import smartAlertsImg from "@/assets/features/smart-alerts.jpg";
import autoRenewalImg from "@/assets/features/auto-renewal.jpg";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Instant eSIM Provisioning",
      description: "Automatic eSIM profile activation in seconds. No manual operations — the API handles everything.",
      image: esimProvisioningImg,
    },
    {
      icon: Route,
      title: "Intelligent Network Routing",
      description: "Smart traffic routing: auto-selection of the best carrier by price, quality, and coverage.",
      image: networkRoutingImg,
    },
    {
      icon: Activity,
      title: "Real-time Usage Tracking",
      description: "Monitor data usage in real-time. Get alerts when limits are exceeded or anomalies detected.",
      image: usageTrackingImg,
    },
    {
      icon: Calculator,
      title: "Automated Billing & Rating",
      description: "Automatic cost calculation, invoice generation, and carrier reconciliation.",
      image: automatedBillingImg,
    },
    {
      icon: BellRing,
      title: "Smart Alerts & Notifications",
      description: "Automated notifications: low balance, profile expiry, unusual usage patterns.",
      image: smartAlertsImg,
    },
    {
      icon: RefreshCw,
      title: "Auto-Renewal & Top-up",
      description: "Automatic plan renewals and balance top-ups without customer intervention.",
      image: autoRenewalImg,
    },
  ];

  return (
    <Section 
      ref={sectionRef}
      id="features" 
      background="muted" 
      padding="default"
    >
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            title="Automate Your Telecom Operations"
            subtitle="Reduce manual work and scale faster with intelligent automation built for eSIM and mobile data businesses."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
            >
              <Card variant="interactive" className="h-full overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <IconBox icon={feature.icon} size="md" className="mb-3" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6">
                  {feature.description}
                </CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
