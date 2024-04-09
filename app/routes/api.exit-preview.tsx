import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { parseCookie, previewModeCookie } from "~/lib/preview-cookie.server";

export const loader = (_: LoaderFunctionArgs) => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookie = await parseCookie(request, previewModeCookie);

  cookie.stage = "published";

  return redirect("/", {
    headers: {
      "Set-Cookie": await previewModeCookie.serialize(cookie),
    },
  });
};
