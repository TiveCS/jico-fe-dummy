import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <nav className="w-full py-6 ">
      <div className="flex flex-row justify-between max-w-6xl">
        <div className="inline-flex gap-x-6 items-center">
          <Link href={"/dashboard"}>
            <Button variant={"link"}>Dashboard</Button>
          </Link>
          <Link href={"/dashboard/projects"}>
            <Button variant={"link"}>Projects</Button>
          </Link>
          <Link href={"/dashboard/providers"}>
            <Button variant={"link"}>Message Providers</Button>
          </Link>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
