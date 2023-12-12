import {
  GetProvidersResponse,
  MessageProvider,
} from "@/app/api/providers/types";
import { AxiosClientWithAuth } from "@/common/api";

export default async function getProviders(
  url: string
): Promise<MessageProvider[]> {
  const res = await AxiosClientWithAuth().get<GetProvidersResponse>(url);
  return res.data.data;
}
