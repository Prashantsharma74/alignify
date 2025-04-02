import { X } from "lucide-react";

interface RemoveButtonProps {
  isSelected: boolean;
  onRemove: (e: React.MouseEvent) => void;
}

export const RemoveButton = ({ isSelected, onRemove }: RemoveButtonProps) => {
  if (!isSelected) return null;

  return (
    <button
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20"
    >
      <X size={14} />
    </button>
  );
};