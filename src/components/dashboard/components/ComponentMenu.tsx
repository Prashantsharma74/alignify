import { Button } from "@/components/ui/button";
import { Copy, Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { CanvasComponent } from "@/types/dashboard";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface ComponentMenuProps {
  component: CanvasComponent;
  onRemove: (e: React.MouseEvent) => void;
  onDuplicate?: (component: CanvasComponent) => void;
  onUpdateComment?: (id: string, comment: string) => void;
}

export const ComponentMenu = ({ 
  component, 
  onRemove, 
  onDuplicate,
  onUpdateComment 
}: ComponentMenuProps) => {
  const [comment, setComment] = useState(component.comment || "");
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDuplicate) {
      const duplicatedComponent = {
        ...component,
        id: `${component.id}-copy-${Date.now()}`,
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      };
      onDuplicate(duplicatedComponent);
      toast("Component duplicated");
    }
  };

  const handleCommentSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateComment) {
      onUpdateComment(component.id, comment);
      setIsCommentOpen(false);
      toast("Comment updated");
    }
  };

  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="icon"
        className="h-6 w-6 bg-white shadow"
        onClick={handleDuplicate}
      >
        <Copy className="h-4 w-4" />
      </Button>
      {onUpdateComment && (
        <Popover open={isCommentOpen} onOpenChange={setIsCommentOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 bg-white shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare 
                className="h-4 w-4" 
                fill={component.comment ? "red" : "none"}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              <h4 className="font-medium">Add Comment</h4>
              <Input
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button size="sm" onClick={handleCommentSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
      <Button 
        variant="ghost" 
        size="icon"
        className="h-6 w-6 bg-white shadow"
        onClick={(e) => onRemove(e)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};