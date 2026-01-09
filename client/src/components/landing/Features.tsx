import { motion } from "framer-motion";
import { Users, Zap, Layers, Share2, Palette, Lock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time collaboration",
    description: "Work together with your team in real-time. See cursors, edits, and changes as they happen.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description: "Smooth performance even with thousands of objects on your canvas. No lag, ever.",
  },
  {
    icon: Layers,
    title: "Infinite canvas",
    description: "Never run out of space. Zoom, pan, and explore your ideas without limits.",
  },
  {
    icon: Share2,
    title: "Easy sharing",
    description: "Share your boards with a single link. Control who can view or edit.",
  },
  {
    icon: Palette,
    title: "Beautiful templates",
    description: "Start with professionally designed templates or create your own from scratch.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description: "Enterprise-grade security with end-to-end encryption for all your data.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything you need to create
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that make brainstorming, designing, and planning a breeze.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-card rounded-2xl border border-border hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-[image:var(--gradient-hero)] transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
