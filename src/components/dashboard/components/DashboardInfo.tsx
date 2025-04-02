import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardInfoSection } from "./info/DashboardInfoSection";
import { useDashboardInfo } from "./info/useDashboardInfo";

interface DashboardInfoProps {
  selectedScreen: string;
}

export const DashboardInfo = ({ selectedScreen }: DashboardInfoProps) => {
  const { content, setContent, isEditing, setIsEditing, handleSave } = useDashboardInfo(selectedScreen);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white/90 hover:bg-white">
          <Info className="h-4 w-4" />
          Dashboard Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dashboard Documentation</DialogTitle>
          <DialogDescription>
            Understanding the metrics and components
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? "Save Changes" : "Edit Content"}
              </Button>
            </div>

            <DashboardInfoSection
              title="Purpose"
              content={content.purpose}
              isEditing={isEditing}
              onChange={(value) => setContent({ ...content, purpose: value })}
            />
            
            <DashboardInfoSection
              title="Key Metrics"
              content={content.keyMetrics}
              isEditing={isEditing}
              onChange={(value) => setContent({ ...content, keyMetrics: value })}
            />

            <DashboardInfoSection
              title="Important Definitions"
              content={content.definitions}
              isEditing={isEditing}
              onChange={(value) => setContent({ ...content, definitions: value })}
            />

            <DashboardInfoSection
              title="Using the Dashboard"
              content={content.usage}
              isEditing={isEditing}
              onChange={(value) => setContent({ ...content, usage: value })}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};