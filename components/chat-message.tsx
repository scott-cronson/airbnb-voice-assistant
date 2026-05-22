'use client'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ListingCard } from '@/components/listing-card'
import { listings, type Listing } from '@/lib/mock-data'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  onSelectListing?: (listing: Listing) => void
  voiceOnly?: boolean
}

// Parse content to extract listing references and render cards
function parseContentWithListings(content: string) {
  const parts: { type: 'text' | 'listing'; content: string; listingId?: string }[] = []
  
  // Match [LISTING:id] patterns
  const regex = /\[LISTING:([\w-]+)\]/g
  let lastIndex = 0
  let match
  
  while ((match = regex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      })
    }
    
    // Add the listing reference
    parts.push({
      type: 'listing',
      content: '',
      listingId: match[1],
    })
    
    lastIndex = regex.lastIndex
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex),
    })
  }
  
  return parts
}

export function ChatMessage({ role, content, isStreaming, onSelectListing, voiceOnly }: ChatMessageProps) {
  const isUser = role === 'user'
  const parsedContent = parseContentWithListings(content)
  
  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className={cn('h-8 w-8 shrink-0', isUser ? 'bg-primary' : 'bg-muted')}>
        <AvatarFallback className={cn(isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground', 'text-sm font-medium')}>
          {isUser ? 'SM' : 'TV'}
        </AvatarFallback>
      </Avatar>
      
      <div
        className={cn(
          'flex flex-col gap-2 max-w-[85%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5',
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-sm'
              : 'bg-card border border-border rounded-tl-sm',
            isStreaming && 'animate-pulse'
          )}
        >
          {parsedContent.map((part, index) => {
            if (part.type === 'text') {
              // Clean up the text - remove listing tags that might have been partially parsed
              const cleanText = part.content.replace(/\[LISTING:[\w-]*\]?/g, '').trim()
              if (!cleanText) return null
              
              return (
                <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                  {cleanText}
                </p>
              )
            }
            return null
          })}
        </div>
        
        {/* Render listing cards outside the bubble — hidden in voice-only mode */}
        {!voiceOnly && parsedContent
          .filter((part) => part.type === 'listing' && part.listingId)
          .map((part, index) => {
            const listing = listings.find((l) => l.id === part.listingId)
            if (!listing) return null
            
            return (
              <ListingCard 
                key={`${part.listingId}-${index}`} 
                listing={listing} 
                onSelect={onSelectListing}
              />
            )
          })}
      </div>
    </div>
  )
}
