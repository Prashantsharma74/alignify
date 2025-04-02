import React, { useState, useRef, useEffect } from 'react';
import { ComponentRenderer } from './renderers/ComponentRenderer';
import { CanvasComponent } from '@/types/dashboard';
import { ComponentMenu } from './components/ComponentMenu';
import { ResizeHandles } from './components/ResizeHandles';
import { Lock } from 'lucide-react';

interface CanvasItemProps {
  component: CanvasComponent;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (e: React.MouseEvent, id: string) => void;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onUpdateComment?: (id: string, comment: string) => void;
  onDuplicate?: (component: CanvasComponent) => void;
  onAlign?: (direction: 'horizontal' | 'vertical') => void;
}

export const CanvasItem: React.FC<CanvasItemProps> = ({
  component,
  isSelected,
  onSelect,
  onRemove,
  onMouseDown,
  onUpdateComment,
  onDuplicate,
  onAlign,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const [size, setSize] = useState({ 
    width: component.width || 200, 
    height: component.height || 200 
  });
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setActiveHandle(handle);
    initialMousePos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = { ...size };
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - initialMousePos.current.x;
    const dy = e.clientY - initialMousePos.current.y;

    let newWidth = initialSize.current.width;
    let newHeight = initialSize.current.height;

    switch (activeHandle) {
      case 'top-left':
        newWidth = initialSize.current.width - dx;
        newHeight = initialSize.current.height - dy;
        break;
      case 'top-right':
        newWidth = initialSize.current.width + dx;
        newHeight = initialSize.current.height - dy;
        break;
      case 'bottom-left':
        newWidth = initialSize.current.width - dx;
        newHeight = initialSize.current.height + dy;
        break;
      case 'bottom-right':
        newWidth = initialSize.current.width + dx;
        newHeight = initialSize.current.height + dy;
        break;
    }

    // Enforce minimum size
    newWidth = Math.max(50, newWidth);
    newHeight = Math.max(50, newHeight);

    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    if (isResizing) {
      setIsResizing(false);
      setActiveHandle(null);
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing]);

  const isLockedComponent = ['geomap', 'heatmap', 'donut'].includes(component.type);

  const containerStyle = {
    position: 'absolute' as const,
    left: component.position.x,
    top: component.position.y,
    transform: `translate(-50%, -50%)`,
    width: size.width,
    height: size.height,
    zIndex: isSelected ? 10 : 1,
    cursor: isResizing ? 'se-resize' : 'move',
  };

  return (
    <div
      style={containerStyle}
      onClick={() => onSelect(component.id)}
      onMouseDown={(e) => !isResizing && onMouseDown(e, component.id)}
      className={`relative group ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      {isSelected && (
        <ComponentMenu
          component={component}
          onRemove={(e) => onRemove(e, component.id)}
          onDuplicate={onDuplicate}
          onUpdateComment={onUpdateComment}
        />
      )}

      <ComponentRenderer 
        component={component}
        width={size.width}
        height={size.height}
      />

      {isLockedComponent && (
        <div className="absolute top-4 left-4 flex items-center gap-2 text-gray-400">
          <Lock className="w-4 h-4" />
          <span className="text-sm">This feature is locked</span>
        </div>
      )}

      <ResizeHandles
        isSelected={isSelected}
        isLocked={isLockedComponent}
        onResizeStart={handleResizeStart}
      />
    </div>
  );
};