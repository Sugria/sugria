'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'

const EmailPage = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    multipleEmails: false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Add your email sending logic here
      // You'll need to create an API endpoint to handle this
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      alert('Email sent successfully!')
      setEmailData({
        to: '',
        subject: '',
        message: '',
        multipleEmails: false
      })
    } catch (error) {
      alert('Failed to send email')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Email</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="multipleEmails"
            checked={emailData.multipleEmails}
            onChange={(e) => setEmailData({ ...emailData, multipleEmails: e.target.checked })}
          />
          <label htmlFor="multipleEmails">Send to multiple recipients</label>
        </div>

        <Input
          name="to"
          label={emailData.multipleEmails ? "To (separate emails with commas)" : "To"}
          type="text"
          value={emailData.to}
          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          placeholder={emailData.multipleEmails ? "email1@example.com, email2@example.com" : "email@example.com"}
          required
        />

        <Input
          name="subject"
          label="Subject"
          type="text"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          required
        />

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            className="w-full border rounded-md p-2"
            value={emailData.message}
            onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EmailPage 