import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, X } from "lucide-react";

interface TableHeaderProps {
  columns: string[];
  isEditing: boolean;
  editingColumn: { index: number; name: string } | null;
  onRenameColumn: (oldName: string, newName: string) => void;
  onRemoveColumn: (column: string) => void;
  setEditingColumn: (value: { index: number; name: string } | null) => void;
}

export const TableHeader = ({
  columns,
  isEditing,
  editingColumn,
  onRenameColumn,
  onRemoveColumn,
  setEditingColumn,
}: TableHeaderProps) => {
  return (
    <tr className="bg-[#F1F0FB]">
      {columns.map((key, index) => (
        <th key={key} className="p-2 text-left border border-[#E5DEFF] text-[#7E69AB] font-semibold">
          <div className="flex items-center justify-between gap-2">
            {editingColumn?.index === index ? (
              <Input
                value={editingColumn.name}
                onChange={(e) => setEditingColumn({ index, name: e.target.value })}
                onBlur={() => onRenameColumn(key, editingColumn.name)}
                onKeyPress={(e) => e.key === 'Enter' && onRenameColumn(key, editingColumn.name)}
                className="h-6 min-w-[100px]"
                autoFocus
              />
            ) : (
              <span>{key}</span>
            )}
            {isEditing && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingColumn({ index, name: key })}
                  className="h-6 w-6 p-0"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveColumn(key)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </th>
      ))}
    </tr>
  );
};