"use client";

import getProjects from "@/actions/getProjects";
import { Project } from "@/app/api/projects/types";
import ProjectItem from "@/components/pages/dashboard/projects/project-item";
import ProjectNewModal from "@/components/pages/dashboard/projects/project-new-modal";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    error,
    mutate,
  } = useSWR<Project[]>("/projects", getProjects, { refreshInterval: 1000 });

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-y-2 mt-6">
        <h6 className="text-lg font-medium">List Projects</h6>

        <ProjectNewModal mutate={mutate} />
      </div>

      <Separator className="my-4" />

      <div>
        {isLoading && (
          <div className="mt-32 flex flex-col gap-y-8 justify-center items-center">
            <div className="text-center flex flex-col gap-y-2">
              <p className="text-lg font-medium">Loading Projects...</p>

              <p className="text-sm text-gray-500">
                Please wait while we load your projects.
              </p>
            </div>
          </div>
        )}
        {error && <div>Error: {error}</div>}

        <div className="grid grid-cols-9 gap-x-4 gap-y-4">
          {projects &&
            projects.map((project) => (
              <ProjectItem key={project.id} {...project} />
            ))}
        </div>

        {projects && projects.length === 0 && (
          <div className="mt-32 flex flex-col gap-y-8 justify-center items-center">
            <div className="text-center flex flex-col gap-y-2">
              <p className="text-lg font-medium">Oops! No Project Found</p>

              <p className="text-sm text-gray-500">
                Create new project to getting started.
              </p>
            </div>

            <ProjectNewModal mutate={mutate} />
          </div>
        )}
      </div>
    </>
  );
}
