import { BackendResponse } from "@/common/types";
import { z } from "zod";

export type Connection = {
  id: string;
  project_id: string;
  message_provider_id: string;
};

export const newConnectionSchema = z.object({
  project_id: z.string(),
  message_provider_id: z.string(),
});

export type newConnectionType = z.infer<typeof newConnectionSchema>;

export type NewConnectionResponse = BackendResponse<Connection>;
