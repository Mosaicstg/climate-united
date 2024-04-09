import { type Cookie, createCookie } from "@remix-run/node";

export const previewModeCookie = createCookie("stage", {
  path: "/",
  sameSite: "none",
  secure: true,
  httpOnly: true,
  secrets: [process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string],
});

export const isPreviewMode = async (request: Request) => {
  const cookie = await parseCookie(request, previewModeCookie);

  return cookie?.stage === "draft";
};

export const parseCookie = async (request: Request, cookie: Cookie) => {
  const cookieHeader = request.headers.get("Cookie");
  const parsedCookie = (await cookie.parse(cookieHeader)) || {};

  return parsedCookie;
};
