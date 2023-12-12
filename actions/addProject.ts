import { NewProjectResponse, newProject } from "@/app/api/projects/types";
import { AxiosClientWithAuth } from "@/common/api";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export async function addProject(payload: newProject) {
  try {
    toast({
      title: "Creating new project",
      description: "Please wait...",
    });

    const res = await AxiosClientWithAuth().post<NewProjectResponse>(
      "/projects",
      payload
    );

    toast({
      title: "Project Created",
      description: "Your project has been created successfully.",
    });

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: "Failed to add project",
        variant: "destructive",
        description: error.response?.data.message,
      });
    }
    throw error;
  }
}
