import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

export const GaugeChartComponent = ({ data, title, width, height, style }: ChartComponentProps) => {
  const value = data?.[0]?.value || 0;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  const gaugeData = [
    { value: normalizedValue },
    { value: 100 - normalizedValue },
  ];

  const colors = ['#8884d8', '#f3f4f6'];

  return (
    <div style={{ 
      width: width ? `${width}px` : '400px',
      height: height ? `${height}px` : '300px',
      fontFamily: style?.fontFamily,
      color: style?.color,
      fontSize: style?.fontSize
    }}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={gaugeData}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold"
            fill={style?.color || '#000'}
          >
            {normalizedValue}%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};