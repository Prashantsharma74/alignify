import { Card, LineChart, Title } from "@tremor/react";
import { ChartComponentProps } from "@/types/dashboard";

export const TremorLineChartExample = ({ data, title, style }: ChartComponentProps) => {
  return (
    <Card className="w-full h-full">
      {title && <Title style={style}>{title}</Title>}
      <LineChart
        className="h-[calc(100%-2rem)] mt-4"
        data={data}
        index="name"
        categories={["value"]}
        colors={style?.colors || ["blue"]}
        curveType="monotone"
        showAnimation={true}
      />
    </Card>
  );
};