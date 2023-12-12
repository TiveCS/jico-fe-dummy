import { BackendResponse } from "@/common/types";
import { Project } from "../types";

export type ProjectConnection = {
  connection_id: null;
  connection_message_provider_id: null;
  connection_project_id: null;
  message_provider_id: null;
  message_provider_user_id: null;
  name: "Mantap";
  project_id: "bd933d46-327e-4d8e-9a24-f430e0b28842";
  project_user_id: "985e9474-9075-4bf0-a7fb-4a82a06214d4";
  provider_label: null;
  provider_type: null;
  webhook: null;
};

export type GetProjectByIdResponse = BackendResponse<ProjectConnection[]>;
