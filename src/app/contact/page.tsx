"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import resumeData from "@/data/resume.json";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Simple spam protection
    
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Get in Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center max-w-2xl mx-auto">
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full mr-4">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <a href={`mailto:${resumeData.basics.email}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  {resumeData.basics.email}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full mr-4">
                <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Phone</h3>
                <a href={`tel:${resumeData.basics.phone}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  {resumeData.basics.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">{resumeData.basics.location}</p>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-border shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-card hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Download CV (PDF)
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send Me a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from real users */}
              <input
                type="text"
                name="honeypot"
                className="hidden"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-border bg-background px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-border bg-background px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-border bg-background px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border"
                ></textarea>
              </div>

              {status === "success" && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md border border-green-200 dark:border-green-800">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all ${
                  status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                {!status && <Send className="ml-2 w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
