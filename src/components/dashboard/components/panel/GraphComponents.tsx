import {
  IconChartLine,
  IconChartAreaLine,
  IconChartBar,
  IconChartHistogram,
  IconStack2,
  IconChartPie,
  IconChartFunnel,
  IconChartDonut,
  IconChartBubble,
  IconGrid3x3,
  IconMap,
} from '@tabler/icons-react';

export const graphComponents = {
  category: "Graphs",
  items: [
    {
      id: "scorecard",
      icon: IconChartDonut,
      label: "Scorecard",
      tooltip: "Display a key metric with its change over time",
      color: "#0EA5E9"
    },
    { 
      id: "line-chart", 
      icon: IconChartLine, 
      label: "Line Chart",
      tooltip: "Visualize trends and changes over time with line charts",
      color: "#0EA5E9"
    },
    { 
      id: "area-chart", 
      icon: IconChartAreaLine, 
      label: "Area Chart",
      tooltip: "Show cumulative totals and part-to-whole relationships",
      color: "#9b87f5"
    },
    { 
      id: "column-chart", 
      icon: IconChartBar, 
      label: "Column Chart",
      tooltip: "Compare values across different categories vertically",
      color: "#7E69AB"
    },
    { 
      id: "bar-chart", 
      icon: IconChartHistogram, 
      label: "Bar Chart",
      tooltip: "Compare values across categories using horizontal bars",
      color: "#D6BCFA"
    },
    { 
      id: "stacked-bar", 
      icon: IconStack2, 
      label: "Stacked Bar",
      tooltip: "Show part-to-whole relationships within categories",
      color: "#8B5CF6"
    },
    { 
      id: "pie-chart", 
      icon: IconChartPie, 
      label: "Pie Chart",
      tooltip: "Display proportional data as segments of a circle",
      color: "#D946EF"
    },
    { 
      id: "funnel", 
      icon: IconChartFunnel, 
      label: "Funnel Chart",
      tooltip: "Visualize sequential stages in a process or workflow",
      color: "#F97316"
    },
    { 
      id: "donut", 
      icon: IconChartDonut, 
      label: "Donut Chart",
      tooltip: "Show proportional data with a hollow center for additional info",
      color: "#0EA5E9"
    },
    { 
      id: "bubble", 
      icon: IconChartBubble, 
      label: "Bubble Chart",
      tooltip: "Compare three dimensions of data using size and position",
      color: "#9b87f5"
    },
    { 
      id: "heatmap", 
      icon: IconGrid3x3, 
      label: "Heatmap",
      tooltip: "Display data intensity across two dimensions using color",
      color: "#7E69AB"
    },
    { 
      id: "geomap", 
      icon: IconMap, 
      label: "Geo Map",
      tooltip: "Display geographical data on an interactive map",
      color: "#10B981"
    },
  ],
};
