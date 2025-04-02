interface LineSeparatorResizeHandleProps {
  isSelected: boolean;
  onResizeStart: (e: React.MouseEvent) => void;
}

export const LineSeparatorResizeHandle = ({ isSelected, onResizeStart }: LineSeparatorResizeHandleProps) => {
  if (!isSelected) return null;

  return (
    <div
      className="absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full cursor-ew-resize -mt-1.5"
      onMouseDown={onResizeStart}
    />
  );
};