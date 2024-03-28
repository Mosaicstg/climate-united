import { generateSitemap } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { getDomainUrl } from "~/utils/get-route-url.server"

export async function loader({ request }: LoaderFunctionArgs) {
  // @ts-ignore
  let build = await import("virtual:remix/server-build")

  return generateSitemap(request, build.routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  })
}
