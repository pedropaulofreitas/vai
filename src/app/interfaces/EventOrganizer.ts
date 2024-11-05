

export interface EventOrganizer {
  organizerId: string
  name: string
  email: string
  contactInfo: string
  manageEvent:() => void
  createEvent:() => void
  updateEvent:() => void
  deleteEvent:() => void
}