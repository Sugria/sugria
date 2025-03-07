'use client'
import { forwardRef, useState } from 'react'
import Tooltip from './Tooltip'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string
  name: string
  error?: string
  helpText?: string
  type?: string
  options?: { value: string; label: string }[]
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, helpText, type = 'text', options, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const inputClasses = `
      w-full px-3 py-2 border outline-none transition-colors text-black
      ${error 
        ? 'border-red-500 focus:border-red-700 bg-red-50' 
        : 'border-gray-300 focus:border-[#2E8A57] hover:border-gray-400'
      }
      disabled:bg-gray-100 disabled:cursor-not-allowed
      placeholder:text-black placeholder:opacity-60
    `

    const renderInput = () => {
      if (type === 'textarea') {
        return (
          <textarea
            id={name}
            name={name}
            className={`${inputClasses} min-h-[100px] resize-y ${className}`}
            placeholder={label ? `Enter ${label.toLowerCase()}` : ''}
            {...props}
          />
        )
      }

      if (type === 'select' && options) {
        return (
          <select
            id={name}
            name={name}
            className={`${inputClasses} appearance-none bg-white pr-8 ${className}`}
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em'
            }}
            {...props}
          >
            <option value="" className="text-black">Select {label ? label.toLowerCase() : ''}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
        )
      }

      if (type === 'date') {
        return (
          <input
            ref={ref}
            id={name}
            type={type}
            name={name}
            className={`${inputClasses} ${className}`}
            {...props}
          />
        )
      }

      if (type === 'password') {
        return (
          <div className="relative">
            <input
              ref={ref}
              id={name}
              type={showPassword ? 'text' : 'password'}
              name={name}
              className={`${inputClasses} ${className}`}
              placeholder={label ? `Enter ${label.toLowerCase()}` : ''}
              {...props}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        )
      }

      return (
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          className={`${inputClasses} ${className}`}
          placeholder={label ? `Enter ${label.toLowerCase()}` : ''}
          {...props}
        />
      )
    }

    return (
      <div className="w-full">
        <div className="flex items-center mb-1">
          <label htmlFor={name} className="block text-sm font-medium text-black">
            {label}
          </label>
          {helpText && <Tooltip text={helpText} />}
        </div>
        {renderInput()}
        {error && (
          <p className="mt-1 text-sm text-red-700 font-medium">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input