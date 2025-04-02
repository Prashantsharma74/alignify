interface LineSeparatorProps {
  width: number;
  rotation?: number;
  style?: {
    color?: string;
  };
}

export const LineSeparator = ({ width, rotation = 0, style }: LineSeparatorProps) => {
  return (
    <div 
      className="relative w-full h-1 group"
      style={{ 
        width: `${width}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ 
          backgroundColor: style?.color || '#e5e7eb',
        }}
      />
      <div className="absolute inset-y-0 -inset-x-2 bg-transparent cursor-move" />
    </div>
  );
};