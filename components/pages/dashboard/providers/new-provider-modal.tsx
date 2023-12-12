import { addProject } from "@/actions/addProject";
import addProvider from "@/actions/addProvider";
import { newProject, newProjectSchema } from "@/app/api/projects/types";
import {
  MessageProvider,
  MessageProviderType,
  newMessageProviderSchema,
  newMessageProviderType,
} from "@/app/api/providers/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";

interface ProjectNewModalProps {
  mutate: KeyedMutator<MessageProvider[]>;
  variant?: "default" | "outline";
}

export default function NewProviderModal({
  variant = "default",
  mutate,
}: ProjectNewModalProps) {
  const router = useRouter();
  const form = useForm<newMessageProviderType>({
    resolver: zodResolver(newMessageProviderSchema),
    defaultValues: {
      provider_label: "",
      webhook: "",
      provider_type: MessageProviderType.Discord,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: newMessageProviderType) => {
    setLoading(true);

    const res = await addProvider(data);

    const newProvider = res.data.data;

    if (res.status === 201) {
      mutate(async (providers) => {
        if (!providers) return [newProvider];
        return [...providers, newProvider];
      });
      form.reset();
      router.push("/dashboard/providers");
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={variant}>New Provider</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Provider</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="provider_label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Provider Label</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Discord JICO"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provider_type"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel htmlFor={field.name}>
                      Select Provider Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select message provider type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="discord">Discord</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="webhook"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel htmlFor={field.name}>
                      Message Provider Webhook URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. https://discord.com/api/webhook/xxx"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose asChild>
                <Button type="submit" className="mt-6" disabled={loading}>
                  {loading ? "Loading..." : "Create New Provider"}
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
