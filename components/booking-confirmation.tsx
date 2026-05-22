'use client'

import { Check, Calendar, MapPin, Star, Award, Zap, Home, Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Listing } from '@/lib/mock-data'
import { defaultUserProfile } from '@/lib/mock-data'

interface BookingConfirmationProps {
  listing: Listing
  checkIn: string
  checkOut: string
  onConfirm: () => void
  onCancel: () => void
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function getNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

const propertyTypeLabels: Record<string, string> = {
  apartment: 'Apartment',
  house: 'House',
  condo: 'Condo',
  loft: 'Loft',
  townhouse: 'Townhouse',
}

export function BookingConfirmation({
  listing,
  checkIn,
  checkOut,
  onConfirm,
  onCancel,
}: BookingConfirmationProps) {
  const nights = getNights(checkIn, checkOut)
  const totalPrice = listing.pricePerNight * nights
  const serviceFee = Math.round(totalPrice * 0.12)
  const grandTotal = totalPrice + serviceFee
  const user = defaultUserProfile
  
  return (
    <Card className="w-full max-w-[320px] border-2 border-primary/20 shadow-lg">
      <CardHeader className="pb-3 bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
          <CardTitle className="text-base">Ready to Book</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* Listing info */}
        <div className="mb-4">
          <h3 className="font-semibold text-foreground leading-tight">{listing.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <Building className="h-3.5 w-3.5" />
            <span>{propertyTypeLabels[listing.propertyType]} in {listing.neighborhood}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-medium">{listing.rating}</span>
            </div>
            {listing.superhost && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Superhost
              </Badge>
            )}
            {listing.instantBook && (
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Instant
              </Badge>
            )}
          </div>
        </div>
        
        {/* Dates */}
        <div className="flex items-start gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">{formatDate(checkIn)}</span>
              <span className="text-muted-foreground">to</span>
              <span className="font-medium">{formatDate(checkOut)}</span>
            </div>
            <p className="text-muted-foreground">{nights} night{nights > 1 ? 's' : ''}</p>
          </div>
        </div>
        
        {/* Location */}
        {listing.distanceToOffice && (
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-sm text-muted-foreground">{listing.distanceToOffice}</span>
          </div>
        )}
        
        {/* Check-in info */}
        {listing.selfCheckIn && (
          <div className="text-xs text-muted-foreground mb-4 p-2 bg-muted/30 rounded">
            Self check-in available - you will receive access instructions before arrival
          </div>
        )}
        
        {/* Price breakdown */}
        <div className="border-t border-border pt-4 mb-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ${listing.pricePerNight} x {nights} nights
            </span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border mt-2">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>
        </div>
        
        {/* Guest info */}
        <div className="text-xs text-muted-foreground mb-4">
          <p>Guest: {user.name}</p>
          <p>{user.email}</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={onConfirm}
          >
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
