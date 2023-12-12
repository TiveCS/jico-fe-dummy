import { newConnectionType } from "@/app/api/connections/types";
import { AxiosClientWithAuth } from "@/common/api";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export default async function addConnection(payload: newConnectionType) {
  try {
    toast({
      title: "Adding connection",
      description: "Please wait while we add your connection.",
    });

    const res = await AxiosClientWithAuth().post("/connections", payload);

    toast({
      title: "Connection added",
      description: "You can now send messages to this project.",
    });
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong while adding your connection.",
      });
    }
    throw error;
  }
}
