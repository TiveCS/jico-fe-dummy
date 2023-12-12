import { GetProjectsResponse, Project } from "@/app/api/projects/types";
import { AxiosClientWithAuth } from "@/common/api";

export default async function getProjects(url: string): Promise<Project[]> {
  const res = await AxiosClientWithAuth().get<GetProjectsResponse>(url);
  return res.data.data;
}
