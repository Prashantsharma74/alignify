interface RotationHandleProps {
  isSelected: boolean;
  onRotateStart: (e: React.MouseEvent) => void;
}

export const RotationHandle = ({ isSelected, onRotateStart }: RotationHandleProps) => {
  if (!isSelected) return null;

  return (
    <div
      className="absolute -bottom-4 left-1/2 w-3 h-3 bg-primary rounded-full cursor-grab -ml-1.5"
      onMouseDown={onRotateStart}
    />
  );
};