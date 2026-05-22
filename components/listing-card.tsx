'use client'

import Image from 'next/image'
import { Star, MapPin, Wifi, Laptop, Zap, Award, Home, Building, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Listing, PropertyType } from '@/lib/mock-data'

interface ListingCardProps {
  listing: Listing
  onSelect?: (listing: Listing) => void
  selected?: boolean
}

const propertyTypeIcons: Record<PropertyType, React.ReactNode> = {
  apartment: <Building className="h-3 w-3" />,
  house: <Home className="h-3 w-3" />,
  condo: <Building2 className="h-3 w-3" />,
  loft: <Building className="h-3 w-3" />,
  townhouse: <Home className="h-3 w-3" />,
}

const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: 'Apartment',
  house: 'House',
  condo: 'Condo',
  loft: 'Loft',
  townhouse: 'Townhouse',
}

export function ListingCard({ listing, onSelect, selected }: ListingCardProps) {
  return (
    <Card 
      className={`w-full max-w-[280px] overflow-hidden transition-all ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <div className="relative h-32 w-full">
        <Image
          src={listing.imageUrl}
          alt={listing.name}
          fill
          className="object-cover"
          sizes="280px"
        />
        {listing.superhost && (
          <Badge className="absolute top-2 left-2 bg-foreground text-background text-xs">
            <Award className="h-3 w-3 mr-1" />
            Superhost
          </Badge>
        )}
        {listing.instantBook && (
          <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs">
            <Zap className="h-3 w-3 mr-1" />
            Instant
          </Badge>
        )}
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
              {listing.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              {propertyTypeIcons[listing.propertyType]}
              <span>{propertyTypeLabels[listing.propertyType]} in {listing.neighborhood}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-semibold text-sm text-foreground">
              ${listing.pricePerNight}
            </p>
            <p className="text-xs text-muted-foreground">/night</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-medium text-foreground">{listing.rating}</span>
            <span>({listing.reviewCount.toLocaleString()})</span>
          </div>
          <span className="text-muted-foreground/50">|</span>
          <span>
            {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} BR`} · {listing.beds} bed
          </span>
        </div>
        
        {listing.distanceToOffice && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3" />
            <span>{listing.distanceToOffice}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.amenities.includes('Wifi') && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              <Wifi className="h-2.5 w-2.5 mr-0.5" />
              Wifi
            </Badge>
          )}
          {listing.amenities.includes('Dedicated workspace') && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              <Laptop className="h-2.5 w-2.5 mr-0.5" />
              Workspace
            </Badge>
          )}
          {listing.amenities.includes('Kitchen') && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              Kitchen
            </Badge>
          )}
          {listing.selfCheckIn && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              Self check-in
            </Badge>
          )}
        </div>
        
        <Button 
          size="sm" 
          className="w-full h-8 text-xs"
          onClick={() => onSelect?.(listing)}
        >
          Select This Place
        </Button>
      </CardContent>
    </Card>
  )
}
