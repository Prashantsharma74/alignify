import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FileDown, Lock, FileText, Database, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResolutionSelector } from "./ResolutionSelector";
import { TemplateSelector } from "./TemplateSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = ({
  selectedResolution,
  deviceResolutions,
  onResolutionChange,
  templateCategories,
  onSelectTemplate,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);

        localStorage.setItem("user_id", user.id);
        localStorage.setItem("session_start", new Date().toISOString());

        const { data: userData, error } = await supabase
          .from("users")
          .select("role, other_role_description")
          .eq("id", user.id)
          .single();

        if (!error && userData) {
          setUserRole(
            userData.role === "Other" && userData.other_role_description
              ? `Other - ${userData.other_role_description}`
              : userData.role
          );
        }
      }
    };
    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    // Retrieve user ID and session start time from local storage
    const userId = localStorage.getItem("user_id");
    const sessionStart = localStorage.getItem("session_start");

    if (userId && sessionStart) {
      const sessionEndTime = new Date();
      const sessionStartTime = new Date(sessionStart);
      const sessionDuration = sessionEndTime - sessionStartTime;

      // Update session_end and session_duration in the users table
      const { error } = await supabase
        .from("users")
        .update({
          session_end: sessionEndTime.toISOString(),
          session_duration: `${sessionDuration} milliseconds`,
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating session end time:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update session details. Please try again.",
        });
      }
    }

    localStorage.removeItem("user_id");
    localStorage.removeItem("alignify_auth_data");
    localStorage.removeItem("session_start");

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
      navigate("/auth/signin");
    }
  };

  const handleExportOption = (type: string) => {
    toast({
      title: "Feature coming soon",
      description: `Export to ${type} will be available in a future update.`,
    });
  };

  return (
    <>
      <header className="border-b bg-[#9b87f5] text-white">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Alignify</h1>
            <span className="text-sm opacity-80">
              Your Analytics Wireframing Tool
            </span>
          </div>

          <div className="flex items-center gap-4">
            <TemplateSelector onSelectTemplate={onSelectTemplate} />

            <div className="w-[180px]">
              <ResolutionSelector
                value={selectedResolution.name}
                resolutions={deviceResolutions}
                onChange={onResolutionChange}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => handleExportOption("PDF")}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Export to PDF
                  <Lock className="h-4 w-4 ml-auto text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportOption("Tableau")}
                  className="gap-2"
                >
                  <Database className="h-4 w-4" />
                  Export to Tableau
                  <Lock className="h-4 w-4 ml-auto text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleExportOption("PowerBI")}
                  className="gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  Export to PowerBI
                  <Lock className="h-4 w-4 ml-auto text-muted-foreground" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm text-muted-foreground">
                  {userEmail}
                </DropdownMenuItem>
                {userRole && (
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    Role: {userRole}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};
