import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

interface ExtendedChartProps extends ChartComponentProps {
  isVertical?: boolean;
}

export const BarChartComponent = ({ data, title, style, isVertical = true }: ExtendedChartProps) => {
  const chartColor = style?.colors?.[0] || '#8884d8';
  
  console.log('Bar Chart Style:', style);
  console.log('Bar Chart Color:', chartColor);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {title && <h3 className="text-lg font-semibold mb-2" style={style}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={isVertical ? 'vertical' : 'horizontal'}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type={isVertical ? "number" : "category"} 
            dataKey={isVertical ? "value" : "name"}
            height={40}
            tickMargin={10}
          />
          <YAxis 
            type={isVertical ? "category" : "number"} 
            dataKey={isVertical ? "name" : "value"}
            width={60}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5DEFF',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Bar dataKey="value" fill={chartColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};