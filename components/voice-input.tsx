'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, Send, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface VoiceInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function VoiceInput({ onSend, disabled, placeholder = 'Type or tap to speak...' }: VoiceInputProps) {
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [input])
  
  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      return
    }
    setIsListening(true)
    // Show listening state for 2 seconds, then dismiss and show informational snackbar
    setTimeout(() => {
      setIsListening(false)
      toast('Microphone functionality is not built yet (engineering constraints). Please type directly into the chat box as if you were speaking.', {
        duration: 3000,
        position: 'bottom-center',
      })
    }, 2000)
  }
  
  return (
    <div className="border-t border-border bg-background px-4 py-3 safe-area-bottom">
      {/* Listening indicator */}
      {isListening && (
        <div className="flex items-center justify-center gap-2 mb-3 text-primary">
          <div className="flex gap-1">
            <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
            <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
          </div>
          <span className="text-sm font-medium">Listening...</span>
        </div>
      )}
      
      <div className="flex items-end gap-2">
        {/* Voice button */}
        <Button
          type="button"
          size="icon"
          variant={isListening ? 'destructive' : 'secondary'}
          className={cn(
            'shrink-0 h-10 w-10 rounded-full',
            isListening && 'animate-pulse'
          )}
          onClick={toggleListening}
          disabled={disabled}
        >
          {isListening ? (
            <Square className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        
        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isListening}
            rows={1}
            className={cn(
              'w-full resize-none rounded-2xl border border-input bg-card px-4 py-2.5 pr-12',
              'text-sm placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'max-h-[120px]'
            )}
          />
          
          {/* Send button inside input */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              'absolute right-1.5 bottom-1.5 h-7 w-7 rounded-full',
              input.trim() ? 'text-primary' : 'text-muted-foreground'
            )}
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Voice hint */}
      {!isListening && !input && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Tap the mic to simulate voice input
        </p>
      )}
    </div>
  )
}
