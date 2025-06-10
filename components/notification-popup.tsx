"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function NotificationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("notification-popup-seen")

    if (!hasSeenPopup) {
      // Wait a moment before showing the popup for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Simple validation for Indian phone numbers
    const phoneRegex = /^[6-9]\d{9}$/
    setIsValid(phoneRegex.test(phoneNumber))
  }, [phoneNumber])

  const handleClose = () => {
    // Remember that user has seen the popup
    localStorage.setItem("notification-popup-seen", "true")
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowThankYou(true)

      // Store that user has opted in
      localStorage.setItem("notification-opted-in", "true")
      localStorage.setItem("notification-popup-seen", "true")

      // Hide thank you message after a moment
      setTimeout(() => {
        setShowThankYou(false)
        setIsOpen(false)
      }, 2000)
    }, 1000)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-2 border-gold-500 bg-white dark:bg-gray-900 dark:border-gold-400">
          {!showThankYou ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-black dark:text-white">Stay Updated</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  Would you like to receive updates and notifications about new resources and events?
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-black dark:text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-gold-500 dark:focus:border-gold-400"
                  />
                  {phoneNumber && !isValid && (
                    <p className="text-sm text-red-500 dark:text-red-400">Please enter a valid 10-digit phone number</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We'll send you occasional updates about new features and events.
                  </p>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900"
                  >
                    No thanks
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="bg-gold-500 dark:bg-gold-600 text-black dark:text-white hover:bg-gold-600 dark:hover:bg-gold-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register for Updates"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
              <Heart className="w-24 h-24 text-pink-500 dark:text-pink-400 animate-pulse mb-4" fill="currentColor" />
              <h2 className="text-2xl font-bold text-center text-black dark:text-white">Thank You!</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
                You're now registered for updates from The Law Hub.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
