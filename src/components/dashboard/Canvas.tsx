import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { CanvasComponent } from "@/types/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CanvasDropZone } from "./components/CanvasDropZone";
import { CanvasEmptyState } from "./components/CanvasEmptyState";
import { CanvasComponentList } from "./components/CanvasComponentList";
import { FeedbackButton } from "./components/FeedbackButton";

interface CanvasProps {
  components: CanvasComponent[];
  setComponents: (components: CanvasComponent[]) => void;
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export const Canvas = ({ 
  components, 
  setComponents, 
  selectedComponent, 
  setSelectedComponent, 
  width = 1920, 
  height = 1080,
  backgroundColor = "#FFFFFF"
}: CanvasProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

  const handleDrop = (newComponent: CanvasComponent) => {
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && draggedComponent) {
      const rect = e.currentTarget.getBoundingClientRect();
      const component = components.find(c => c.id === draggedComponent);
      
      if (component) {
        const position = {
          x: Math.min(Math.max(component.width! / 2, e.clientX - rect.left), rect.width - component.width! / 2),
          y: Math.min(Math.max(component.height! / 2, e.clientY - rect.top), rect.height - component.height! / 2)
        };

        setComponents(components.map(c => 
          c.id === draggedComponent
            ? { ...c, position }
            : c
        ));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedComponent(null);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDraggedComponent(id);
    }
  };

  const handleRemoveComponent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setComponents(components.filter(component => component.id !== id));
    setSelectedComponent(null);
    toast("Component removed from canvas");
  };

  const handleUpdateComment = (id: string, comment: string) => {
    setComponents(components.map(component =>
      component.id === id ? { ...component, comment } : component
    ));
  };

  const handleDuplicate = (newComponent: CanvasComponent) => {
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const handleAlign = (direction: 'horizontal' | 'vertical') => {
    if (!selectedComponent) return;
    
    const selectedComp = components.find(c => c.id === selectedComponent);
    if (!selectedComp) return;

    const updatedComponents = components.map(component => {
      if (component.id === selectedComponent) {
        const newPosition = { ...component.position };
        if (direction === 'horizontal') {
          newPosition.y = height / 2;
        } else {
          newPosition.x = width / 2;
        }
        return { ...component, position: newPosition };
      }
      return component;
    });

    setComponents(updatedComponents);
    toast(`Component aligned ${direction}ly`);
  };

  return (
    <ScrollArea className="h-full w-full">
      <CanvasDropZone
        width={width}
        height={height}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        backgroundColor={backgroundColor}
        style={{ backgroundColor }}
      >
        {components.length === 0 && <CanvasEmptyState />}
        <CanvasComponentList
          components={components}
          selectedComponent={selectedComponent}
          onSelect={setSelectedComponent}
          onRemove={handleRemoveComponent}
          onMouseDown={handleMouseDown}
          onUpdateComment={handleUpdateComment}
          onDuplicate={handleDuplicate}
          onAlign={handleAlign}
        />
      </CanvasDropZone>
      <FeedbackButton />
    </ScrollArea>
  );
};