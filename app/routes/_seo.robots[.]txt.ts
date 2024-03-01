import { generateRobotsTxt } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { getDomainUrl } from "~/utils/get-route-url.server"

export function loader({ request }: LoaderFunctionArgs) {
  return generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` },
  ])
}
