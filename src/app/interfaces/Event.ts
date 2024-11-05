import { DateTime } from "next-auth/providers/kakao"
import { Category } from "./Category"
import { EventOrganizer } from "./EventOrganizer"


export interface Event {
  eventId: string
  name: string
  description: string
  date: Date
  time: DateTime
  location: string
  price: number
  category: Category
  organizer: EventOrganizer
  getEventDetails: () => void
  shareEvents: () => void
  buyTickets: () => void
  addReview: (reviewId: string) => void
}