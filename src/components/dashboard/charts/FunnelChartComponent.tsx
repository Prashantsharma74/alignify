import { ResponsiveContainer } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';
import { FunnelChart, Funnel, LabelList, Cell } from 'recharts';

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#0EA5E9', '#1EAEDB'];

const generateDefaultData = () => [
  { name: 'Step 1', value: 400 },
  { name: 'Step 2', value: 300 },
  { name: 'Step 3', value: 200 }
];

export const FunnelChartComponent = ({ data, title, width, height, style }: ChartComponentProps) => {
  const funnelData = data?.length ? data : generateDefaultData();

  return (
    <div style={{ width, height }} className="relative">
      {title && <h3 className="text-lg font-semibold mb-2" style={style}>Title goes here</h3>}
      <ResponsiveContainer width="100%" height={height ? height - 40 : 300}>
        <FunnelChart>
          <Funnel
            data={funnelData}
            dataKey="value"
            nameKey="name"
            isAnimationActive
          >
            <LabelList
              position="right"
              fill="#888"
              stroke="none"
              dataKey="name"
              fontSize={12}
            />
            <LabelList
              position="center"
              fill="#fff"
              stroke="none"
              dataKey="value"
              fontSize={12}
            />
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};