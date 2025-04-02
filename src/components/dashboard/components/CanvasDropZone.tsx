import { CanvasComponent } from "@/types/dashboard";
import { toast } from "sonner";

interface CanvasDropZoneProps {
  onDrop: (component: CanvasComponent) => void;
  width: number;
  height: number;
  children: React.ReactNode;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const CanvasDropZone = ({ 
  onDrop, 
  width, 
  height, 
  children,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  backgroundColor = "#FFFFFF",
  style
}: CanvasDropZoneProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    const rect = e.currentTarget.getBoundingClientRect();
    const dropWidth = componentType === 'date-range' ? 200 : 400;
    const dropHeight = componentType === 'date-range' ? 100 : 300;
    
    const position = {
      x: Math.min(Math.max(dropWidth / 2, e.clientX - rect.left), width - dropWidth / 2),
      y: Math.min(Math.max(dropHeight / 2, e.clientY - rect.top), height - dropHeight / 2)
    };

    let chartData;
    if (componentType === 'scorecard') {
      chartData = [{
        name: 'Current',
        value: 118400,
        change: 40700,
        changePeriod: 'vs Pre Month'
      }];
    } else if (componentType === 'heatmap') {
      chartData = Array.from({ length: 25 }, (_, i) => ({
        x: (i % 5) + 1,
        y: Math.floor(i / 5) + 1,
        value: Math.floor(Math.random() * 100),
        name: `Cell ${Math.floor(i / 5) + 1}-${(i % 5) + 1}`
      }));
    } else if (componentType === 'donut') {
      chartData = [
        { name: 'Category A', value: 400 },
        { name: 'Category B', value: 300 },
        { name: 'Category C', value: 200 },
        { name: 'Category D', value: 100 }
      ];
    } else if (componentType === 'geomap') {
      chartData = [
        { lat: 40.7128, lng: -74.0060, value: 100, name: "New York" },
        { lat: 51.5074, lng: -0.1278, value: 80, name: "London" },
        { lat: 35.6762, lng: 139.6503, value: 90, name: "Tokyo" }
      ];
    } else {
      chartData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 200 },
        { name: 'Apr', value: 278 },
        { name: 'May', value: 189 }
      ];
    }

    const newComponent: CanvasComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      position,
      title: componentType === 'title' ? 'Header' : `My ${componentType}`,
      width: dropWidth,
      height: dropHeight,
      style: {
        color: '#000000',
        fontFamily: 'Inter',
        fontSize: '16px',
        textAlign: 'left' as const
      },
      data: chartData,
      options: componentType === 'dropdown' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
      dateRange: componentType === 'date-range' ? { start: '', end: '' } : undefined,
    };

    onDrop(newComponent);
    toast("Component added to canvas");
  };

  return (
    <div 
      className="relative bg-[url('/placeholder.svg')] bg-repeat bg-[length:50px_50px]"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor,
        ...style
      }}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor }}
      >
        {children}
      </div>
    </div>
  );
};