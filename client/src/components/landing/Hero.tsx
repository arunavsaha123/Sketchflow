import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import CanvasPreview from "./CanvasPreview";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom"


const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Now with real-time collaboration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Where ideas take
            <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent"> shape</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            The infinite canvas for teams to brainstorm, design, and bring ideas to life.
            Simple, intuitive, and incredibly powerful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <SignedOut>
              <Button variant="hero" size="xl">
                Start creating free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button variant="hero" size="xl">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </SignedIn>

            <Button variant="heroOutline" size="xl">
              Watch demo
            </Button>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <CanvasPreview />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
