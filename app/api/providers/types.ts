import { BackendResponse } from "@/common/types";
import { z } from "zod";

export type MessageProvider = {
  id: string;
  user_id: string;
  provider_type: MessageProviderType;
  provider_label: string;
  webhook: string;
};

export enum MessageProviderType {
  Discord = "discord",
}

export type GetProvidersResponse = BackendResponse<MessageProvider[]>;

export const newMessageProviderSchema = z.object({
  provider_type: z.enum([MessageProviderType.Discord]),
  provider_label: z.string(),
  webhook: z.string().url(),
});

export type newMessageProviderType = z.infer<typeof newMessageProviderSchema>;

export type NewProviderResponse = BackendResponse<MessageProvider>;
