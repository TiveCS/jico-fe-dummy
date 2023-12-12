import { BackendResponse } from "@/common/types";
import { z } from "zod";

export type Project = {
  id: string;
  name: string;
};

export type GetProjectsResponse = BackendResponse<Project[]>;

export const newProjectSchema = z.object({
  name: z.string(),
});

export type newProject = z.infer<typeof newProjectSchema>;

export type NewProjectResponse = BackendResponse<Project>;
