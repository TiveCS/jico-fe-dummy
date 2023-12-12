"use client";

import getProjectById from "@/actions/getProjectById";
import getProviders from "@/actions/getProviders";
import { ProjectConnection } from "@/app/api/projects/[project_id]/types";
import { MessageProvider } from "@/app/api/providers/types";
import NewConnectionModal from "@/components/pages/dashboard/connections/new-connection-modal";
import NewProviderModal from "@/components/pages/dashboard/providers/new-provider-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useSWR from "swr";

export default function ProjectDetailPage({
  params,
}: {
  params: { project_id: string };
}) {
  const { project_id } = params;
  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: isProjectError,
  } = useSWR<{
    listener?: {
      target_url: string;
      listener_url: string;
    };
    connections: ProjectConnection[];
  }>(["/projects", project_id], ([url, projectId]) =>
    getProjectById(url, projectId as string)
  );

  const {
    data: providers,
    isLoading: isProviderLoading,
    error: isProviderError,
    mutate: providerMutate,
  } = useSWR<MessageProvider[]>("/providers", getProviders);

  return (
    <>
      {isProjectLoading && <div>Loading...</div>}

      <div className="flex flex-row justify-between items-center my-8">
        <h4 className="text-lg font-medium">Detail Project</h4>

        <div className="flex flex-row gap-x-6">
          <NewConnectionModal
            project_id={project_id}
            variant="default"
            providers={providers ?? []}
          />

          <NewProviderModal mutate={providerMutate} variant="outline" />
        </div>
      </div>

      {projectData && (
        <div className="my-4 flex flex-row gap-x-4 max-w-6xl">
          <Input value={projectData.listener?.listener_url} readOnly />

          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                projectData.listener?.listener_url ?? ""
              );

              toast({
                title: "Copied!",
                description:
                  "Paste Listener URL into into JIRA Webhook URL settings",
              });
            }}
          >
            Copy Listener URL
          </Button>
        </div>
      )}

      {projectData?.connections &&
        projectData.connections.length > 0 &&
        projectData.connections.map((p) => (
          <Card key={p.connection_id} className="max-w-6xl mt-4">
            <CardContent className="py-2">
              <div>
                <p className="text-lg font-medium">{p.name}</p>
              </div>
              <p>Connection ID: {p.connection_id ?? "Unset"}</p>
              <p>Provider ID: {p.message_provider_id ?? "Unset"}</p>
              <p>Provider Webhook: {p.webhook ?? "Unset"}</p>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
