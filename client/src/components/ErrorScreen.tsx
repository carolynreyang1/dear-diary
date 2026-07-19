import { APP_COPY } from '../data/mockData'
import { Button } from './Button'
import './ErrorScreen.css'

interface ErrorScreenProps {
  message: string
  onRetry: () => void
}

export function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  const copy = APP_COPY.error

  return (
    <section className="error-screen" role="alert">
      <p className="error-screen__kicker">{copy.kicker}</p>
      <p className="error-screen__message">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        {copy.retryLabel}
      </Button>
    </section>
  )
}
