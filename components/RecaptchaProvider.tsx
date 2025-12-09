'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!recaptchaKey) {
    // If no key is configured, just render children without reCAPTCHA
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  )
}
