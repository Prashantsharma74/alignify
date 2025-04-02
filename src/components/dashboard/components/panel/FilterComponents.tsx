import { IconFilter, IconCalendar } from '@tabler/icons-react';

export const filterComponents = {
  category: "Filters",
  items: [
    { 
      id: "dropdown", 
      icon: IconFilter, 
      label: "Dropdown",
      tooltip: "Add dropdown filters to enable data filtering and selection",
      color: "#D946EF"
    },
    { 
      id: "relative-date", 
      icon: IconCalendar, 
      label: "Relative Date",
      tooltip: "Filter data relative to the current date (last X weeks/months/years)",
      color: "#F97316"
    },
    { 
      id: "date-range", 
      icon: IconCalendar, 
      label: "Date Range",
      tooltip: "Select a specific date range with start and end dates",
      color: "#0EA5E9"
    },
  ],
};