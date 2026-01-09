import { motion } from "framer-motion";
import { MoreHorizontal, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export interface Board {
  id: string;
  title: string;
  thumbnail: string;
  lastEdited: string;
  collaborators: number;
  isFavorite: boolean;
}

interface BoardCardProps {
  board: Board;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const BoardCard = ({ board, onToggleFavorite, onDelete, onDuplicate }: BoardCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/whiteboard/${board.id}`}>
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300">
          {/* Thumbnail */}
          <div 
            className="aspect-video bg-muted relative overflow-hidden"
            style={{
              background: board.thumbnail || 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)'
            }}
          >
            {/* Decorative shapes to simulate canvas content */}
            <div className="absolute inset-0 p-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 absolute top-4 left-4" />
              <div className="w-8 h-8 rounded-full bg-accent/20 absolute top-8 right-8" />
              <div className="w-16 h-6 rounded bg-secondary/10 absolute bottom-6 left-1/3" />
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200" />
          </div>
          
          {/* Card content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-foreground truncate flex-1">
                {board.title}
              </h3>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(board.id);
                  }}
                >
                  <Star 
                    className={`w-4 h-4 ${board.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                  />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.preventDefault()}
                    >
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDuplicate(board.id);
                    }}>
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite(board.id);
                    }}>
                      {board.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(board.id);
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{board.lastEdited}</span>
              </div>
              {board.collaborators > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{board.collaborators}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
