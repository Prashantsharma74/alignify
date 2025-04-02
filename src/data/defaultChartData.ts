import { ChartData } from "@/types/dashboard";

export const defaultChartData: ChartData[] = [
  { name: 'Jan', value: 400, value2: 300, target: 450 },
  { name: 'Feb', value: 300, value2: 400, target: 350 },
  { name: 'Mar', value: 600, value2: 500, target: 550 },
  { name: 'Apr', value: 800, value2: 700, target: 750 },
  { name: 'May', value: 500, value2: 600, target: 550 },
];

export const bubbleData: ChartData[] = [
  { name: 'Group A', value: 400, value2: 300, z: 200 },
  { name: 'Group B', value: 300, value2: 400, z: 500 },
  { name: 'Group C', value: 600, value2: 500, z: 100 },
  { name: 'Group D', value: 800, value2: 700, z: 300 },
];

export const tableData = [
  { id: 1, name: 'Item 1', value: 100 },
  { id: 2, name: 'Item 2', value: 200 },
  { id: 3, name: 'Item 3', value: 300 },
];