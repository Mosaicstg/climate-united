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
    { name: "keywords", content: keywords },
    { name: "image", content: image },
    { name: "og:url", content: url },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: image },
    { name: "og:site_name", content: "Climate United" },
    { name: "og:locale", content: "en_US" },
    {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ]
}
