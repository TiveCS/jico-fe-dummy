import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="py-6 px-8 border-b border-b-border">
      <div className="max-w-6xl mx-auto flex flex-row justify-between items-center">
        <div>
          <Link href={"/"} className="font-medium">
            JICO
          </Link>
        </div>

        <div className="inline-flex gap-x-8">
          <Link href={"/auth/login"}>
            <Button variant={"link"}>Login</Button>
          </Link>

          <Link href={"/auth/register"}>
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
