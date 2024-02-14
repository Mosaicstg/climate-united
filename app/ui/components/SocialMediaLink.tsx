import type { SocialMediaLink } from "~/models/social-media-link.server"
import SocialIcon from "~/ui/components/Social-Icon"

type SocialMediaLinkProps = SocialMediaLink

export function SocialLink({ platform, url }: SocialMediaLinkProps) {
  return (
    <li>
      <a
        className="block h-[20px] w-[20px] text-white"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">{platform}</span>
        <SocialIcon icon={platform} />
      </a>
    </li>
  )
}
