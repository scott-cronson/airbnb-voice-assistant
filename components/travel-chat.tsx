'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ChatHeader } from '@/components/chat-header'
import { ChatMessage } from '@/components/chat-message'
import { VoiceInput } from '@/components/voice-input'
import { BookingConfirmation } from '@/components/booking-confirmation'
import { defaultUserProfile, listings, type Listing } from '@/lib/mock-data'
import { toast } from 'sonner'

// Helper to extract text from UIMessage parts
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

// Check if an assistant message contains a [SEND_EMAIL:id] signal
function extractEmailSignal(content: string): string | null {
  const match = content.match(/\[SEND_EMAIL:([\w-]+)\]/)
  return match ? match[1] : null
}

export function TravelChat() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [showBookingConfirm, setShowBookingConfirm] = useState(false)
  const [voiceOnly, setVoiceOnly] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('travelvoice-mode') === 'voice'
    }
    return false
  })

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ id, messages: msgs }) => ({
        body: { id, messages: msgs, voiceOnly },
      }),
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Persist mode preference
  useEffect(() => {
    localStorage.setItem('travelvoice-mode', voiceOnly ? 'voice' : 'combo')
  }, [voiceOnly])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Detect [SEND_EMAIL:id] signals from assistant in voice-only mode
  useEffect(() => {
    if (!voiceOnly || messages.length === 0) return
    const last = messages[messages.length - 1]
    if (last?.role !== 'assistant') return
    const content = getMessageText(last)
    const listingId = extractEmailSignal(content)
    if (!listingId) return
    const listing = listings.find((l) => l.id === listingId)
    if (!listing) return
    const upcomingTrip = defaultUserProfile.upcomingTrips[0]
    // Simulate sending email — in production this would call an API
    toast.success('Booking details sent!', {
      description: `Email with a one-click booking link for ${listing.name} sent to ${defaultUserProfile.email}`,
    })
    // Log the simulated email payload
    console.log('[TravelVoice] Simulated email sent:', {
      to: defaultUserProfile.email,
      listing: listing.name,
      checkIn: upcomingTrip?.checkIn,
      checkOut: upcomingTrip?.checkOut,
      pricePerNight: listing.pricePerNight,
      bookingLink: `https://airbnb.com/rooms/${listing.id}?checkin=${upcomingTrip?.checkIn}&checkout=${upcomingTrip?.checkOut}`,
    })
  }, [messages, voiceOnly])

  const sendGreeting = () => {
    const greetingMessage = `Hi! I'm ${defaultUserProfile.name}, checking in. I have an upcoming trip to ${defaultUserProfile.upcomingTrips[0]?.destination || 'New York'} for ${defaultUserProfile.upcomingTrips[0]?.purpose || 'business meetings'}. Can you help me find a place to stay?`
    sendMessage({ text: greetingMessage })
    setHasGreeted(true)
    localStorage.setItem('travelvoice-greeted', 'true')
  }

  // Load messages and greeting state from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('travelvoice-messages')
    const wasGreeted = localStorage.getItem('travelvoice-greeted') === 'true'
    
    if (savedMessages && wasGreeted) {
      try {
        const parsed = JSON.parse(savedMessages)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          setHasGreeted(true)
          return // Don't send greeting if we loaded existing chat
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
    
    // Only send greeting if chat is truly empty and we haven't greeted yet
    if (!wasGreeted) {
      sendGreeting()
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('travelvoice-messages', JSON.stringify(messages))
    }
  }, [messages])

  const handleSend = (text: string) => {
    if (!isLoading) {
      sendMessage({ text })
    }
  }

  const handleClearChat = () => {
    setMessages([])
    localStorage.removeItem('travelvoice-messages')
    localStorage.removeItem('travelvoice-greeted')
    setHasGreeted(false)
    setSelectedListing(null)
    setShowBookingConfirm(false)
  }

  const handleToggleMode = () => {
    const next = !voiceOnly
    setVoiceOnly(next)
    // Hide booking confirmation when switching to voice-only
    if (next) {
      setShowBookingConfirm(false)
      setSelectedListing(null)
    }
    toast(`Switched to ${next ? 'Voice Only' : 'Combo'} mode`, {
      description: next
        ? 'Visual cards hidden. Text-only responses.'
        : 'Visual cards restored.',
      duration: 3000,
    })
  }

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing)
    setShowBookingConfirm(true)
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 100)
  }

  const handleConfirmBooking = () => {
    if (selectedListing) {
      const upcomingTrip = defaultUserProfile.upcomingTrips[0]
      const booking = {
        id: `booking-${Date.now()}`,
        listing: selectedListing,
        checkIn: upcomingTrip?.checkIn || '2026-03-15',
        checkOut: upcomingTrip?.checkOut || '2026-03-17',
        confirmedAt: new Date().toISOString(),
        guest: defaultUserProfile.name,
      }

      const existingBookings = JSON.parse(localStorage.getItem('travelvoice-bookings') || '[]')
      localStorage.setItem('travelvoice-bookings', JSON.stringify([...existingBookings, booking]))

      toast.success('Booking Confirmed!', {
        description: `${selectedListing.name} has been booked for your trip.`,
      })

      sendMessage({
        text: `I'd like to confirm my booking at ${selectedListing.name} for ${upcomingTrip?.checkIn || 'March 15'} to ${upcomingTrip?.checkOut || 'March 17'}.`,
      })

      setShowBookingConfirm(false)
      setSelectedListing(null)
    }
  }

  const handleCancelBooking = () => {
    setShowBookingConfirm(false)
    setSelectedListing(null)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader
        onClearChat={handleClearChat}
        voiceOnly={voiceOnly}
        onToggleMode={handleToggleMode}
      />

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {/* Welcome state when no messages */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Welcome to TravelVoice</h2>
            <p className="text-muted-foreground text-sm max-w-[280px]">
              Your voice-first travel assistant. Tell me where you need to go and I will find the perfect stay.
            </p>
          </div>
        )}

        {/* Message list */}
        <div className="py-4">
          {messages.map((message) => {
            const content = getMessageText(message)
            // In voice-only mode, strip [SEND_EMAIL:id] tags from displayed text
            const displayContent = voiceOnly
              ? content.replace(/\[SEND_EMAIL:[\w-]+\]/g, '').trim()
              : content

            return (
              <ChatMessage
                key={message.id}
                role={message.role as 'user' | 'assistant'}
                content={displayContent}
                isStreaming={
                  status === 'streaming' &&
                  message === messages[messages.length - 1] &&
                  message.role === 'assistant'
                }
                onSelectListing={handleSelectListing}
                voiceOnly={voiceOnly}
              />
            )
          })}

          {/* Typing indicator */}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3 px-4 py-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">TV</span>
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-2.5">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Booking confirmation — hidden in voice-only mode */}
          {!voiceOnly && showBookingConfirm && selectedListing && (
            <div className="flex justify-center px-4 py-3">
              <BookingConfirmation
                listing={selectedListing}
                checkIn={defaultUserProfile.upcomingTrips[0]?.checkIn || '2026-03-15'}
                checkOut={defaultUserProfile.upcomingTrips[0]?.checkOut || '2026-03-17'}
                onConfirm={handleConfirmBooking}
                onCancel={handleCancelBooking}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <VoiceInput
        onSend={handleSend}
        disabled={isLoading}
        placeholder="Ask about places to stay, dates, or neighborhoods..."
      />
    </div>
  )
}
