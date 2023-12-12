import { AxiosServer } from "@/common/api";
import { getServerToken } from "@/common/helpers/token-getter";
import { NextRequest, NextResponse } from "next/server";
import { NewConnectionResponse, newConnectionSchema } from "./types";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  const { accessToken, unauthorizedResponse } = await getServerToken(req);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const payload = newConnectionSchema.safeParse(body);

  if (!payload.success) {
    return {
      status: 400,
      message: payload.error,
    };
  }

  try {
    const res = await AxiosServer(accessToken).post<NewConnectionResponse>(
      "/connection/new",
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
