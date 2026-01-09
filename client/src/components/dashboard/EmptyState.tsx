import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNew: () => void;
}

export const EmptyState = ({ onCreateNew }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-muted-foreground" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-3xl"
        />
      </div>
      
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">
        No boards yet
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Create your first whiteboard to start collaborating and bringing your ideas to life.
      </p>
      
      <Button onClick={onCreateNew} className="gap-2">
        <Plus className="w-4 h-4" />
        Create your first board
      </Button>
    </motion.div>
  );
};
