import { Card, DonutChart, Title } from "@tremor/react";
import { ChartComponentProps } from "@/types/dashboard";

export const TremorDonutChartExample = ({ data, title, style }: ChartComponentProps) => {
  return (
    <Card className="w-full h-full">
      {title && <Title style={style}>{title}</Title>}
      <DonutChart
        className="h-[calc(100%-2rem)] mt-4"
        data={data}
        category="value"
        index="name"
        colors={style?.colors || ["blue", "cyan", "indigo"]}
        showAnimation={true}
      />
    </Card>
  );
};