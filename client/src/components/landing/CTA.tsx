import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Free forever for personal use",
  "No credit card required",
  "Export to PDF, PNG, SVG",
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[image:var(--gradient-hero)] opacity-10 blur-3xl rounded-full" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams who use Sketchflow to collaborate, plan, and create together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button variant="hero" size="xl">
            Get started for free
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
