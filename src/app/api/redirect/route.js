import { NextResponse } from "next/server";
import UrlsController from "../../../controllers/Urls";
import { headers } from "next/headers";

export async function GET() {
  const riftUrl = headers().get("riftUrl");
  try {
    const originUrl = await UrlsController.getUrl(riftUrl);
    return NextResponse.json({
      originUrl: originUrl.originalUrl,
    });
  } catch (error) {
    return NextResponse.json({
      error: "url doesn't exist",
    });
  }
}
