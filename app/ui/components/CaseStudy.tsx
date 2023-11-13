import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type CaseStudy } from "~/models/case-study.server"

type CaseStudyProps = CaseStudy

export function CaseStudy({
  title,
  headline,
  excerpt,
  featuredImage,
}: CaseStudyProps) {
  return (
    <div className="mb-12 flex flex-col gap-12 md:flex-row">
      <div className="md:w-2/5">
        {featuredImage ? (
          <img
            className="aspect-[3/2] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
      </div>
      <div className="md:w-3/5">
        <h3 className="mb-3 text-xl font-bold text-darkBlue">{headline}</h3>
        {excerpt
          ? documentToReactComponents(excerpt.json, richTextRenderOptions)
          : null}
      </div>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
