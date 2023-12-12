import { AxiosServer } from "@/common/api";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { newProjectSchema } from "./types";
import { getServerToken } from "@/common/helpers/token-getter";

export async function GET(req: NextRequest) {
  const { accessToken, unauthorizedResponse } = await getServerToken(req);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const res = await AxiosServer(accessToken).get("/project/all");

    return NextResponse.json({
      status: 200,
      data: res.data.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status,
          message: error.response?.data,
        },
        { status: error.response?.status }
      );
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json(
      {
        status: 401,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const body = await req.json();

  const payload = newProjectSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      {
        status: 400,
        message: payload.error,
      },
      { status: 400 }
    );
  }

  try {
    const res = await AxiosServer(accessToken).post(
      "/project/new",
      payload.data
    );

    return NextResponse.json({
      status: 201,
      data: res.data.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          status: error.response?.status,
          message: error.response?.data,
        },
        { status: error.response?.status }
      );
    }
    throw error;
  }
}
