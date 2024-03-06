import { generateSitemap } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { getDomainUrl } from "~/utils/get-route-url.server"
import { routes } from "@remix-run/dev/server-build"

export function loader({ request }: LoaderFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  })
}
