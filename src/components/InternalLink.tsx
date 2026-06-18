import type React from 'react'

type InternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  onNavigate: (href: string) => void
}

export default function InternalLink({
  href,
  onNavigate,
  className,
  children,
  onClick,
  ...rest
}: InternalLinkProps) {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      onClick={(event) => {
        if (href.startsWith('#') || href.startsWith('/')) {
          event.preventDefault()
          onNavigate(href)
        }

        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
