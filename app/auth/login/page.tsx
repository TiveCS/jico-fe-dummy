"use client";

import {
  LoginResponse,
  loginSchema,
  loginType,
} from "@/app/api/auth/signin/types";
import { AxiosClient } from "@/common/api";
import Navbar from "@/components/Navbar";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginType) => {
    try {
      const res = await AxiosClient.post<LoginResponse>("/auth/signin", data);

      const { accessToken } = res.data.data;

      localStorage.setItem("accessToken", accessToken);

      toast({
        title: "Success",
        description: "Login success",
      });

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: error.message,
        });
      }
      throw error;
    }
  };

  return (
    <>
      <Navbar />

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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Username</FormLabel>
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
                        <Input
                          type="password"
                          {...field}
                          placeholder="Your password..."
                        />
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
