import { Textarea } from "@/components/ui/textarea";

interface DashboardInfoSectionProps {
  title: string;
  content: string;
  isEditing: boolean;
  onChange: (value: string) => void;
}

export const DashboardInfoSection = ({
  title,
  content,
  isEditing,
  onChange,
}: DashboardInfoSectionProps) => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {isEditing ? (
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
        />
      ) : (
        <p className="text-muted-foreground">{content}</p>
      )}
    </section>
  );
};