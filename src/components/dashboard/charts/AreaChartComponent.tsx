import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

export const AreaChartComponent = ({ data, title, width, height, style }: ChartComponentProps) => {
  const chartColor = style?.colors?.[0] || '#8884d8';
  
  console.log('Area Chart Style:', style);
  console.log('Area Chart Color:', chartColor);
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {title && <h3 className="text-lg font-semibold mb-2" style={style}>{title}</h3>}
      <ResponsiveContainer width="100%" height={height - (title ? 40 : 0)}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5DEFF',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={chartColor}
            fill={chartColor}
            fillOpacity={0.3} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};