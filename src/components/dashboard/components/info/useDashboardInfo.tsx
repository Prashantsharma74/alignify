import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface DashboardContent {
  purpose: string;
  keyMetrics: string;
  definitions: string;
  usage: string;
}

const DEFAULT_CONTENT: DashboardContent = {
  purpose: "This dashboard provides a comprehensive view of key business metrics and analytics.",
  keyMetrics: "Track financial performance, customer metrics, and operational efficiency.",
  definitions: "Key terms and metrics used throughout the dashboard.",
  usage: "How to effectively use and customize the dashboard."
};

export const useDashboardInfo = (selectedScreen: string) => {
  const [content, setContent] = useState<DashboardContent>(() => {
    const saved = localStorage.getItem(`dashboardInfo-${selectedScreen}`);
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`dashboardInfo-${selectedScreen}`);
    setContent(saved ? JSON.parse(saved) : DEFAULT_CONTENT);
  }, [selectedScreen]);

  const handleSave = () => {
    localStorage.setItem(`dashboardInfo-${selectedScreen}`, JSON.stringify(content));
    setIsEditing(false);
    toast.success("Dashboard information saved successfully");
  };

  return {
    content,
    setContent,
    isEditing,
    setIsEditing,
    handleSave
  };
};