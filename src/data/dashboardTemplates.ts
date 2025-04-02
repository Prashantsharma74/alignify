import { CanvasComponent } from "@/types/dashboard";

const salesDashboardComponents: CanvasComponent[] = [
  {
    id: "sales-title",
    type: "title",
    position: { x: 200, y: 60 },
    width: 400,
    height: 60,
    title: "Sales Performance Dashboard",
    style: {
      fontSize: "24px",
      fontFamily: "Inter",
      color: "#1A1F2C",
      textAlign: "left"
    }
  },
  {
    id: "sales-date-range",
    type: "date-range",
    position: { x: 140, y: 160 },
    width: 280,
    height: 80,
    title: "Date Range",
    dateRange: {
      start: "2025-01-15",
      end: "2025-01-22"
    },
    style: {
      fontSize: "14px",
      fontFamily: "Inter",
      color: "#1A1F2C"
    }
  },
  {
    id: "sales-dropdown-1",
    type: "dropdown",
    position: { x: 480, y: 160 },
    width: 200,
    height: 80,
    title: "Product Filter",
    options: ["All Products", "Product A", "Product B", "Product C"],
    style: {
      fontSize: "14px",
      fontFamily: "Inter",
      color: "#1A1F2C"
    }
  },
  {
    id: "sales-dropdown-2",
    type: "dropdown",
    position: { x: 740, y: 160 },
    width: 200,
    height: 80,
    title: "Region Filter",
    options: ["All Regions", "North", "South", "East", "West"],
    style: {
      fontSize: "14px",
      fontFamily: "Inter",
      color: "#1A1F2C"
    }
  },
  {
    id: "sales-line-chart",
    type: "line-chart",
    position: { x: 480, y: 380 },
    width: 880,
    height: 400,
    title: "Revenue Trend",
    data: [
      { name: "Jan", value: 2700 },
      { name: "Feb", value: 3100 },
      { name: "Mar", value: 2800 },
      { name: "Apr", value: 3600 },
      { name: "May", value: 3000 },
      { name: "Jun", value: 3400 }
    ],
    style: {
      fontSize: "16px",
      fontFamily: "Inter",
      color: "#1A1F2C"
    }
  },
  {
    id: "sales-area-chart",
    type: "area-chart",
    position: { x: 480, y: 840 },
    width: 880,
    height: 400,
    title: "Sales Conversion Rate",
    data: [
      { name: "Week 1", value: 1200 },
      { name: "Week 2", value: 1350 },
      { name: "Week 3", value: 1500 },
      { name: "Week 4", value: 1800 }
    ],
    style: {
      fontSize: "16px",
      fontFamily: "Inter",
      color: "#1A1F2C"
    }
  }
];

export const templates = {
  "Sales Dashboard": {
    components: salesDashboardComponents,
    description: "Revenue tracking, pipeline analysis, and sales performance metrics",
    icon: "📊"
  },
  "Marketing Analytics": {
    description: "Campaign performance, conversion rates, and channel analytics",
    icon: "📈",
    components: []
  },
  "Customer Success": {
    description: "Customer health scores, satisfaction metrics, and engagement tracking",
    icon: "🎯",
    components: []
  },
  "Product Analytics": {
    description: "User engagement, feature adoption, and performance metrics",
    icon: "⚡",
    components: []
  }
};