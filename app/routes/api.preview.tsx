import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { findContentBySlug } from "./$slug/lib.server";
import { z } from "zod";
import { parseCookie, previewModeCookie } from "~/lib/preview-cookie.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requestUrl = new URL(request.url);
  const secret = requestUrl.searchParams.get("secret");
  const slug = requestUrl.searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    return json("Unauthorized request", { status: 401 });
  }

  if (!slug) {
    return json("Page Not Found", { status: 404 });
  }

  try {
    const content = await findContentBySlug(slug);

    if (!content) {
      return json("Not Found", { status: 404 });
    }

    const cookie = await parseCookie(request, previewModeCookie);

    // Set cookie to draft mode enabled
    cookie.stage = "draft";

    return redirect(`/${slug}`, {
      headers: {
        "Set-Cookie": await previewModeCookie.serialize(cookie),
      },
    });
  } catch (error) {
    // Log this on the server
    console.error(error);

    if (error instanceof Response) {
      const message = await error.text();

      throw new Response(message, { status: 404 });
    }

    if (error instanceof z.ZodError) {
      const errors = error.issues.map((error) => error.message);
      const errorMessage = errors.join(", ");

      throw new Response(errorMessage, { status: 404 });
    }

    throw new Response("Something went wrong!", { status: 404 });
  }
};
