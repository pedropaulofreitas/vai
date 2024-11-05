import { Event } from "./Event";
import { EventPreferences } from "./EventPreferences";


export interface User {
  userId: number
  name: string
  email: string
  password: string
  eventPreferences: EventPreferences
  register: () => void
  login: () => void
  updatePreferences: () => void
  saveEvent: () => void
  viewSavedEvents: () => Event[]
}