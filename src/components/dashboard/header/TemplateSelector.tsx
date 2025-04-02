import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { templates } from "@/data/dashboardTemplates";
import { Lock } from "lucide-react";

interface TemplateSelectorProps {
  onSelectTemplate: (templateName: string) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choose a Template</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Select a template to get started with your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(templates).map(([name, template]) => (
            <Button
              key={name}
              variant="outline"
              className="flex items-start p-4 h-auto"
              onClick={() => onSelectTemplate(name)}
              disabled={name !== "Sales Dashboard"}
            >
              <div className="flex flex-col items-start text-left space-y-2 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{template.icon}</span>
                    <span className="font-semibold">{name}</span>
                  </div>
                  {name !== "Sales Dashboard" && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};