import {
  GetProjectByIdResponse,
  ProjectConnection,
} from "@/app/api/projects/[project_id]/types";
import { AxiosClientWithAuth } from "@/common/api";

export default async function getProjectById(
  url: string,
  projectId: string
): Promise<{
  listener?: {
    target_url: string;
    listener_url: string;
  };
  connections: ProjectConnection[];
}> {
  const finalUrl = `${url}/${projectId}`;

  const res = await AxiosClientWithAuth().get<GetProjectByIdResponse>(finalUrl);

  console.log(res.data);

  return { listener: res.data.listener, connections: res.data.data };
}
