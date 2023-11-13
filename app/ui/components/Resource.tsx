import { type Resource } from "~/models/resource.server"

type ResourceProps = Resource

export function Resource({ title, file }: ResourceProps) {
  return (
    <div>
      <h3 className="mb-3 text-xl font-bold">
        <a
          className="duration-300 ease-in-out hover:text-green"
          href={file.url}
          download={file.fileName}
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
