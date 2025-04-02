import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

interface TargetChartComponentProps {
  data: any[];
  title?: string;
  width?: number;
  height?: number;
  style?: {
    fontFamily?: string;
    color?: string;
    fontSize?: string;
  };
}

export const TargetChartComponent = ({ data, title, width, height, style }: TargetChartComponentProps) => {
  return (
    <div className="w-[400px] h-[300px]" style={{ 
      width: width ? `${width}px` : '400px',
      height: height ? `${height}px` : '300px'
    }}>
      {title && <h3 className="text-lg font-semibold mb-2" style={style}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
          <ReferenceLine y={0} stroke="#000" />
          <Line type="monotone" dataKey="target" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};