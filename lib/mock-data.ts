// Airbnb-style listing types and mock data for corporate travelers

export type PropertyType = 'apartment' | 'house' | 'condo' | 'loft' | 'townhouse'

export interface Listing {
  id: string
  name: string
  propertyType: PropertyType
  host: string
  city: string
  neighborhood: string
  address: string
  pricePerNight: number
  rating: number
  reviewCount: number
  amenities: string[]
  distanceToOffice?: string
  instantBook: boolean
  selfCheckIn: boolean
  imageUrl: string
  description: string
  bedrooms: number
  beds: number
  bathrooms: number
  maxGuests: number
  superhost: boolean
}

export const listings: Listing[] = [
  // New York
  {
    id: 'nyc-1',
    name: 'Modern Midtown Studio with Dedicated Workspace',
    propertyType: 'apartment',
    host: 'Michael',
    city: 'New York',
    neighborhood: 'Midtown Manhattan',
    address: '350 W 42nd St, New York, NY 10036',
    pricePerNight: 189,
    rating: 4.92,
    reviewCount: 847,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Air conditioning', 'Washer', 'Self check-in', 'Gym access'],
    distanceToOffice: '0.5 miles to Pfizer HQ',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    description: 'Sleek studio perfect for business travelers. Quiet building with 24/7 doorman.',
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'nyc-2',
    name: 'Spacious 1BR in Hell\'s Kitchen - Work From Home Ready',
    propertyType: 'apartment',
    host: 'Jennifer',
    city: 'New York',
    neighborhood: 'Hell\'s Kitchen',
    address: '520 W 48th St, New York, NY 10036',
    pricePerNight: 225,
    rating: 4.88,
    reviewCount: 523,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Air conditioning', 'Washer/Dryer', 'Self check-in', 'Coffee maker'],
    distanceToOffice: '0.8 miles to Pfizer HQ',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    description: 'Bright corner apartment with dedicated desk setup and ergonomic chair. Great for extended stays.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'nyc-3',
    name: 'Luxury Loft near Grand Central',
    propertyType: 'loft',
    host: 'David',
    city: 'New York',
    neighborhood: 'Murray Hill',
    address: '109 E 39th St, New York, NY 10016',
    pricePerNight: 312,
    rating: 4.95,
    reviewCount: 256,
    amenities: ['Wifi', 'Dedicated workspace', 'Full kitchen', 'Air conditioning', 'Doorman', 'Gym access', 'Rooftop'],
    distanceToOffice: '1.0 miles to Pfizer HQ',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    description: 'Stunning loft with high ceilings and dedicated office nook. Steps from Grand Central.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  // Chicago
  {
    id: 'chi-1',
    name: 'River North Condo with City Views',
    propertyType: 'condo',
    host: 'Amanda',
    city: 'Chicago',
    neighborhood: 'River North',
    address: '330 N Wabash Ave, Chicago, IL 60611',
    pricePerNight: 195,
    rating: 4.91,
    reviewCount: 412,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Air conditioning', 'Gym access', 'Pool', 'Self check-in'],
    distanceToOffice: '0.3 miles to Loop business district',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    description: 'Modern condo overlooking the Chicago River. Building has excellent business amenities.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'chi-2',
    name: 'Mag Mile Studio - Perfect for Business',
    propertyType: 'apartment',
    host: 'Robert',
    city: 'Chicago',
    neighborhood: 'Magnificent Mile',
    address: '540 N Michigan Ave, Chicago, IL 60611',
    pricePerNight: 165,
    rating: 4.85,
    reviewCount: 634,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Air conditioning', 'Doorman', 'Self check-in'],
    distanceToOffice: '0.5 miles to Loop business district',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    description: 'Efficient studio on the Magnificent Mile. Walk to all major business offices.',
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: false,
  },
  // San Francisco
  {
    id: 'sf-1',
    name: 'SOMA Apartment with Home Office',
    propertyType: 'apartment',
    host: 'Lisa',
    city: 'San Francisco',
    neighborhood: 'SOMA',
    address: '757 Market St, San Francisco, CA 94103',
    pricePerNight: 245,
    rating: 4.89,
    reviewCount: 367,
    amenities: ['Wifi', 'Dedicated workspace', 'Full kitchen', 'Washer/Dryer', 'Air conditioning', 'Self check-in', 'EV charging'],
    distanceToOffice: '0.2 miles to Financial District',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
    description: 'Tech-forward apartment with standing desk and dual monitors available. Near all transit.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'sf-2',
    name: 'Union Square Pied-à-Terre',
    propertyType: 'condo',
    host: 'Kevin',
    city: 'San Francisco',
    neighborhood: 'Union Square',
    address: '333 Post St, San Francisco, CA 94102',
    pricePerNight: 198,
    rating: 4.82,
    reviewCount: 521,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Doorman', 'Gym access', 'Self check-in'],
    distanceToOffice: '0.4 miles to Financial District',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop',
    description: 'Compact but well-appointed condo. Ideal location for downtown meetings.',
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: false,
  },
  // Boston
  {
    id: 'bos-1',
    name: 'Beacon Hill Townhouse - Private Floor',
    propertyType: 'townhouse',
    host: 'Margaret',
    city: 'Boston',
    neighborhood: 'Beacon Hill',
    address: '45 Mt Vernon St, Boston, MA 02108',
    pricePerNight: 275,
    rating: 4.94,
    reviewCount: 289,
    amenities: ['Wifi', 'Dedicated workspace', 'Full kitchen', 'Washer/Dryer', 'Fireplace', 'Self check-in'],
    distanceToOffice: '0.4 miles to Financial District',
    instantBook: false,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
    description: 'Charming historic townhouse with modern amenities. Quiet street, easy walk to downtown.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'bos-2',
    name: 'Seaport Modern Apartment',
    propertyType: 'apartment',
    host: 'Thomas',
    city: 'Boston',
    neighborhood: 'Seaport District',
    address: '100 Pier 4 Blvd, Boston, MA 02210',
    pricePerNight: 215,
    rating: 4.87,
    reviewCount: 456,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Gym access', 'Pool', 'Self check-in', 'Parking'],
    distanceToOffice: '0.6 miles to Financial District',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
    description: 'Brand new building in the Seaport. Waterfront views and modern amenities.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: false,
  },
  // Los Angeles
  {
    id: 'la-1',
    name: 'Downtown LA High-Rise with Skyline Views',
    propertyType: 'condo',
    host: 'Jessica',
    city: 'Los Angeles',
    neighborhood: 'Downtown LA',
    address: '900 W Olympic Blvd, Los Angeles, CA 90015',
    pricePerNight: 225,
    rating: 4.90,
    reviewCount: 334,
    amenities: ['Wifi', 'Dedicated workspace', 'Full kitchen', 'Gym access', 'Pool', 'Self check-in', 'Parking'],
    distanceToOffice: '0.3 miles to Downtown LA offices',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop',
    description: 'Stunning views from 30th floor. Full amenities including co-working lounge.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: true,
  },
  {
    id: 'la-2',
    name: 'Arts District Loft - Creative Space',
    propertyType: 'loft',
    host: 'Marcus',
    city: 'Los Angeles',
    neighborhood: 'Arts District',
    address: '555 S Hewitt St, Los Angeles, CA 90013',
    pricePerNight: 185,
    rating: 4.83,
    reviewCount: 567,
    amenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Air conditioning', 'Washer/Dryer', 'Self check-in', 'Parking'],
    distanceToOffice: '0.5 miles to Downtown LA offices',
    instantBook: true,
    selfCheckIn: true,
    imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop',
    description: 'Industrial-chic loft with tons of natural light. Great restaurants nearby.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    maxGuests: 2,
    superhost: false,
  },
]

// Airbnb-style preference options for road warriors
export const preferenceOptions = {
  propertyTypes: ['apartment', 'house', 'condo', 'loft', 'townhouse'] as PropertyType[],
  mustHaveAmenities: [
    'Wifi',
    'Dedicated workspace', 
    'Kitchen',
    'Air conditioning',
    'Washer/Dryer',
    'Gym access',
    'Pool',
    'Parking',
    'EV charging',
    'Coffee maker',
  ],
  bookingPreferences: [
    'Instant Book',
    'Self check-in',
    'Superhost only',
    'Flexible cancellation',
  ],
  workspaceNeeds: [
    'Dedicated workspace',
    'Standing desk',
    'External monitor',
    'Quiet for calls',
    'Good lighting',
  ],
}

// Road Warrior user profile with Airbnb-style preferences
export interface UserPreferences {
  propertyTypes: PropertyType[]
  mustHaveAmenities: string[]
  bookingPreferences: string[]
  maxBudget: number
  minRating: number
  bedroomMin: number
  frequentDestinations: string[]
}

export interface UserProfile {
  id: string
  name: string
  email: string
  company: string
  title: string
  homeCity: string
  preferences: UserPreferences
  travelHistory: {
    tripsThisYear: number
    nightsOnRoad: number
    topDestinations: string[]
  }
  upcomingTrips: {
    destination: string
    checkIn: string
    checkOut: string
    purpose: string
  }[]
}

export const defaultUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@pfizer.com',
  company: 'Pfizer Inc.',
  title: 'Senior Regional Sales Director',
  homeCity: 'Philadelphia',
  preferences: {
    propertyTypes: ['apartment', 'condo', 'loft'],
    mustHaveAmenities: ['Wifi', 'Dedicated workspace', 'Kitchen', 'Self check-in'],
    bookingPreferences: ['Instant Book', 'Self check-in', 'Superhost only'],
    maxBudget: 300,
    minRating: 4.8,
    bedroomMin: 0,
    frequentDestinations: ['New York', 'Chicago', 'Boston', 'San Francisco'],
  },
  travelHistory: {
    tripsThisYear: 47,
    nightsOnRoad: 112,
    topDestinations: ['New York', 'Chicago', 'Boston'],
  },
  upcomingTrips: [
    {
      destination: 'New York',
      checkIn: '2026-03-15',
      checkOut: '2026-03-17',
      purpose: 'Q1 Sales Review at Pfizer HQ',
    },
  ],
}

