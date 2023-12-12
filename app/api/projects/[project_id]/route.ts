import { AxiosServer } from "@/common/api";
import { NextRequest, NextResponse } from "next/server";
import { GetProjectByIdResponse } from "./types";
import { AxiosError } from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { project_id: string } }
) {
  const { project_id } = params;

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

  try {
    const res = await AxiosServer(accessToken).get<GetProjectByIdResponse>(
      `/project/id/connected/${project_id}`
    );

    const resListener = await AxiosServer(accessToken).get(
      `/webhook/${res.data.data[0].connection_id}`
    );

    return NextResponse.json({
      status: 200,
      message: "Success",
      listener: resListener.data.data,
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
