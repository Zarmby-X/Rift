import { NextRequest, NextResponse } from "next/server";
import LoginController from "../../../../controllers/Login";
import JWT from "../../../../handlers/JWT";

export async function POST(req) {
  const data = await req.json();
  if (data.authMethod === "OAuth" || data.authMethod === "oauth") {
    switch (data.provider) {
      case "github": {
        try {
          const user = await LoginController.singInWithGitHub(
            data.access_token
          );
          const payload = {
            id: user.id,
            email: user.email,
          };
          const token = JWT.singToken(payload);
          return NextResponse.json({
            token: token,
          });
        } catch (error) {
          return NextResponse.json({ error: error }, { status: error.status });
        }
      }

      default:
        return NextResponse.json({
          msj: "provider not suported",
        });
    }
  }

  return NextResponse.json({});
}
