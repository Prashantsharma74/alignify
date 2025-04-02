import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { toast } from "sonner";
import { ProjectHeader } from "@/components/dashboard/project/ProjectHeader";
import { ScreenTabs } from "@/components/dashboard/screens/ScreenTabs";
import { ScreenActions } from "@/components/dashboard/screens/ScreenActions";
import { templates } from "@/data/dashboardTemplates";
import { supabase } from "@/integrations/supabase/client";
import { Screen } from "@/types/dashboard";

interface Resolution {
  name: string;
  width: number;
  height: number;
}

const deviceResolutions: Resolution[] = [
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "MacBook Pro", width: 1440, height: 900 },
  { name: "Desktop", width: 1920, height: 1080 },
  { name: "iMac/Default", width: 2560, height: 1440 },
  { name: "Slide 16:9", width: 1920, height: 1080 },
  { name: "Slide 4:3", width: 1024, height: 768 },
  { name: "A4", width: 794, height: 1123 },
  { name: "Tabloid", width: 1123, height: 794 },
  { name: "Custom", width: 1920, height: 1080 },
];

const templateCategories = [
  {
    name: "Sales Dashboard",
    description: "Revenue tracking, pipeline analysis, and sales performance metrics",
    icon: "📊"
  },
  {
    name: "Marketing Analytics",
    description: "Campaign performance, conversion rates, and channel analytics",
    icon: "📈"
  },
  {
    name: "Customer Success",
    description: "Customer health scores, satisfaction metrics, and engagement tracking",
    icon: "🎯"
  },
  {
    name: "Product Analytics",
    description: "User engagement, feature adoption, and performance metrics",
    icon: "⚡"
  }
];

const Index = () => {
  const { projectId: urlProjectId } = useParams();
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(true);
  const [screens, setScreens] = useState<Screen[]>([
    { id: "1", name: "Dashboard 1", components: [], backgroundColor: "#FFFFFF" }
  ]);
  const [selectedScreen, setSelectedScreen] = useState<string>("1");
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(deviceResolutions[4]);
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectId, setProjectId] = useState<string | null>(urlProjectId || null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    getUserEmail();

    if (urlProjectId) {
      loadProjectData(urlProjectId);
    }
  }, [urlProjectId]);

  const loadProjectData = async (id: string) => {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (project) {
        setProjectName(project.project_name);
        setProjectDescription(project.description || '');
        setProjectId(project.id);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error("Failed to load project");
    }
  };

  const handleSaveProject = async (name: string, description: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to save projects");
        return;
      }

      const projectData = {
        project_name: name,
        description: description,
        user_id: user.id,
      };

      if (projectId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);

        if (error) throw error;
        toast.success("Project updated successfully");
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setProjectId(data.id);
          navigate(`/projects/${data.id}`);
        }
        toast.success("Project saved successfully");
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error("Failed to save project");
    }
  };

  const handleShareProject = async (shareEmail: string) => {
    if (!projectId || !shareEmail || !userEmail) {
      toast.error("Please save the project and enter a valid email to share with");
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('share-project', {
        body: {
          projectId,
          recipientEmail: shareEmail,
          projectName,
          senderEmail: userEmail
        }
      });

      if (error) throw error;
      toast.success(`Project shared with ${shareEmail}`);
    } catch (error) {
      console.error('Error sharing project:', error);
      toast.error("Failed to share project");
    }
  };

  const handleResolutionChange = (value: string) => {
    const resolution = deviceResolutions.find(r => r.name === value) || deviceResolutions[4];
    setSelectedResolution(resolution);
  };

  const handleTemplateSelect = (templateName: string) => {
    if (templates[templateName]) {
      const newScreen: Screen = {
        id: Date.now().toString(),
        name: templateName,
        components: templates[templateName].components,
        backgroundColor: "#FFFFFF"
      };
      setScreens([...screens, newScreen]);
      setSelectedScreen(newScreen.id);
      toast(`${templateName} created successfully`);
    }
  };

  const handleBackgroundColorChange = (color: string) => {
    setScreens(prevScreens => 
      prevScreens.map(screen => 
        screen.id === selectedScreen 
          ? { ...screen, backgroundColor: color }
          : screen
      )
    );
    toast.success(`Canvas background updated to ${color}`);
  };

  const addNewScreen = () => {
    const newScreen: Screen = {
      id: Date.now().toString(),
      name: `Dashboard ${screens.length + 1}`,
      components: [],
      backgroundColor: "#FFFFFF"
    };
    setScreens([...screens, newScreen]);
    setSelectedScreen(newScreen.id);
    toast("New screen added");
  };

  const updateScreenName = (screenId: string, newName: string) => {
    setScreens(screens.map(screen => 
      screen.id === screenId ? { ...screen, name: newName } : screen
    ));
    setEditingScreen(null);
    toast("Screen name updated");
  };

  const removeScreen = (screenId: string) => {
    if (screens.length === 1) {
      toast.error("Cannot remove the last screen");
      return;
    }
    const newScreens = screens.filter(screen => screen.id !== screenId);
    setScreens(newScreens);
    if (selectedScreen === screenId) {
      setSelectedScreen(newScreens[0].id);
    }
    toast("Screen removed");
  };

  const handlePaletteChange = (colors: string[]) => {
    setScreens(prevScreens => 
      prevScreens.map(screen => 
        screen.id === selectedScreen
          ? {
              ...screen,
              components: screen.components.map(component => {
                if (component.type.includes('chart') || component.type.includes('graph')) {
                  return {
                    ...component,
                    style: {
                      ...component.style,
                      colors: colors
                    }
                  };
                }
                return component;
              })
            }
          : screen
      )
    );
  };

  const currentScreen = screens.find(screen => screen.id === selectedScreen);
  const components = currentScreen?.components || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        selectedResolution={selectedResolution}
        deviceResolutions={deviceResolutions}
        onResolutionChange={handleResolutionChange}
        templateCategories={templateCategories}
        onSelectTemplate={handleTemplateSelect}
      />
      
      <div className="container mx-auto px-6 flex-1">
        <div className="flex flex-col gap-2">
          <ProjectHeader
            projectId={projectId}
            projectName={projectName}
            projectDescription={projectDescription}
            onSaveProject={handleSaveProject}
            onShareProject={handleShareProject}
          />

          <div className="flex items-center justify-between gap-4">
            <ScreenTabs
              screens={screens}
              selectedScreen={selectedScreen}
              onSelectScreen={setSelectedScreen}
              onEditScreen={setEditingScreen}
              onRemoveScreen={removeScreen}
              onAddScreen={addNewScreen}
            />
            <ScreenActions
              screens={screens}
              selectedScreen={selectedScreen}
              onSelectScreen={setSelectedScreen}
              backgroundColor={currentScreen?.backgroundColor}
            />
          </div>
        </div>

        <DashboardLayout
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          components={components}
          setComponents={(newComponents) => {
            setScreens(screens.map(screen =>
              screen.id === selectedScreen
                ? { ...screen, components: newComponents }
                : screen
            ));
          }}
          isPropertiesOpen={isPropertiesOpen}
          setIsPropertiesOpen={setIsPropertiesOpen}
          canvasWidth={selectedResolution.width}
          canvasHeight={selectedResolution.height}
          backgroundColor={currentScreen?.backgroundColor}
          onBackgroundColorChange={handleBackgroundColorChange}
          screens={screens}
          onPaletteChange={handlePaletteChange}
        />
      </div>
    </div>
  );
};

export default Index;