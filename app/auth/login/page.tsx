"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type loginType = z.infer<typeof loginSchema>;

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: loginType) => {};

  return (
    <>
      <div className="py-32">
        <Form {...form}>
          <Card className="py-8 max-w-md mx-auto shadow">
            <CardContent>
              <h4 className="text-lg font-medium text-center mb-6">Login</h4>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. johndoe@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your password..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>Login</Button>
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </>
  );
}
