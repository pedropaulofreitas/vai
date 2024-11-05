import { Category } from "./Category"
import { Event } from "./Event"


export interface EventPreferences {
  userId: number
  favoriteCategories: Category[]
  locationPreferences: string
  updatePreferences: () => void
  getRecommendedEvents: () => Event[]
}