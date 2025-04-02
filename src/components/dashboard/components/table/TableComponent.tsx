import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TableHeader } from "./TableHeader";

interface TableComponentProps {
  data: any[];
  title?: string;
  width?: number;
  style?: {
    fontFamily?: string;
    color?: string;
    fontSize?: string;
  };
}

export const TableComponent = ({ data, title, width, style }: TableComponentProps) => {
  const [columns, setColumns] = useState<string[]>(Object.keys(data[0] || {}));
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [editingColumn, setEditingColumn] = useState<{ index: number; name: string } | null>(null);

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      setColumns([...columns, newColumnName.trim()]);
      setNewColumnName('');
      data.forEach(row => {
        row[newColumnName.trim()] = '';
      });
    }
  };

  const handleRemoveColumn = (columnToRemove: string) => {
    setColumns(columns.filter(col => col !== columnToRemove));
    data.forEach(row => {
      delete row[columnToRemove];
    });
  };

  const handleRenameColumn = (oldName: string, newName: string) => {
    if (newName.trim() && newName !== oldName) {
      const newColumns = columns.map(col => col === oldName ? newName : col);
      setColumns(newColumns);
      data.forEach(row => {
        row[newName] = row[oldName];
        delete row[oldName];
      });
    }
    setEditingColumn(null);
  };

  return (
    <div className="w-full max-w-full overflow-x-auto bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm" 
         style={{ width: width ? `${width}px` : '400px' }}>
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold mb-2 text-[#1A1F2C]" style={style}>{title}</h3>}
        
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="mb-2"
          >
            {isEditing ? 'Done Editing' : 'Edit Columns'}
          </Button>
          
          {isEditing && (
            <div className="flex gap-2 mb-2">
              <Input
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="New column name"
                className="flex-1"
              />
              <Button onClick={handleAddColumn} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <TableHeader
                columns={columns}
                isEditing={isEditing}
                editingColumn={editingColumn}
                onRenameColumn={handleRenameColumn}
                onRemoveColumn={handleRemoveColumn}
                setEditingColumn={setEditingColumn}
              />
            </thead>
            <tbody>
              {data.map((row: any, index: number) => (
                <tr key={index} className="border-b border-[#E5DEFF] hover:bg-[#F1F0FB]/50 transition-colors">
                  {columns.map((key) => (
                    <td key={key} className="p-2 border border-[#E5DEFF] text-[#1A1F2C]">
                      {row[key] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};