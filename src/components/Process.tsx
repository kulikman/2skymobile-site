import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discover & Assess",
      description: "We analyze your business needs and identify opportunities for AI integration.",
    },
    {
      number: "02",
      title: "Design AI Strategy",
      description: "Develop tailored solutions that align with your goals and technical capabilities.",
    },
    {
      number: "03",
      title: "Implement & Integrate",
      description: "Seamlessly deploy AI into your existing systems with minimal disruption.",
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description: "Monitor results, iterate, and expand AI capabilities as your business grows.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From Strategy to AI Success
          </h2>
          <p className="text-lg text-muted-foreground">
            We streamline the AI adoption journey with a clear, proven process — designed to ensure alignment, speed, and measurable outcomes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="text-6xl font-bold text-primary/20 absolute top-4 right-4">
                  {step.number}
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
