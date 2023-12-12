import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface ProjectItemProps {
  id: string;
  name: string;
}

export default function ProviderItem({ id, name }: ProjectItemProps) {
  return (
    <Card className="max-w-sm col-span-3">
      <CardHeader>
        <p className="text-lg font-medium">{name}</p>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-end">
          <Link href={`/dashboard/projects/${id}`}>
            <Button variant={"outline"}>Show Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
