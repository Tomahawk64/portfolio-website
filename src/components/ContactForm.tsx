'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { website: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check client-side
    if (data.website) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          website: data.website,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage('Too many requests. Please wait a few minutes before trying again.');
        } else {
          setErrorMessage(json.error || 'Something went wrong. Please try again.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      reset();
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot — hidden from real users, visible to bots */}
      <div
        className="hidden"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', overflow: 'hidden' }}
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register('website')}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
          Full Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
          className={`input-field ${errors.name ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="John Doe"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Name must be less than 100 characters' },
          })}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
          Email Address <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          className={`input-field ${errors.email ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
          })}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
          Subject <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          aria-required="true"
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
          className={`input-field ${errors.subject ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Project inquiry"
          {...register('subject', {
            required: 'Subject is required',
            minLength: { value: 5, message: 'Subject must be at least 5 characters' },
            maxLength: { value: 200, message: 'Subject must be less than 200 characters' },
          })}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={`input-field resize-none ${errors.message ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Tell me about your project..."
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
            maxLength: { value: 2000, message: 'Message must be less than 2000 characters' },
          })}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Status messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm"
          >
            <strong>Message sent!</strong> Thank you for reaching out. I&apos;ll get back to you within 24–48 hours.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
        aria-disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
