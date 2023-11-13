import { type TeamMember } from "~/models/team-member.server"

type TeamMemberProps = TeamMember & { borderColor: string }

export function TeamMember({
  name,
  position,
  department,
  featuredImage,
  borderColor = "border-green",
}: TeamMemberProps) {
  return (
    <div className="text-center">
      {featuredImage ? (
        <img
          className={`${borderColor} mx-auto mb-5 aspect-square w-3/4 rounded-full border-4 border-solid object-cover`}
          src={featuredImage.url}
          alt={featuredImage.description}
          width={featuredImage.width}
          height={featuredImage.height}
        />
      ) : null}
      <div>
        <p className="font-bold">{name}</p>
        <p className="mb-2 leading-tight">{position}</p>
        <p>{department}</p>
      </div>
    </div>
  )
}
