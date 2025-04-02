import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Screen } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { ComponentRenderer } from "../renderers/ComponentRenderer";
import { toast } from "sonner";

interface FullscreenModeProps {
  screens: Screen[];
  selectedScreen: string;
  onSelectScreen: (id: string) => void;
  onClose: () => void;
  backgroundColor?: string;
}

export const FullscreenMode = ({
  screens,
  selectedScreen,
  onSelectScreen,
  onClose,
  backgroundColor = "#FFFFFF"
}: FullscreenModeProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      toast.error("Failed to toggle fullscreen mode");
    }
  };

  const handleClose = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
      onClose();
    } catch (error) {
      console.error('Error closing fullscreen:', error);
      // If exitFullscreen fails, still try to close the view
      setIsFullscreen(false);
      onClose();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 bg-white/90 hover:bg-white"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </Button>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                {screens.map((screen) => (
                  <Button
                    key={screen.id}
                    variant={selectedScreen === screen.id ? "default" : "outline"}
                    className="whitespace-nowrap"
                    onClick={() => onSelectScreen(screen.id)}
                  >
                    {screen.name}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div 
              className={cn(
                "flex-1 overflow-auto p-6",
                isFullscreen ? "bg-[url('/placeholder.svg')] bg-repeat bg-[length:50px_50px]" : ""
              )}
              style={{ backgroundColor }}
            >
              {screens.map((screen) => (
                <div
                  key={screen.id}
                  className={cn(
                    "relative h-full w-full transition-opacity duration-200",
                    selectedScreen === screen.id ? "opacity-100" : "hidden opacity-0"
                  )}
                >
                  {screen.components.map((component) => (
                    <div
                      key={component.id}
                      className="absolute"
                      style={{
                        left: `${component.position.x}px`,
                        top: `${component.position.y}px`,
                        width: `${component.width}px`,
                        height: `${component.height}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <ComponentRenderer
                        component={component}
                        width={component.width || 200}
                        height={component.height || 200}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};