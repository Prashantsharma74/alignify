import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Screen } from "@/types/dashboard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ScreenTabsProps {
  screens: Screen[];
  selectedScreen: string;
  onSelectScreen: (id: string) => void;
  onEditScreen: (screen: Screen) => void;
  onRemoveScreen: (id: string) => void;
  onAddScreen: () => void;
}

export const ScreenTabs = ({
  screens,
  selectedScreen,
  onSelectScreen,
  onEditScreen,
  onRemoveScreen,
  onAddScreen,
}: ScreenTabsProps) => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [screenToRename, setScreenToRename] = useState<Screen | null>(null);
  const [newScreenName, setNewScreenName] = useState("");

  const handleRenameClick = (e: React.MouseEvent, screen: Screen) => {
    e.stopPropagation();
    setScreenToRename(screen);
    setNewScreenName(screen.name);
    setIsRenameDialogOpen(true);
  };

  const handleRenameSubmit = () => {
    if (screenToRename && newScreenName.trim()) {
      const updatedScreen = { ...screenToRename, name: newScreenName.trim() };
      onEditScreen(updatedScreen);
      setIsRenameDialogOpen(false);
      setScreenToRename(null);
      setNewScreenName("");
      toast.success("Dashboard renamed successfully");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {screens.map((screen) => (
          <div key={screen.id} className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant={selectedScreen === screen.id ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => onSelectScreen(screen.id)}
            >
              {screen.name}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => handleRenameClick(e, screen)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveScreen(screen.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={onAddScreen}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Dashboard</DialogTitle>
            <DialogDescription>
              Enter a new name for your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={newScreenName}
              onChange={(e) => setNewScreenName(e.target.value)}
              placeholder="Dashboard name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit();
                }
              }}
            />
            <Button onClick={handleRenameSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};