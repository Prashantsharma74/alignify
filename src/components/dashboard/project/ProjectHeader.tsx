import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Share } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProjectHeaderProps {
  projectId: string | null;
  projectName: string;
  projectDescription: string;
  onSaveProject: (name: string, description: string) => Promise<void>;
  onShareProject: (email: string) => Promise<void>;
}

export const ProjectHeader = ({
  projectId,
  projectName,
  projectDescription,
  onSaveProject,
  onShareProject,
}: ProjectHeaderProps) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);

  // Update local state when props change
  useEffect(() => {
    setName(projectName);
    setDescription(projectDescription);
  }, [projectName, projectDescription]);

  const handleSave = async () => {
    try {
      await onSaveProject(name, description);
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error("Failed to save project");
    }
  };

  const handleShare = async () => {
    if (!shareEmail) {
      toast.error("Please enter an email address");
      return;
    }
    await onShareProject(shareEmail);
    setIsShareDialogOpen(false);
    setShareEmail("");
  };

  return (
    <div className="flex items-center gap-4">
      {projectId && (
        <h2 className="text-lg font-bold text-foreground">{projectName}</h2>
      )}
      
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-fit text-foreground"
          >
            {projectId ? "Edit Project" : "Save Project"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{projectId ? "Update Project" : "Save Project"}</DialogTitle>
            <DialogDescription>
              Enter project details below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>
              {projectId ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  disabled={!projectId}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share (available for a saved project)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Project</DialogTitle>
            <DialogDescription>
              Enter the email address of the user you want to share this project with
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleShare}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};