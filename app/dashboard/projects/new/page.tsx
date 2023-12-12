"use client";

import { newProject, newProjectSchema } from "@/app/api/projects/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";

export default function NewProjectPage() {
  const form = useForm<newProject>({
    resolver: zodResolver(newProjectSchema),
  });

  const onSubmit = (data: newProject) => {};

  return <></>;
}
