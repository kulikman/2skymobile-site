import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "NEXILO transformed our operations. The AI solutions they provided reduced our processing time by 60% and improved accuracy significantly.",
      initials: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, DataFlow",
      content: "Working with NEXILO has been exceptional. Their team understood our needs and delivered a custom AI solution that exceeded our expectations.",
      initials: "MC",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Operations Director, GrowthLab",
      content: "The AI-powered insights have been game-changing. We're making better decisions faster, and our team efficiency has tripled.",
      initials: "EW",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our partners have to say about working with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
