import type { ComponentPropsWithRef } from "react"

export type NavItemLinkProps = ComponentPropsWithRef<"a">

export function NavItemLink({
  className,
  href,
  rel,
  children,
  ...restOfProps
}: NavItemLinkProps) {
  return (
    <a className={className} href={href} rel={rel} {...restOfProps}>
      {children}
    </a>
  )
}
