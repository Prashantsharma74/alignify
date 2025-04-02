interface TextComponentsProps {
  type: 'title';
  title?: string;
  style?: {
    fontFamily?: string;
    color?: string;
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
  width?: number;
  height?: number;
}

export const TextComponents = ({ type, title, style, width, height }: TextComponentsProps) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    color: style?.color || 'inherit',
    fontFamily: style?.fontFamily || 'Inter',
    fontSize: style?.fontSize || '16px',
    textAlign: style?.textAlign || 'left',
  } as const;

  return (
    <div style={containerStyle} className="w-full h-full flex items-center">
      <h2 className="font-bold w-full" style={{ fontSize: 'inherit' }}>{title || 'Header'}</h2>
    </div>
  );
};