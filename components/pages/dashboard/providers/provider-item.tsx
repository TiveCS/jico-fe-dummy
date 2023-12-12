import { MessageProvider } from "@/app/api/providers/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ProjectItemProps {
  provider: MessageProvider;
}

export default function ProjectItem({ provider }: ProjectItemProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(provider.webhook);

    toast({
      title: "Webhook URL Copied",
      description: "You can now paste it on JIRA's webhook",
    });
  };

  return (
    <Card className="max-w-lg col-span-3 py-4">
      <CardContent>
        <p className="text-lg font-medium">{provider.provider_label}</p>
        <p className="text-sm font-medium">{provider.provider_type}</p>
        <div className="flex justify-end">
          <Button variant={"outline"} onClick={handleCopy}>
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy Webhook URL
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
