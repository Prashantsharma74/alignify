import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ElementsTab } from "./components/panel/ElementsTab";
import { DesignTab } from "./components/panel/DesignTab";

interface ComponentPanelProps {
  onBackgroundColorChange?: (color: string) => void;
  currentBackgroundColor?: string;
  screens?: Array<{ id: string; name: string; backgroundColor: string }>;
  onPaletteChange?: (colors: string[]) => void;
}

export const ComponentPanel = ({ 
  onBackgroundColorChange,
  currentBackgroundColor = "#FFFFFF",
  onPaletteChange
}: ComponentPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("elements");

  return (
    <div className="h-full flex flex-col bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="p-4 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="elements" className="flex-1">Elements</TabsTrigger>
            <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="elements" className="flex-1">
          <ElementsTab 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>

        <TabsContent value="design" className="flex-1">
          <DesignTab 
            onBackgroundColorChange={onBackgroundColorChange}
            currentBackgroundColor={currentBackgroundColor}
            onPaletteChange={onPaletteChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};