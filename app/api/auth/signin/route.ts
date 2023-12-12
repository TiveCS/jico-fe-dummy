import { AxiosNoAuth } from "@/common/api";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "./types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const payload = loginSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      {
        status: 400,
        message: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  try {
    const res = await AxiosNoAuth.post("/user/SignIn", {
      username: payload.data.username,
      password: payload.data.password,
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully logged in",
      data: res.data.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.response?.data.message,
        },
        {
          status: error.response?.status,
          statusText: error.response?.statusText,
        }
      );
    }

    throw error;
  }
}
