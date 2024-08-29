import type { ComponentPropsWithoutRef } from "react"
import { cn } from "~/lib/utils"

type HeaderNavMenuProps = ComponentPropsWithoutRef<"ul">

function HeaderNavMenu({
  children,
  className,
  ...restOfProps
}: HeaderNavMenuProps) {
  return (
    <ul
      className={cn(
        "flex flex-col font-bold md:border-0 md:p-0 min-[800px]:flex-row min-[800px]:space-x-5 min-[800px]:text-sm lg:space-x-8 lg:text-base rtl:space-x-reverse",
        className,
      )}
      {...restOfProps}
    >
      {children}
    </ul>
  )
}

type HeaderNavMenuItemProps = ComponentPropsWithoutRef<"li">

function HeaderNavMenuItem({
  children,
  ...restOfProps
}: HeaderNavMenuItemProps) {
  return <li {...restOfProps}>{children}</li>
}

type HeaderNavMenuSubMenuToggleButtonProps = ComponentPropsWithoutRef<"button">

function HeaderNavMenuSubMenuToggleButton({
  children,
  className,
  ...restOfProps
}: HeaderNavMenuSubMenuToggleButtonProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between gap-4 text-green after:text-xl after:transition-all after:ease-in-out after:content-['+'] hover:text-blue md:block md:after:content-[none]",
        className,
      )}
      {...restOfProps}
    >
      {children}
    </button>
  )
}

type HeaderNavMenuSubMenuProps = ComponentPropsWithoutRef<"ul">

function HeaderNavMenuSubMenu({
  children,
  className,
  ...restOfProps
}: HeaderNavMenuSubMenuProps) {
  return (
    <ul
      className={cn(
        "md:text-md relative top-[115%] z-10 m-0 hidden min-w-[200px] gap-2 border-b-2 border-b-green bg-white p-4 pt-2 text-sm text-green md:absolute md:mt-2 md:pt-4 md:text-black md:shadow-md md:shadow-black/10",
        className,
      )}
      {...restOfProps}
    >
      {children}
    </ul>
  )
}

type HeaderNavMenuSubMenuNavItemProps = ComponentPropsWithoutRef<"li">

function HeaderNavMenuSubMenuNavItem({
  children,
  className,
  ...restOfProps
}: HeaderNavMenuSubMenuNavItemProps) {
  return (
    <li className={cn("", className)} {...restOfProps}>
      {children}
    </li>
  )
}

type HeaderNavMenuSubMenuLinkProps = ComponentPropsWithoutRef<"a">

function HeaderNavMenuSubMenuLink({
  children,
  className,
  href,
  rel,
  ...restOfProps
}: HeaderNavMenuSubMenuLinkProps) {
  return (
    <a
      className={cn("hover:text-blue focus:text-blue", className)}
      href={href}
      rel={rel}
      {...restOfProps}
    >
      {children}
    </a>
  )
}

export {
  HeaderNavMenu,
  HeaderNavMenuItem,
  HeaderNavMenuSubMenuToggleButton,
  HeaderNavMenuSubMenu,
  HeaderNavMenuSubMenuNavItem,
  HeaderNavMenuSubMenuLink,
}
