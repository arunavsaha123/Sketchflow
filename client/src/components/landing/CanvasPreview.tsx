import { motion } from "framer-motion";
import { MousePointer2, Square, Circle, Type, Minus, Pencil } from "lucide-react";

const CanvasPreview = () => {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Main canvas */}
      <div className="relative bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        {/* Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-background/95 backdrop-blur-sm rounded-xl p-2 shadow-soft border border-border">
          {[
            { icon: MousePointer2, label: "Select" },
            { icon: Square, label: "Rectangle" },
            { icon: Circle, label: "Circle" },
            { icon: Minus, label: "Line" },
            { icon: Pencil, label: "Draw" },
            { icon: Type, label: "Text" },
          ].map((tool, index) => (
            <motion.button
              key={tool.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className={`p-2.5 rounded-lg transition-colors ${
                index === 0 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tool.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>
        
        {/* Canvas area with grid */}
        <div className="aspect-[16/10] bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] relative">
          {/* Animated shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-[20%] left-[15%] w-32 h-24 rounded-xl border-2 border-primary bg-primary/5"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute top-[35%] left-[40%] w-20 h-20 rounded-full border-2 border-accent bg-accent/5"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute top-[25%] right-[20%] w-40 h-28 rounded-xl border-2 border-secondary bg-secondary/5"
          />
          
          {/* Connecting line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              x1="27%"
              y1="38%"
              x2="45%"
              y2="45%"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              x1="55%"
              y1="45%"
              x2="70%"
              y2="38%"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>
          
          {/* Sticky note */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute bottom-[20%] left-[25%] w-36 p-4 bg-[hsl(50,100%,85%)] rounded-lg shadow-soft"
          >
            <p className="text-sm font-medium text-secondary">Brainstorm ideas here ✨</p>
          </motion.div>
          
          {/* Cursor indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ delay: 1.6, duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute top-[60%] right-[30%] flex items-center gap-1"
          >
            <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <MousePointer2 className="w-3 h-3 text-accent-foreground" />
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded-full">Alex</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -8, 0], y: [0, 8, 0] }}
            transition={{ delay: 1.8, duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute top-[40%] left-[55%] flex items-center gap-1"
          >
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <MousePointer2 className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">Sam</span>
          </motion.div>
        </div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-[image:var(--gradient-accent)] shadow-card flex items-center justify-center"
      >
        <Circle className="w-8 h-8 text-accent-foreground" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl bg-[image:var(--gradient-dark)] shadow-card flex items-center justify-center"
      >
        <Square className="w-6 h-6 text-secondary-foreground" />
      </motion.div>
    </div>
  );
};

export default CanvasPreview;
