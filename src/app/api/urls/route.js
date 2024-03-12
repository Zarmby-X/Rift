import { NextResponse } from "next/server";
import { headers } from "next/headers";
import UrlsController from "../../../controllers/Urls";
import JWT from "../../../handlers/JWT";

export async function GET() {
  const authToken = headers().get("jwt");
  const tokenValidation = JWT.validateToken(authToken);

  if (tokenValidation.validated) {
    const urls = await UrlsController.getUrls(tokenValidation.token.id);

    return NextResponse.json({
      urls,
    });
  }

  return NextResponse.json(
    {
      error: tokenValidation.msj,
    },
    {
      status: 404,
    }
  );
}

export async function POST(req) {
  const body = await req.json();
  const tokenValidation = JWT.validateToken(body.jwt);

  if (tokenValidation.validated) {
    const newUrl = await UrlsController.createUrl(
      tokenValidation.token.id,
      body.alias,
      body.originalUrl
    );

    return NextResponse.json({
      newUrl,
    });
  }

  return NextResponse.json(
    {
      error: tokenValidation.msj,
    },
    {
      status: 404,
    }
  );
}

export async function DELETE(req) {
  const body = await req.json();
  const tokenValidation = JWT.validateToken(body.jwt);

  if (tokenValidation.validated) {
    const deletedUrl = await UrlsController.deleteUrl(
      body.urlID,
      tokenValidation.token.id
    );
    return NextResponse.json({
      deletedUrl: deletedUrl,
      msj: "url deleted sucsessfully",
    });
  }

  return NextResponse.json(
    {
      error: tokenValidation.msj,
    },
    {
      status: 404,
    }
  );
}

export async function PUT(req) {
  const body = await req.json();
  const tokenValidation = JWT.validateToken(body.jwt);

  if (tokenValidation.validated) {
    const updatedUrl = await UrlsController.updateUrl(
      body.urlID,
      body.alias,
      body.originalUrl,
      tokenValidation.token.id
    );

    return NextResponse.json({
      updatedUrl,
    });
  }

  return NextResponse.json(
    {
      error: tokenValidation.msj,
    },
    {
      status: 404,
    }
  );
}
