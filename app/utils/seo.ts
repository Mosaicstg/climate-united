export function getSocialMetas({
  url,
  title = "",
  description = "",
  image = "",
  keywords = "",
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { name: "keywords", content: keywords },
    { name: "image", content: image },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    {
      property: "og:image:type",
      content: "image/png",
    },
    { property: "og:site_name", content: "Climate United" },
    { property: "og:locale", content: "en_US" },
    {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
    {
      name: "twitter:creator",
      content: "@climate_united",
    },
  ]
}
