import { useContentfulInspectorMode } from "@contentful/live-preview/react"
import { type Resource } from "~/models/resource.server"

type ResourceProps = Resource

export function Resource({ title, file, sys }: ResourceProps) {
  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <div>
      <h3
        className="mb-3 text-xl font-bold"
        {...inspectorProps({ fieldId: "title" })}
      >
        <a
          className="duration-300 ease-in-out hover:text-green"
          href={file.url}
          download={file.fileName}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </h3>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
