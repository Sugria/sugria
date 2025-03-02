'use client'
import { forwardRef } from 'react'
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
            placeholder={`Enter ${label.toLowerCase()}`}
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
            <option value="" className="text-black">Select {label.toLowerCase()}</option>
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

      return (
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          className={`${inputClasses} ${className}`}
          placeholder={`Enter ${label.toLowerCase()}`}
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