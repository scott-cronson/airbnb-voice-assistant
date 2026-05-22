'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  defaultUserProfile, 
  preferenceOptions, 
  getUserPreferences, 
  saveUserPreferences,
  type UserPreferences,
  type PropertyType 
} from '@/lib/mock-data'

export default function SettingsPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState<UserPreferences>(defaultUserProfile.preferences)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const stored = getUserPreferences()
    setPreferences(stored)
  }, [])

  const handlePropertyTypeToggle = (type: PropertyType) => {
    setPreferences(prev => {
      const newTypes = prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
      return { ...prev, propertyTypes: newTypes }
    })
    setHasChanges(true)
  }

  const handleAmenityToggle = (amenity: string) => {
    setPreferences(prev => {
      const newAmenities = prev.mustHaveAmenities.includes(amenity)
        ? prev.mustHaveAmenities.filter(a => a !== amenity)
        : [...prev.mustHaveAmenities, amenity]
      return { ...prev, mustHaveAmenities: newAmenities }
    })
    setHasChanges(true)
  }

  const handleBookingPrefToggle = (pref: string) => {
    setPreferences(prev => {
      const newPrefs = prev.bookingPreferences.includes(pref)
        ? prev.bookingPreferences.filter(p => p !== pref)
        : [...prev.bookingPreferences, pref]
      return { ...prev, bookingPreferences: newPrefs }
    })
    setHasChanges(true)
  }

  const handleBudgetChange = (value: number[]) => {
    setPreferences(prev => ({ ...prev, maxBudget: value[0] }))
    setHasChanges(true)
  }

  const handleRatingChange = (value: number[]) => {
    setPreferences(prev => ({ ...prev, minRating: value[0] }))
    setHasChanges(true)
  }

  const handleSave = () => {
    saveUserPreferences(preferences)
    setHasChanges(false)
    toast.success('Preferences saved', {
      description: 'Your travel preferences have been updated.',
    })
  }

  const handleReset = () => {
    setPreferences(defaultUserProfile.preferences)
    setHasChanges(true)
    toast.info('Preferences reset', {
      description: 'Preferences reset to defaults. Save to confirm.',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.push('/')}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">Travel Preferences</h1>
              <p className="text-xs text-muted-foreground">{defaultUserProfile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 pb-8 space-y-4 max-w-lg mx-auto">
        {/* Property Types */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Property Types</CardTitle>
            <CardDescription className="text-xs">
              Select the types of places you prefer to stay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {preferenceOptions.propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-3">
                <Checkbox
                  id={`type-${type}`}
                  checked={preferences.propertyTypes.includes(type)}
                  onCheckedChange={() => handlePropertyTypeToggle(type)}
                />
                <Label 
                  htmlFor={`type-${type}`}
                  className="text-sm font-normal capitalize cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Must-Have Amenities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Must-Have Amenities</CardTitle>
            <CardDescription className="text-xs">
              Filter for places with these essential features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.mustHaveAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant={preferences.mustHaveAmenities.includes(amenity) ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors"
                  onClick={() => handleAmenityToggle(amenity)}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Booking Preferences</CardTitle>
            <CardDescription className="text-xs">
              How you prefer to book and check in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {preferenceOptions.bookingPreferences.map((pref) => (
              <div key={pref} className="flex items-center space-x-3">
                <Checkbox
                  id={`booking-${pref}`}
                  checked={preferences.bookingPreferences.includes(pref)}
                  onCheckedChange={() => handleBookingPrefToggle(pref)}
                />
                <Label 
                  htmlFor={`booking-${pref}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {pref}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Maximum Budget</CardTitle>
            <CardDescription className="text-xs">
              Set your per-night spending limit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-foreground">
                ${preferences.maxBudget}
              </span>
              <span className="text-sm text-muted-foreground">per night</span>
            </div>
            <Slider
              value={[preferences.maxBudget]}
              onValueChange={handleBudgetChange}
              min={100}
              max={500}
              step={25}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100</span>
              <span>$500</span>
            </div>
          </CardContent>
        </Card>

        {/* Minimum Rating */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Minimum Rating</CardTitle>
            <CardDescription className="text-xs">
              Only show places above this rating
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-foreground">
                {preferences.minRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">stars and above</span>
            </div>
            <Slider
              value={[preferences.minRating]}
              onValueChange={handleRatingChange}
              min={4.0}
              max={5.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4.0</span>
              <span>5.0</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Summary */}
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Current Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">Property types:</span>
              <span className="text-foreground">
                {preferences.propertyTypes.length > 0 
                  ? preferences.propertyTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')
                  : 'Any'}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">Must have:</span>
              <span className="text-foreground">
                {preferences.mustHaveAmenities.length > 0 
                  ? preferences.mustHaveAmenities.join(', ')
                  : 'None specified'}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">Booking:</span>
              <span className="text-foreground">
                {preferences.bookingPreferences.length > 0 
                  ? preferences.bookingPreferences.join(', ')
                  : 'Any'}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">Budget:</span>
              <span className="text-foreground">Up to ${preferences.maxBudget}/night</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">Rating:</span>
              <span className="text-foreground">{preferences.minRating}+ stars</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
