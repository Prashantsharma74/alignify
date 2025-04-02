interface ResizeHandleProps {
  isSelected: boolean;
  onResizeStart: (e: React.MouseEvent) => void;
  type: string;
}

export const ResizeHandle = ({ isSelected, onResizeStart, type }: ResizeHandleProps) => {
  if (!isSelected || type === 'dropdown' || type === 'date-range') return null;

  return (
    <div
      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100"
      onMouseDown={onResizeStart}
      style={{
        background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
      }}
    />
  );
};