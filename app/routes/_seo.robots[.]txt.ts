import { generateRobotsTxt } from "@nasa-gcn/remix-seo"
import { type DataFunctionArgs } from "@remix-run/node"
import { getDomainUrl } from "~/utils/get-route-url.server"

export function loader({ request }: DataFunctionArgs) {
  return generateRobotsTxt(
    [
      // TODO: Uncomment this when we have a sitemap
      // { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` },
      // TODO: remove before launch
      { type: "userAgent", value: "*" },
      { type: "disallow", value: "/" },
    ],
    { appendOnDefaultPolicies: false },
  )
}
