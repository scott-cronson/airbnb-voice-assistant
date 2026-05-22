'use client'

import Link from 'next/link'
import { User, Settings, Briefcase, Mic, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { defaultUserProfile } from '@/lib/mock-data'

interface ChatHeaderProps {
  onClearChat?: () => void
  voiceOnly?: boolean
  onToggleMode?: () => void
}

export function ChatHeader({ onClearChat, voiceOnly, onToggleMode }: ChatHeaderProps) {
  const user = defaultUserProfile
  
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top">
      {/* Mode toggle bar */}
      <div className="flex items-center justify-center gap-1 px-4 pt-2 pb-1">
        <div className="flex items-center bg-muted rounded-full p-0.5 gap-0.5">
          <button
            onClick={() => voiceOnly && onToggleMode?.()}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              !voiceOnly
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-pressed={!voiceOnly}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Combo
          </button>
          <button
            onClick={() => !voiceOnly && onToggleMode?.()}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              voiceOnly
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-pressed={voiceOnly}
          >
            <Mic className="h-3.5 w-3.5" />
            Voice Only
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-primary-foreground"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-sm text-foreground">TravelVoice</h1>
            <p className="text-xs text-muted-foreground">by Airbnb</p>
          </div>
        </div>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
              <Briefcase className="mr-2 h-4 w-4" />
              {user.company} - {user.title}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
              <User className="mr-2 h-4 w-4" />
              {user.travelHistory.tripsThisYear} trips this year
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Travel Preferences
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClearChat} className="text-destructive">
              Clear conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
