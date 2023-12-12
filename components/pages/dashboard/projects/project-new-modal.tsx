import { addProject } from "@/actions/addProject";
import {
  Project,
  newProject,
  newProjectSchema,
} from "@/app/api/projects/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator, mutate } from "swr";

interface ProjectNewModalProps {
  mutate: KeyedMutator<Project[]>;
}

export default function ProjectNewModal(props: ProjectNewModalProps) {
  const router = useRouter();
  const form = useForm<newProject>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: newProject) => {
    setLoading(true);

    const res = await addProject(data);

    if (res.status === 201) {
      mutate("projects", res.data.data);
      form.reset();
      router.push("/dashboard/projects");
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Awesome Project"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose asChild>
                <Button type="submit" className="mt-6" disabled={loading}>
                  {loading ? "Loading..." : "Create New Project"}
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
