import { Button } from "@/components/ui/button";
import { FullscreenMode } from "@/components/dashboard/components/FullscreenMode";
import { DashboardInfo } from "@/components/dashboard/components/DashboardInfo";
import { Screen } from "@/types/dashboard";

interface ScreenActionsProps {
  screens: Screen[];
  selectedScreen: string;
  onSelectScreen: (id: string) => void;
  backgroundColor?: string;
}

export const ScreenActions = ({
  screens,
  selectedScreen,
  onSelectScreen,
  backgroundColor,
}: ScreenActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <FullscreenMode
        screens={screens}
        selectedScreen={selectedScreen}
        onSelectScreen={onSelectScreen}
        onClose={() => {}}
        backgroundColor={backgroundColor}
      />
      <DashboardInfo selectedScreen={selectedScreen} />
    </div>
  );
};