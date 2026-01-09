import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[image:var(--gradient-hero)] flex items-center justify-center">
            <Pencil className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">Sketchflow</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Features</a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Pricing</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Sign in</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
