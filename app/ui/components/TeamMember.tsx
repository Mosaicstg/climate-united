import { type TeamMember } from "~/models/team-member.server"

type TeamMemberProps = TeamMember

export function TeamMember({
  name,
  position,
  department,
  featuredImage,
}: TeamMemberProps) {
  const { url, description, width, height } = featuredImage

  return (
    <div className="text-center">
      <img
        className="mx-auto mb-5 aspect-square w-3/4 rounded-full border-4 border-solid object-cover"
        src={url}
        alt={description}
        width={width}
        height={height}
      />
      <div>
        <p className="font-bold">{name}</p>
        <p className="mb-2 leading-tight">{position}</p>
        <p>{department}</p>
      </div>
    </div>
  )
}
