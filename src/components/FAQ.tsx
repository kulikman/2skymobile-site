import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to implement an AI solution?",
      answer: "Implementation time varies based on complexity, but most projects are deployed within 4-8 weeks. We work closely with your team to ensure minimal disruption to your operations.",
    },
    {
      question: "Do I need technical expertise to use your AI solutions?",
      answer: "Not at all. Our solutions are designed to be user-friendly and intuitive. We provide comprehensive training and ongoing support to ensure your team can leverage the AI tools effectively.",
    },
    {
      question: "Can your AI solutions integrate with our existing systems?",
      answer: "Yes! We specialize in seamless integration with popular tools like Slack, Notion, Gmail, Google Sheets, and many more. Our team will work with your existing infrastructure.",
    },
    {
      question: "What kind of support do you provide after deployment?",
      answer: "We offer ongoing support, regular optimization, and scaling assistance. Most of our clients continue working with us long-term to ensure their AI solutions evolve with their business needs.",
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "Data security is our top priority. We implement industry-standard encryption, comply with GDPR and other regulations, and ensure your data remains private and secure throughout the entire process.",
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. Find out more about our AI solutions and services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
