import { BackendResponse } from "@/common/types";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type loginType = z.infer<typeof loginSchema>;

export type LoginResponse = BackendResponse<{
  accessToken: string;
  email: string;
  username: string;
  id: string;
  name: string;
}>;
