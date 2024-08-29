import type { ComponentPropsWithRef } from "react"
import { cn } from "~/lib/utils"

export type NavItemLinkProps = ComponentPropsWithRef<"a">

export function NavItemLink({
  className,
  href,
  rel,
  children,
  ...restOfProps
}: NavItemLinkProps) {
  return (
    <a
      className={cn("text-green hover:text-blue focus:text-blue", className)}
      href={href}
      rel={rel}
      {...restOfProps}
    >
      {children}
    </a>
  )
}
