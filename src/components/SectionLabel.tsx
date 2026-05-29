type SectionLabelProps = {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`mono text-[10px] uppercase tracking-[0.24em] text-[#1940B1]/70 md:text-xs ${className}`}>
      {children}
    </p>
  )
}
