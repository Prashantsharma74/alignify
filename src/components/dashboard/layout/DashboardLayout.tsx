import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ComponentPanel } from "@/components/dashboard/ComponentPanel";
import { Canvas } from "@/components/dashboard/Canvas";
import { PropertiesPanel } from "@/components/dashboard/PropertiesPanel";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screen } from "@/types/dashboard";

interface DashboardLayoutProps {
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  components: any[];
  setComponents: (components: any[]) => void;
  isPropertiesOpen: boolean;
  setIsPropertiesOpen: (open: boolean) => void;
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor?: string;
  onBackgroundColorChange?: (color: string) => void;
  screens?: Screen[];
  onPaletteChange?: (colors: string[]) => void;
}

export const DashboardLayout = ({
  selectedComponent,
  setSelectedComponent,
  components,
  setComponents,
  isPropertiesOpen,
  setIsPropertiesOpen,
  canvasWidth,
  canvasHeight,
  backgroundColor,
  onBackgroundColorChange,
  screens,
  onPaletteChange,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-[800px] rounded-lg border bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <ComponentPanel 
            onBackgroundColorChange={onBackgroundColorChange} 
            currentBackgroundColor={backgroundColor}
            screens={screens}
            onPaletteChange={onPaletteChange}
          />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={isPropertiesOpen ? 60 : 80}>
          <Canvas
            components={components}
            setComponents={setComponents}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            width={canvasWidth}
            height={canvasHeight}
            backgroundColor={backgroundColor}
          />
        </ResizablePanel>
        
        {isPropertiesOpen && <ResizableHandle />}
        
        {isPropertiesOpen && (
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="flex h-full">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-full border-r"
                onClick={() => setIsPropertiesOpen(false)}
              >
                <PanelRightClose className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <PropertiesPanel
                  selectedComponent={selectedComponent ? components.find(c => c.id === selectedComponent) : null}
                  onUpdateProperties={(properties) => {
                    setComponents(components.map((component) =>
                      component.id === selectedComponent ? { ...component, ...properties } : component
                    ));
                  }}
                  onRemoveComponent={(id) => {
                    setComponents(components.filter(component => component.id !== id));
                    setSelectedComponent(null);
                  }}
                />
              </div>
            </div>
          </ResizablePanel>
        )}
        
        {!isPropertiesOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 border-l bg-background"
            onClick={() => setIsPropertiesOpen(true)}
          >
            <PanelRightOpen className="h-4 w-4" />
          </Button>
        )}
      </ResizablePanelGroup>
    </div>
  );
};