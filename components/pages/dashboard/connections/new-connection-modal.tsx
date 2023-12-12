"use client";

import addConnection from "@/actions/addConnection";
import {
  newConnectionSchema,
  newConnectionType,
} from "@/app/api/connections/types";
import { MessageProvider } from "@/app/api/providers/types";
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
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

interface NewConnectionModalProps {
  variant?: "default" | "outline";
  project_id: string;
  providers: MessageProvider[];
}

export default function NewConnectionModal({
  variant,
  project_id,
  providers,
}: NewConnectionModalProps) {
  const router = useRouter();
  const form = useForm<newConnectionType>({
    resolver: zodResolver(newConnectionSchema),
    defaultValues: {
      project_id: project_id,
      message_provider_id: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: newConnectionType) => {
    setLoading(true);

    const res = await addConnection(data);

    const newConnection = res.data.data;

    if (res.status === 201) {
      mutate("/connections", newConnection, true);
      form.reset();
      router.push("/dashboard/providers");
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={variant}>Connect Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Project</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="project_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Provider ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Discord JICO"
                        disabled={loading}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message_provider_id"
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
                          <SelectValue placeholder="Select Created Provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.provider_label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose asChild>
                <Button type="submit" className="mt-6" disabled={loading}>
                  {loading ? "Loading..." : "Connect Project with Provider"}
                </Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
