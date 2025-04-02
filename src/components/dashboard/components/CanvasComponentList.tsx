import { CanvasComponent } from "@/types/dashboard";
import { CanvasItem } from "../CanvasItem";

interface CanvasComponentListProps {
  components: CanvasComponent[];
  selectedComponent: string | null;
  onSelect: (id: string | null) => void;
  onRemove: (e: React.MouseEvent, id: string) => void;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onUpdateComment: (id: string, comment: string) => void;
  onDuplicate: (component: CanvasComponent) => void;
  onAlign?: (direction: 'horizontal' | 'vertical') => void;
}

export const CanvasComponentList = ({
  components,
  selectedComponent,
  onSelect,
  onRemove,
  onMouseDown,
  onUpdateComment,
  onDuplicate,
  onAlign
}: CanvasComponentListProps) => {
  return (
    <div className="absolute inset-0">
      {components.map((component) => (
        <CanvasItem
          key={component.id}
          component={component}
          isSelected={selectedComponent === component.id}
          onSelect={onSelect}
          onRemove={onRemove}
          onMouseDown={onMouseDown}
          onUpdateComment={onUpdateComment}
          onDuplicate={onDuplicate}
          onAlign={onAlign}
        />
      ))}
    </div>
  );
};