// Helper to search listings with Airbnb-style filters
export function searchListings(params: {
  city?: string
  propertyTypes?: PropertyType[]
  maxPrice?: number
  minRating?: number
  amenities?: string[]
  instantBook?: boolean
  selfCheckIn?: boolean
  superhostOnly?: boolean
}): Listing[] {
  return listings.filter((listing) => {
    if (params.city && !listing.city.toLowerCase().includes(params.city.toLowerCase())) {
      return false
    }
    if (params.propertyTypes && params.propertyTypes.length > 0) {
      if (!params.propertyTypes.includes(listing.propertyType)) {
        return false
      }
    }
    if (params.maxPrice && listing.pricePerNight > params.maxPrice) {
      return false
    }
    if (params.minRating && listing.rating < params.minRating) {
      return false
    }
    if (params.instantBook && !listing.instantBook) {
      return false
    }
    if (params.selfCheckIn && !listing.selfCheckIn) {
      return false
    }
    if (params.superhostOnly && !listing.superhost) {
      return false
    }
    if (params.amenities && params.amenities.length > 0) {
      const hasAllAmenities = params.amenities.every((amenity) =>
        listing.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      )
      if (!hasAllAmenities) return false
    }
    return true
  })
}

// Get recommendations based on user preferences
export function getRecommendedListings(
  profile: UserProfile,
  city: string
): Listing[] {
  const cityListings = listings.filter(
    (l) => l.city.toLowerCase() === city.toLowerCase()
  )
  
  const scored = cityListings.map((listing) => {
    let score = 0
    
    // Preferred property type bonus
    if (profile.preferences.propertyTypes.includes(listing.propertyType)) {
      score += 15
    }
    
    // Superhost bonus if preferred
    if (profile.preferences.bookingPreferences.includes('Superhost only') && listing.superhost) {
      score += 20
    }
    
    // Instant book bonus if preferred
    if (profile.preferences.bookingPreferences.includes('Instant Book') && listing.instantBook) {
      score += 10
    }
    
    // Self check-in bonus if preferred
    if (profile.preferences.bookingPreferences.includes('Self check-in') && listing.selfCheckIn) {
      score += 10
    }
    
    // Under budget bonus
    if (listing.pricePerNight <= profile.preferences.maxBudget) {
      score += 10
    }
    
    // Rating bonus
    score += listing.rating * 5
    
    // Meets minimum rating
    if (listing.rating >= profile.preferences.minRating) {
      score += 10
    }
    
    // Amenity match bonus
    const matchedAmenities = profile.preferences.mustHaveAmenities.filter((pref) =>
      listing.amenities.some((a) => a.toLowerCase().includes(pref.toLowerCase()))
    )
    score += matchedAmenities.length * 5
    
    return { listing, score }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.listing)
}

// Get/set user preferences from localStorage
export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultUserProfile.preferences
  
  const stored = localStorage.getItem('travelvoice-preferences')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultUserProfile.preferences
    }
  }
  return defaultUserProfile.preferences
}

export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('travelvoice-preferences', JSON.stringify(preferences))
}
