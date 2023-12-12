import { NextRequest, NextResponse } from "next/server";

export async function getServerToken(req: NextRequest) {
  const accessToken = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return {
      accessToken: null,
      unauthorizedResponse: NextResponse.json(
        {
          status: 401,
          message: "Unauthorized",
        },
        { status: 401 }
      ),
    };
  }

  return {
    accessToken,
  };
}
