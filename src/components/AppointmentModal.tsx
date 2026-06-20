import { useEffect, useState, type FormEvent } from 'react'
import type React from 'react'
import { CalendarIcon } from './icons'

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  reason: '',
}

export default function AppointmentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const validateField = (name: string, value: string) => {
    let error = ''
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`
        } else if (value.length > 50) {
          error = 'Must be 50 characters or less'
        } else if (!/^[A-Za-z\s\-']+$/.test(value)) {
          error = 'Only letters, spaces, hyphens, and apostrophes are allowed'
        }
        break
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required'
        } else if (value.length > 20) {
          error = 'Must be 20 characters or less'
        } else if (!/^[0-9\s\-()+.]+$/.test(value)) {
          error = 'Invalid phone number characters'
        } else if (value.replace(/\D/g, '').length < 7) {
          error = 'Phone number must have at least 7 digits'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'Email address is required'
        } else if (value.length > 100) {
          error = 'Must be 100 characters or less'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Please enter a valid email address'
        }
        break
      case 'reason':
        if (!value.trim()) {
          error = 'Reason for visit is required'
        } else if (value.length > 500) {
          error = 'Must be 500 characters or less'
        }
        break
      default:
        break
    }

    return error
  }

  const handleChange =
    (name: keyof typeof initialFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let { value } = event.target

      if (name === 'firstName' || name === 'lastName') {
        value = value.replace(/[^A-Za-z\s\-']/g, '')
      } else if (name === 'phone') {
        value = value.replace(/[^0-9\s\-()+.]/g, '')
      }

      setFormData((prev) => ({ ...prev, [name]: value }))
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
      }
    }

  const handleBlur = (name: keyof typeof initialFormData) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}
    const nextTouched: Record<string, boolean> = {}

    ;(Object.keys(formData) as Array<keyof typeof initialFormData>).forEach((key) => {
      nextTouched[key] = true
      const error = validateField(key, formData[key])
      if (error) nextErrors[key] = error
    })

    setTouched(nextTouched)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setApiError(null)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
          email: formData.email,
          reason_for_visit: formData.reason,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to request appointment. Please try again.')
      }

      setIsSubmitted(true)
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    setFormData(initialFormData)
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
    setApiError(null)
    setIsSubmitting(false)

    const scrollY = window.scrollY
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  if (isSubmitted) {
    return (
      <div className="appointment-modal" role="presentation" onClick={onClose}>
        <div
          className="appointment-modal__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-modal-title"
          onClick={(event) => event.stopPropagation()}
          style={{ textAlign: 'center', padding: '40px 24px' }}
        >
          <button type="button" aria-label="Close appointment form" className="appointment-modal__close" onClick={onClose}>
            ×
          </button>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 195, 181, 0.12)',
              color: '#22C3B5',
              marginBottom: '20px',
              fontSize: '32px',
            }}
          >
            ✓
          </div>
          <h3
            id="appointment-modal-title"
            style={{ color: '#16306F', fontFamily: 'var(--font-heading)', fontSize: '26px', margin: '0 0 12px 0' }}
          >
            Request Received
          </h3>
          <p
            style={{
              color: 'rgba(22, 48, 111, 0.78)',
              fontSize: '15px',
              lineHeight: '1.5',
              maxWidth: '400px',
              margin: '0 auto 24px auto',
            }}
          >
            Thank you, <strong>{formData.firstName}</strong>. We have received your request and will follow up with you at{' '}
            <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> to confirm your appointment.
          </p>
          <button type="button" className="button primary" onClick={onClose} style={{ minWidth: '160px' }}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="appointment-modal" role="presentation" onClick={onClose}>
      <div
        className="appointment-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" aria-label="Close appointment form" className="appointment-modal__close" onClick={onClose}>
          ×
        </button>
        <div className="appointment-modal__header">
          <div className="appointment-modal__eyebrow">
            <CalendarIcon />
            <span>Request an Appointment</span>
          </div>
          <h3 id="appointment-modal-title">Tell us a little about you</h3>
          <p>Office requests are reviewed by our team, and we will follow up to confirm the next step.</p>
        </div>
        <form className="appointment-form" onSubmit={handleSubmit} noValidate>
          <div className="appointment-form__row">
            <label>
              First name
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                maxLength={50}
                value={formData.firstName}
                onChange={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                className={touched.firstName && errors.firstName ? 'is-invalid' : ''}
              />
              {touched.firstName && errors.firstName && <span className="appointment-form-error">{errors.firstName}</span>}
            </label>
            <label>
              Last name
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                maxLength={50}
                value={formData.lastName}
                onChange={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                className={touched.lastName && errors.lastName ? 'is-invalid' : ''}
              />
              {touched.lastName && errors.lastName && <span className="appointment-form-error">{errors.lastName}</span>}
            </label>
          </div>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="812-924-7065"
              maxLength={20}
              value={formData.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              className={touched.phone && errors.phone ? 'is-invalid' : ''}
            />
            {touched.phone && errors.phone && <span className="appointment-form-error">{errors.phone}</span>}
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              maxLength={100}
              value={formData.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              className={touched.email && errors.email ? 'is-invalid' : ''}
            />
            {touched.email && errors.email && <span className="appointment-form-error">{errors.email}</span>}
          </label>
          <label>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Reason for visit</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: formData.reason.length > 480 ? '#D9232E' : 'rgba(22, 48, 111, 0.6)',
                }}
              >
                {formData.reason.length}/500
              </span>
            </div>
            <textarea
              name="reason"
              rows={4}
              placeholder="Briefly describe your symptoms or what you'd like to discuss."
              maxLength={500}
              value={formData.reason}
              onChange={handleChange('reason')}
              onBlur={handleBlur('reason')}
              className={touched.reason && errors.reason ? 'is-invalid' : ''}
            />
            {touched.reason && errors.reason && <span className="appointment-form-error">{errors.reason}</span>}
          </label>
          {apiError && (
            <div className="appointment-form-error" style={{ marginBottom: '16px', textAlign: 'center', fontWeight: '500' }}>
              {apiError}
            </div>
          )}
          <button type="submit" className="button primary appointment-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Request...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
