import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

const roles: UserRole[] = [
  "Data",
  "Product",
  "Business",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Other",
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("Other");
  const [otherRoleDescription, setOtherRoleDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth/signin");
      }
    };
    checkUser();
  }, [navigate]);

  const handleRoleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('users')
        .update({
          role: selectedRole,
          other_role_description: selectedRole === 'Other' ? otherRoleDescription : null
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Role updated successfully");
      navigate("https://beta.alignify.net");
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Select Your Role
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole === 'Other' && (
            <div className="space-y-2">
              <Label>Please specify your role</Label>
              <Input
                value={otherRoleDescription}
                onChange={(e) => setOtherRoleDescription(e.target.value)}
                placeholder="Specify your role"
              />
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={handleRoleSubmit}
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}