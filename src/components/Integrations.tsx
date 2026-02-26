import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slack, FileText, Mail, Table2, MessageCircle, Twitter } from "lucide-react";

const Integrations = () => {
  const integrations = [
    {
      icon: Slack,
      name: "Slack",
      description: "Seamless team communication and real AI-powered responses through Slack integration.",
    },
    {
      icon: FileText,
      name: "Notion",
      description: "Generate meeting notes, summaries, and structured content with AI embedded directly into Notion.",
    },
    {
      icon: Mail,
      name: "Gmail",
      description: "Draft, sort, and prioritize emails faster using AI-powered insights via Gmail integration.",
    },
    {
      icon: Table2,
      name: "Google Sheets",
      description: "Automate data analysis, forecasting, and reporting with AI-enhanced Google Sheets workflows.",
    },
    {
      icon: MessageCircle,
      name: "Reddit",
      description: "Monitor discussions and engage with communities using AI-powered sentiment analysis.",
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      description: "Manage social presence and generate content with AI assistance for better engagement.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Seamlessly Integrate With the Tools You Already Use
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect your existing workflows with powerful AI capabilities. Whether it's Notion, Google Workspace, Slack, or Twitter, our solutions integrate effortlessly—keeping your data unified.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <integration.icon className="w-12 h-12 text-primary mb-2" />
                <CardTitle>{integration.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {integration.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
