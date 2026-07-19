import './Label.css'

interface LabelProps {
  children: React.ReactNode
}

export function Label({ children }: LabelProps) {
  return <span className="editorial-label">{children}</span>
}
