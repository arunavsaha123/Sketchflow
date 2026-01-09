import { Pencil } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[image:var(--gradient-hero)] flex items-center justify-center">
              <Pencil className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Sketchflow</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 Sketchflow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
