'use client'
import { useRef } from 'react'
import Button from './button'

interface FileUploadProps {
  name: string;
  accept: string;
  onChange: (file: File | null) => void;
  currentFileName?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  label: string;
}

export const FileUpload = ({ 
  name, 
  accept, 
  onChange, 
  currentFileName,
  error,
  required,
  helpText,
  label
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    onChange(file || null)
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        required={required && !currentFileName}
      />

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto text-[#1A5D3A] border-[#1A5D3A] hover:bg-[#1A5D3A] hover:text-white"
        >
          Choose File
        </Button>

        {currentFileName && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Current file: {currentFileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        )}

        {helpText && !error && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
}

export default FileUpload 