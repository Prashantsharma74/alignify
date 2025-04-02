import React from 'react';

interface ResizeHandlesProps {
  isSelected: boolean;
  isLocked: boolean;
  onResizeStart: (e: React.MouseEvent, handle: string) => void;
}

export const ResizeHandles = ({ isSelected, isLocked, onResizeStart }: ResizeHandlesProps) => {
  if (!isSelected || isLocked) return null;

  return (
    <>
      <div 
        className="absolute -top-2 -left-2 w-4 h-4 bg-white border border-primary/20 rounded-full cursor-nw-resize z-20" 
        onMouseDown={(e) => onResizeStart(e, 'top-left')}
      />
      <div 
        className="absolute -top-2 -right-2 w-4 h-4 bg-white border border-primary/20 rounded-full cursor-ne-resize z-20"
        onMouseDown={(e) => onResizeStart(e, 'top-right')}
      />
      <div 
        className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border border-primary/20 rounded-full cursor-sw-resize z-20"
        onMouseDown={(e) => onResizeStart(e, 'bottom-left')}
      />
      <div 
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border border-primary/20 rounded-full cursor-se-resize z-20"
        onMouseDown={(e) => onResizeStart(e, 'bottom-right')}
      />
    </>
  );
};