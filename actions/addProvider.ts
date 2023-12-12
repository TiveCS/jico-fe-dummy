import {
  NewProviderResponse,
  newMessageProviderType,
} from "@/app/api/providers/types";
import { AxiosClientWithAuth } from "@/common/api";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export default async function addProvider(data: newMessageProviderType) {
  try {
    toast({
      title: "Creating new provider",
      description: "Please wait...",
    });

    const res = await AxiosClientWithAuth().post<NewProviderResponse>(
      "/providers",
      data
    );

    toast({
      title: "Message Provider Created",
      description: "Your message provider has been created successfully.",
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: "Failed to add provider",
        variant: "destructive",
        description: error.response?.data.message,
      });
    }
    throw error;
  }
}
